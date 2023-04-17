/*
  Warnings:

  - You are about to drop the `tbl_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_appointment` DROP FOREIGN KEY `tbl_appointment_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pet` DROP FOREIGN KEY `tbl_pet_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_user` DROP FOREIGN KEY `tbl_user_address_id_fkey`;

-- AlterTable
ALTER TABLE `tbl_veterinary` ADD COLUMN `biography` TEXT NULL;

-- DropTable
DROP TABLE `tbl_user`;

-- CreateTable
CREATE TABLE `tbl_client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_name` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `rg` VARCHAR(191) NULL,
    `profile_photo` VARCHAR(191) NULL,
    `profile_banner_photo` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `cellphoneNumber` VARCHAR(191) NOT NULL,
    `isVet` BOOLEAN NOT NULL DEFAULT false,
    `biography` TEXT NULL,
    `address_id` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_client_cpf_key`(`cpf`),
    UNIQUE INDEX `tbl_client_rg_key`(`rg`),
    UNIQUE INDEX `tbl_client_email_key`(`email`),
    UNIQUE INDEX `tbl_client_address_id_key`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_client` ADD CONSTRAINT `tbl_client_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `tbl_address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pet` ADD CONSTRAINT `tbl_pet_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `tbl_client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_appointment` ADD CONSTRAINT `tbl_appointment_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `tbl_client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
