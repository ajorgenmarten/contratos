/*
  Warnings:

  - The `contractType` column on the `Contract` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `contractContainer` column on the `Contract` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `clientCategory` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('DIESEL', 'GASOLINA', 'OTROS');

-- CreateEnum
CREATE TYPE "ContractContainer" AS ENUM ('ISO_CONTENEDOR', 'ISO_MODULO', 'BUQUE');

-- CreateEnum
CREATE TYPE "ClientCategory" AS ENUM ('Cliente', 'Proveedor');

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "clientCategory" "ClientCategory" NOT NULL,
DROP COLUMN "contractType",
ADD COLUMN     "contractType" "ContractType",
DROP COLUMN "contractContainer",
ADD COLUMN     "contractContainer" "ContractContainer",
ALTER COLUMN "observations" DROP NOT NULL;

-- DropEnum
DROP TYPE "ContractDetailsContainer";

-- DropEnum
DROP TYPE "ContractDetailsType";
