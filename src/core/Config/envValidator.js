import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/rs_eye_center'),
  JWT_SECRET: z.string().default('rs_eye_center_jwt_secret_key_2026_etah_up'),
  JWT_EXPIRES_IN: z.string().default('15m'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
  UPSTASH_REDIS_REST_URL: z.string().optional().default(''),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional().default(''),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

let validatedEnv;

export function getEnv() {
  if (!validatedEnv) {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
      console.warn('⚠️ Invalid environment variables detected, using defaults:', result.error.format());
      validatedEnv = envSchema.parse({});
    } else {
      validatedEnv = result.data;
    }
  }
  return validatedEnv;
}

export const env = getEnv();
