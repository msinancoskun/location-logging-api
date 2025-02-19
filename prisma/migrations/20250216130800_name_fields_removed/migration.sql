/*
  Warnings:

  - You are about to drop the column `name` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Area" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "name";
