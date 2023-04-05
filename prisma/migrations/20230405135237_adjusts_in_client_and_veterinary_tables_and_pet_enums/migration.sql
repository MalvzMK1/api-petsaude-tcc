/*
  Warnings:

  - You are about to drop the column `vet_infos_id` on the `tbl_animal_type_vet_infos` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tbl_appointment` table. All the data in the column will be lost.
  - You are about to drop the column `vetInfosId` on the `tbl_appointment` table. All the data in the column will be lost.
  - You are about to drop the column `pet_gender_id` on the `tbl_pet` table. All the data in the column will be lost.
  - You are about to drop the column `pet_size_id` on the `tbl_pet` table. All the data in the column will be lost.
  - You are about to drop the column `isVet` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `vet_infos_id` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the column `vet_infos_id` on the `tbl_veterinary_specialities` table. All the data in the column will be lost.
  - You are about to drop the `tbl_pet_gender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_pet_size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_phone_number` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_vet_infos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `tbl_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pet_gender` to the `tbl_pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pet_size` to the `tbl_pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cellphoneNumber` to the `tbl_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbl_animal_type_vet_infos` DROP FOREIGN KEY `tbl_animal_type_vet_infos_vet_infos_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_appointment` DROP FOREIGN KEY `tbl_appointment_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_appointment` DROP FOREIGN KEY `tbl_appointment_vetInfosId_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pet` DROP FOREIGN KEY `tbl_pet_pet_gender_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pet` DROP FOREIGN KEY `tbl_pet_pet_size_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_phone_number` DROP FOREIGN KEY `tbl_phone_number_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_user` DROP FOREIGN KEY `tbl_user_vet_infos_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_veterinary_specialities` DROP FOREIGN KEY `tbl_veterinary_specialities_vet_infos_id_fkey`;

-- AlterTable
ALTER TABLE `tbl_animal_type_vet_infos` DROP COLUMN `vet_infos_id`,
    ADD COLUMN `veterinary_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `tbl_appointment` DROP COLUMN `user_id`,
    DROP COLUMN `vetInfosId`,
    ADD COLUMN `client_id` INTEGER NULL,
    ADD COLUMN `veterinary_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `tbl_pet` DROP COLUMN `pet_gender_id`,
    DROP COLUMN `pet_size_id`,
    ADD COLUMN `pet_gender` ENUM('M', 'F') NOT NULL,
    ADD COLUMN `pet_size` ENUM('BIG', 'MEDIUM', 'SMALL') NOT NULL;

-- AlterTable
ALTER TABLE `tbl_user` DROP COLUMN `isVet`,
    DROP COLUMN `vet_infos_id`,
    ADD COLUMN `cellphoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tbl_veterinary_specialities` DROP COLUMN `vet_infos_id`,
    ADD COLUMN `veterinary_id` INTEGER NULL;

-- DropTable
DROP TABLE `tbl_pet_gender`;

-- DropTable
DROP TABLE `tbl_pet_size`;

-- DropTable
DROP TABLE `tbl_phone_number`;

-- DropTable
DROP TABLE `tbl_vet_infos`;

-- CreateTable
CREATE TABLE `tbl_veterinary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_name` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `rg` VARCHAR(191) NULL,
    `profile_photo` VARCHAR(191) NULL,
    `profile_banner_photo` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `occupation_area` VARCHAR(191) NOT NULL,
    `formation` VARCHAR(191) NOT NULL,
    `institution` VARCHAR(191) NOT NULL,
    `crmv` VARCHAR(191) NOT NULL,
    `formation_date` DATETIME(3) NOT NULL,
    `start_acting_date` DATETIME(3) NOT NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `cellphoneNumber` VARCHAR(191) NOT NULL,
    `address_id` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_veterinary_cpf_key`(`cpf`),
    UNIQUE INDEX `tbl_veterinary_email_key`(`email`),
    UNIQUE INDEX `tbl_veterinary_crmv_key`(`crmv`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tbl_user_cpf_key` ON `tbl_user`(`cpf`);

-- AddForeignKey
ALTER TABLE `tbl_veterinary` ADD CONSTRAINT `tbl_veterinary_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `tbl_address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_animal_type_vet_infos` ADD CONSTRAINT `tbl_animal_type_vet_infos_veterinary_id_fkey` FOREIGN KEY (`veterinary_id`) REFERENCES `tbl_veterinary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_veterinary_specialities` ADD CONSTRAINT `tbl_veterinary_specialities_veterinary_id_fkey` FOREIGN KEY (`veterinary_id`) REFERENCES `tbl_veterinary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_appointment` ADD CONSTRAINT `tbl_appointment_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `tbl_user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_appointment` ADD CONSTRAINT `tbl_appointment_veterinary_id_fkey` FOREIGN KEY (`veterinary_id`) REFERENCES `tbl_veterinary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
