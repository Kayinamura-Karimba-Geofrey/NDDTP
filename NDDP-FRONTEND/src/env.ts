import { z } from 'zod';

const envSchema = z.object({
  VITE_DEV_GATEWAY_URL: z.string().url().optional(),
});

export const env = envSchema.parse(import.meta.env);
