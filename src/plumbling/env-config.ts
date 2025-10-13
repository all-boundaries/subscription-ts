import { z } from "zod";

const envSchema = z.object({
  PORT: z
    .number()
    .refine((port) => port > 0 && port < 65536, "Invalid port number")
    .default(3030),
  SVC_PRODUCT_CATALOG_URL: z.url().default("http://localhost:3000"),
});

export const envConfig = envSchema.parse(process.env);
