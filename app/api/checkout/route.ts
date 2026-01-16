import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
  successUrl: process.env.POLAR_SUCCESS_URL,
  accessToken: process.env.POLAR_ACCESS_TOKEN,
});
