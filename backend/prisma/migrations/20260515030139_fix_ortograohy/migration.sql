/*
  Warnings:

  - You are about to drop the `Suplement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Suplement" DROP CONSTRAINT "Suplement_contractId_fkey";

-- DropTable
DROP TABLE "Suplement";

-- CreateTable
CREATE TABLE "Supplement" (
    "id" TEXT NOT NULL,
    "supplementNumber" TEXT NOT NULL,
    "supplementDate" TIMESTAMP(3) NOT NULL,
    "supplementObject" TEXT NOT NULL,
    "supplementValidity" TIMESTAMP(3) NOT NULL,
    "contractId" TEXT NOT NULL,

    CONSTRAINT "Supplement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Supplement" ADD CONSTRAINT "Supplement_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
