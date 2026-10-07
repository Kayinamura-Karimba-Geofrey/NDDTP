import { z } from 'zod';

const envSchema = z.object({
  VITE_DEV_GATEWAY_URL: z.string().url().optional(),
});

// Pick keys explicitly: parsing the whole import.meta.env object would inline every VITE_* var into the bundle.
export const env = envSchema.parse({
  VITE_DEV_GATEWAY_URL: import.meta.env.VITE_DEV_GATEWAY_URL,
});
