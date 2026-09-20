import { BASE_URL, OG_IMAGE } from "@/lib/constants";
import { PERSONAL_DATA } from "@/data/resume-data";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_DATA.name,
    url: BASE_URL,
    image: OG_IMAGE,
    description: PERSONAL_DATA.about,
    jobTitle: PERSONAL_DATA.role,
    email: PERSONAL_DATA.email,
    telephone: PERSONAL_DATA.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSONAL_DATA.location,
      addressCountry: "India",
    },
    sameAs: [
      PERSONAL_DATA.socials.github,
      PERSONAL_DATA.socials.linkedin,
    ],
    knowsAbout: [
      "Distributed Systems",
      "Spring Boot",
      "Java",
      "Microservices",
      "Redis",
      "RabbitMQ",
      "Next.js",
      "React",
      "TypeScript",
      "Three.js",
      "WebGL",
      "GSAP",
      "Generative AI",
      "Model Context Protocol (MCP)",
      "Shopify Liquid",
      "Supabase",
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${PERSONAL_DATA.name} Portfolio`,
    url: BASE_URL,
    description: PERSONAL_DATA.tagline,
    author: {
      "@type": "Person",
      name: PERSONAL_DATA.name,
    },
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${PERSONAL_DATA.name} — Software & Creative Tech`,
    image: `${BASE_URL}/md-red-logo.svg`,
    "@id": BASE_URL,
    url: BASE_URL,
    email: PERSONAL_DATA.email,
    telephone: PERSONAL_DATA.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSONAL_DATA.location,
      addressCountry: "India",
    },
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
    </>
  );
}
