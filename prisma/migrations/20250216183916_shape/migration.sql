/*
  Warnings:

  - Added the required column `shape` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Shape" AS ENUM ('CIRCLE', 'SQUARE', 'RECTANGLE', 'TRIANGLE');

-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "shape" "Shape" NOT NULL;
