/*
  Warnings:

  - You are about to drop the column `phone_number` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the `vet_infos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_animal_type_vet_infos` DROP FOREIGN KEY `tbl_animal_type_vet_infos_vet_infos_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_user` DROP FOREIGN KEY `tbl_user_vet_infos_id_fkey`;

-- DropForeignKey
ALTER TABLE `vet_infos` DROP FOREIGN KEY `vet_infos_specialities_id_fkey`;

-- AlterTable
ALTER TABLE `tbl_user` DROP COLUMN `phone_number`;

-- DropTable
DROP TABLE `vet_infos`;

-- CreateTable
CREATE TABLE `tbl_vet_infos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `occupationArea` VARCHAR(191) NOT NULL,
    `formation` VARCHAR(191) NOT NULL,
    `institution` VARCHAR(191) NOT NULL,
    `crmv` VARCHAR(191) NOT NULL,
    `specialities_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `microship` BOOLEAN NOT NULL,
    `pet_size_id` INTEGER NOT NULL,
    `pet_gender_id` INTEGER NOT NULL,
    `pet_specie_id` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pet_size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pet_gender` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `initials` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pet_specie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_user` ADD CONSTRAINT `tbl_user_vet_infos_id_fkey` FOREIGN KEY (`vet_infos_id`) REFERENCES `tbl_vet_infos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_vet_infos` ADD CONSTRAINT `tbl_vet_infos_specialities_id_fkey` FOREIGN KEY (`specialities_id`) REFERENCES `tbl_specialities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_animal_type_vet_infos` ADD CONSTRAINT `tbl_animal_type_vet_infos_vet_infos_id_fkey` FOREIGN KEY (`vet_infos_id`) REFERENCES `tbl_vet_infos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pet` ADD CONSTRAINT `tbl_pet_pet_size_id_fkey` FOREIGN KEY (`pet_size_id`) REFERENCES `tbl_pet_size`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pet` ADD CONSTRAINT `tbl_pet_pet_gender_id_fkey` FOREIGN KEY (`pet_gender_id`) REFERENCES `tbl_pet_gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pet` ADD CONSTRAINT `tbl_pet_pet_specie_id_fkey` FOREIGN KEY (`pet_specie_id`) REFERENCES `tbl_pet_specie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pet` ADD CONSTRAINT `tbl_pet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tbl_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
