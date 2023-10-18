-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('EFECTIVO', 'CHEQUE', 'TRANSFERENCIA');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "apartmentId" INTEGER;

-- CreateTable
CREATE TABLE "apartments" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "prorating" DECIMAL(10,9) NOT NULL DEFAULT 0,

    CONSTRAINT "apartments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common_expenses" (
    "id" SERIAL NOT NULL,
    "paymentAt" TIMESTAMP(3) NOT NULL,
    "apartmentId" INTEGER NOT NULL,
    "payBy" TEXT NOT NULL,
    "referenceMonth" DATE NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "paymentType" "PaymentType" NOT NULL DEFAULT 'EFECTIVO',
    "bank" TEXT NOT NULL,
    "registerById" TEXT NOT NULL,
    "documentUrl" TEXT,
    "receipt" INTEGER,
    "observation" TEXT,
    "checkNumber" TEXT,

    CONSTRAINT "common_expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common_expenses_debt" (
    "id" SERIAL NOT NULL,
    "apartmentId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "debtAmount" INTEGER,

    CONSTRAINT "common_expenses_debt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_expenses" ADD CONSTRAINT "common_expenses_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_expenses" ADD CONSTRAINT "common_expenses_registerById_fkey" FOREIGN KEY ("registerById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_expenses_debt" ADD CONSTRAINT "common_expenses_debt_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
