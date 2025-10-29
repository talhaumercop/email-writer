/*
  Warnings:

  - You are about to drop the column `userPosition` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "userPosition",
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "lastCreditUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "plan" "UserPosition" NOT NULL DEFAULT 'FREE';
