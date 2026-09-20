export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "https://nannapaneni-saikiran.vercel.app/");

export const OG_IMAGE = `${BASE_URL}/opengraph-image`;
