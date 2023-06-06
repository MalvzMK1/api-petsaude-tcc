/*
  Warnings:

  - You are about to drop the column `ends_at` on the `tbl_appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tbl_appointment` DROP COLUMN `ends_at`,
    ADD COLUMN `duration` INTEGER NULL,
    ADD COLUMN `price` DECIMAL(65, 30) NULL;
