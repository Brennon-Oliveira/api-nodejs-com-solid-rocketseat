import { randomUUID } from 'crypto'
import { Environment } from 'vitest/environments'
import 'dotenv/config'
import { execSync } from 'child_process'
import { prisma } from '@/lib/prisma'

const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npm run prisma:deploy')

    console.log(`Schema ${schema} created`)

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        console.log(`Schema ${schema} deleted`)
        await prisma.$disconnect()
      },
    }
  },
}
