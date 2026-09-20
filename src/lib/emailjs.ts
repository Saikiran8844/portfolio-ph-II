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
  ).then(
    () => {
      alert("Thank you. I will get back to you as soon as possible.");


    },
    (error) => {

      console.error(error);

      alert("Ahh, something went wrong. Please try again.");
    }
  );
};
