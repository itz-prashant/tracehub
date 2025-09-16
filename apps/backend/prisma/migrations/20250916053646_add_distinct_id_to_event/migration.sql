/*
  Warnings:

  - Added the required column `distinct_id` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "distinct_id" TEXT NOT NULL;
