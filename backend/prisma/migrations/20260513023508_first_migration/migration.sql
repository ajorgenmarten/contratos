-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('CONSULTOR', 'ADMINISTRADOR', 'OPERADOR');

-- CreateEnum
CREATE TYPE "ClientDenomination" AS ENUM ('MIPYME', 'CNA', 'EMPRESA_ESTATAL', 'EMPRESA_100_EXTRANJERA', 'EMPRESA_100_CUBANA', 'EMPRESA_MIXTA', 'CCS', 'UBPC', 'OTRAS_FORMAS');

-- CreateEnum
CREATE TYPE "ContractDetailsType" AS ENUM ('DIESEL', 'GASOLINA', 'OTROS');

-- CreateEnum
CREATE TYPE "ContractDetailsContainer" AS ENUM ('ISO_CONTENEDOR', 'ISO_MODULO', 'BUQUE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleType" NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientDenomination" "ClientDenomination" NOT NULL,
    "agreementNumber" TEXT NOT NULL,
    "agreementDate" TIMESTAMP(3) NOT NULL,
    "nationalityCompany" TEXT NOT NULL,
    "contractTypeId" TEXT NOT NULL,
    "contractType" "ContractDetailsType",
    "contractContainer" "ContractDetailsContainer",
    "contractNumber" TEXT NOT NULL,
    "contractDate" TIMESTAMP(3) NOT NULL,
    "contractValidity" TIMESTAMP(3) NOT NULL,
    "observations" TEXT NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractDetails" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "haveType" BOOLEAN NOT NULL,
    "haveContainer" BOOLEAN NOT NULL,

    CONSTRAINT "ContractDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suplement" (
    "id" TEXT NOT NULL,
    "suplementNumber" TEXT NOT NULL,
    "suplementDate" TIMESTAMP(3) NOT NULL,
    "suplementObject" TEXT NOT NULL,
    "suplementValidity" TIMESTAMP(3) NOT NULL,
    "contractId" TEXT NOT NULL,

    CONSTRAINT "Suplement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_contractTypeId_fkey" FOREIGN KEY ("contractTypeId") REFERENCES "ContractDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suplement" ADD CONSTRAINT "Suplement_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
