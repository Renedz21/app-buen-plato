import { Polar } from "@polar-sh/sdk";

/**
 * Polar SDK Client
 *
 * Used for server-side Polar API calls like creating checkouts.
 */
export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox", // Change to "production" when ready
});
