/*
  Warnings:

  - Added the required column `course` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Referral` ADD COLUMN `course` VARCHAR(191) NOT NULL;
