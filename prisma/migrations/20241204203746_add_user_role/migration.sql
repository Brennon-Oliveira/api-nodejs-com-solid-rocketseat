/*
  Warnings:

  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "ROLE" NOT NULL;
