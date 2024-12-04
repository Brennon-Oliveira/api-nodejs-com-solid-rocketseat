import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.coerce.string(),
})

const { data, error, success } = envSchema.safeParse(process.env)

if (!success) {
  const error_message = 'Invalid environment variables'
  console.error(error_message, error.issues)
  throw new Error(error_message)
}

export const env = data
