/*
  Warnings:

  - You are about to drop the column `pet_owner_id` on the `tbl_phone_number` table. All the data in the column will be lost.
  - You are about to drop the `tbl_pet_owner` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `tbl_phone_number` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbl_phone_number` DROP FOREIGN KEY `tbl_phone_number_pet_owner_id_fkey`;

-- AlterTable
ALTER TABLE `tbl_phone_number` DROP COLUMN `pet_owner_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `tbl_pet_owner`;

-- CreateTable
CREATE TABLE `tbl_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_name` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `rg` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `profile_photo` VARCHAR(191) NULL,
    `profile_banner_photo` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isVet` BOOLEAN NOT NULL,
    `address_id` INTEGER NOT NULL,
    `vet_infos_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vet_infos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `occupationArea` VARCHAR(191) NOT NULL,
    `formation` VARCHAR(191) NOT NULL,
    `institution` VARCHAR(191) NOT NULL,
    `crmv` VARCHAR(191) NOT NULL,
    `specialities_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_animal_type_vet_infos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vet_infos_id` INTEGER NOT NULL,
    `animal_type_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_specialities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_animal_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `number` VARCHAR(191) NOT NULL,
    `neighborhood_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_neighborhood` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `city_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_city` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `state_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_state` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `initials` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_user` ADD CONSTRAINT `tbl_user_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `tbl_address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_user` ADD CONSTRAINT `tbl_user_vet_infos_id_fkey` FOREIGN KEY (`vet_infos_id`) REFERENCES `vet_infos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vet_infos` ADD CONSTRAINT `vet_infos_specialities_id_fkey` FOREIGN KEY (`specialities_id`) REFERENCES `tbl_specialities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_animal_type_vet_infos` ADD CONSTRAINT `tbl_animal_type_vet_infos_vet_infos_id_fkey` FOREIGN KEY (`vet_infos_id`) REFERENCES `vet_infos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_animal_type_vet_infos` ADD CONSTRAINT `tbl_animal_type_vet_infos_animal_type_id_fkey` FOREIGN KEY (`animal_type_id`) REFERENCES `tbl_animal_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_phone_number` ADD CONSTRAINT `tbl_phone_number_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_address` ADD CONSTRAINT `tbl_address_neighborhood_id_fkey` FOREIGN KEY (`neighborhood_id`) REFERENCES `tbl_neighborhood`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_neighborhood` ADD CONSTRAINT `tbl_neighborhood_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `tbl_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_city` ADD CONSTRAINT `tbl_city_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `tbl_state`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
