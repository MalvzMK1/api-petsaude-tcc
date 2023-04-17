/*
  Warnings:

  - You are about to drop the `tbl_animal_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_animal_type_vet_infos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_animal_type_vet_infos` DROP FOREIGN KEY `tbl_animal_type_vet_infos_animal_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_animal_type_vet_infos` DROP FOREIGN KEY `tbl_animal_type_vet_infos_veterinary_id_fkey`;

-- DropTable
DROP TABLE `tbl_animal_type`;

-- DropTable
DROP TABLE `tbl_animal_type_vet_infos`;

-- CreateTable
CREATE TABLE `tbl_pet_specie_veterinary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pet_specie_id` INTEGER NULL,
    `veterinary_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_pet_specie_veterinary` ADD CONSTRAINT `tbl_pet_specie_veterinary_pet_specie_id_fkey` FOREIGN KEY (`pet_specie_id`) REFERENCES `tbl_pet_specie`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pet_specie_veterinary` ADD CONSTRAINT `tbl_pet_specie_veterinary_veterinary_id_fkey` FOREIGN KEY (`veterinary_id`) REFERENCES `tbl_veterinary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
