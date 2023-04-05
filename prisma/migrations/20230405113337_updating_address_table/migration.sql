/*
  Warnings:

  - You are about to drop the column `city_id` on the `tbl_address` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `tbl_address` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `tbl_address` table. All the data in the column will be lost.
  - You are about to drop the column `client_email` on the `tbl_appointment` table. All the data in the column will be lost.
  - You are about to drop the column `client_name` on the `tbl_appointment` table. All the data in the column will be lost.
  - You are about to drop the column `vet_infos_id` on the `tbl_appointment` table. All the data in the column will be lost.
  - You are about to drop the column `veterinary_email` on the `tbl_appointment` table. All the data in the column will be lost.
  - You are about to drop the column `veterinary_name` on the `tbl_appointment` table. All the data in the column will be lost.
  - You are about to drop the `tbl_city` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_state` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_address` DROP FOREIGN KEY `tbl_address_city_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_appointment` DROP FOREIGN KEY `tbl_appointment_vet_infos_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_city` DROP FOREIGN KEY `tbl_city_state_id_fkey`;

-- AlterTable
ALTER TABLE `tbl_address` DROP COLUMN `city_id`,
    DROP COLUMN `neighborhood`,
    DROP COLUMN `street`;

-- AlterTable
ALTER TABLE `tbl_appointment` DROP COLUMN `client_email`,
    DROP COLUMN `client_name`,
    DROP COLUMN `vet_infos_id`,
    DROP COLUMN `veterinary_email`,
    DROP COLUMN `veterinary_name`,
    ADD COLUMN `vetInfosId` INTEGER NULL;

-- DropTable
DROP TABLE `tbl_city`;

-- DropTable
DROP TABLE `tbl_state`;

-- AddForeignKey
ALTER TABLE `tbl_appointment` ADD CONSTRAINT `tbl_appointment_vetInfosId_fkey` FOREIGN KEY (`vetInfosId`) REFERENCES `tbl_vet_infos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
