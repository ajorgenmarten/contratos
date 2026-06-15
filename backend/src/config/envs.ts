import 'dotenv/config';
import { Logger } from '@nestjs/common';
import z from 'zod';

const envSchema = z.object({
  PORT: z
    .string()
    .default('3000')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),

  JWT_ACCESS_SECRET: z
    .string()
    .min(8, 'JWT_ACCESS_SECRET debe tener al menos 8 caracteres'),

  JWT_REFRESH_SECRET: z
    .string()
    .min(8, 'JWT_REFRESH_SECRET debe tener al menos 8 caracteres'),

  DATABASE_URL: z
    .string()
    .url('DATABASE_URL debe ser una URL válida')
    .refine(
      (url) => url.startsWith('postgresql://') || url.startsWith('postgres://'),
      'DATABASE_URL debe ser una URL de PostgreSQL (postgresql:// o postgres://)',
    ),
});

type EnvVars = z.infer<typeof envSchema>;

const { error, data } = envSchema.safeParse(process.env);

if (error || !data) {
  Logger.error(error);
  process.exit();
}

const vars: EnvVars = data;

export default vars;
