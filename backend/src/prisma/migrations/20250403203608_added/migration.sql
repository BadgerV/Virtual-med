/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'STAFF');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "CV" TEXT,
ADD COLUMN     "POMI" TEXT,
ADD COLUMN     "aboutMe" TEXT,
ADD COLUMN     "accountType" "UserType" NOT NULL DEFAULT 'USER',
ADD COLUMN     "boardCertification" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "degree" TEXT,
ADD COLUMN     "degreeCertificate" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "graduationDate" TIMESTAMP(3),
ADD COLUMN     "hourlyPrice" DOUBLE PRECISION,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "major" TEXT,
ADD COLUMN     "medicalLicense" TEXT,
ADD COLUMN     "noOfRatings" INTEGER,
ADD COLUMN     "passportImage" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "professionalMembership" TEXT,
ADD COLUMN     "proofOfIdentity" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "speciality" TEXT,
ADD COLUMN     "university" TEXT,
ADD COLUMN     "verificationToken" TEXT NOT NULL DEFAULT 'Nothing yet';

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PremiumSubscribers" (
    "id" TEXT NOT NULL,
    "ids" TEXT[],

    CONSTRAINT "PremiumSubscribers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
