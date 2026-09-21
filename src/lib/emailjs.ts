import emailjs from "@emailjs/browser";

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_l0b4x7g",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_2k5h4w8",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "OUjLW7vHiuveU0mnT",
  recipientName: "Saikiran Nannapaneni",
  recipientEmail: "sai8844n@gmail.com",
};

export interface SendEmailParams {
  name: string;
  email: string;
  message: string;
  projectType?: string;
}

export interface SendFeedbackParams {
  name: string;
  email: string;
  role: string;
  company?: string;
  project: string;
  rating: number;
  message: string;
  consentToFeature: boolean;
}

export async function sendEmail({
  name,
  email,
  message,
  projectType,
}: SendEmailParams) {
  const fullMessage = projectType
    ? `[Project Focus: ${projectType}]\n\n${message}`
    : message;

  return emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    {
      from_name: name,
      to_name: EMAILJS_CONFIG.recipientName,
      from_email: email,
      to_email: EMAILJS_CONFIG.recipientEmail,
      message: fullMessage,
    },
    EMAILJS_CONFIG.publicKey
  );
}

export async function sendFeedbackEmail({
  name,
  email,
  role,
  company,
  project,
  rating,
  message,
  consentToFeature,
}: SendFeedbackParams) {
  const fullRole = company ? `${role} at ${company}` : role;
  const stars = "★".repeat(Math.min(5, Math.max(1, rating))) + "☆".repeat(Math.max(0, 5 - rating));

  const formattedMessage = [
    `========================================`,
    `⭐ NEW CLIENT TESTIMONIAL & FEEDBACK ⭐`,
    `========================================`,
    ``,
    `Client Name : ${name}`,
    `Client Email: ${email}`,
    `Role / Org  : ${fullRole}`,
    `Project     : ${project}`,
    `Rating      : ${rating}/5 Stars (${stars})`,
    `Consent     : ${consentToFeature ? "YES (Authorized to showcase on portfolio)" : "NO (Private feedback only)"}`,
    ``,
    `----------------------------------------`,
    `CLIENT FEEDBACK / REVIEW:`,
    `----------------------------------------`,
    `${message}`,
    ``,
    `========================================`,
  ].join("\n");

  return emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    {
      from_name: `${name} [Client Review]`,
      to_name: EMAILJS_CONFIG.recipientName,
      from_email: email,
      to_email: EMAILJS_CONFIG.recipientEmail,
      message: formattedMessage,
    },
    EMAILJS_CONFIG.publicKey
  );
}
