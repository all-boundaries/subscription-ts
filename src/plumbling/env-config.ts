import { z } from "zod";

const envSchema = z.object({
  SVC_PRODUCT_CATALOG_URL: z.string().url().default("http://localhost:3000"),
});

export const envConfig = envSchema.parse(process.env);
