-- CreateTable
CREATE TABLE `tbl_veterinary_specialities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vet_infos_id` INTEGER NOT NULL,
    `specialities_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_veterinary_specialities` ADD CONSTRAINT `tbl_veterinary_specialities_vet_infos_id_fkey` FOREIGN KEY (`vet_infos_id`) REFERENCES `tbl_vet_infos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_veterinary_specialities` ADD CONSTRAINT `tbl_veterinary_specialities_specialities_id_fkey` FOREIGN KEY (`specialities_id`) REFERENCES `tbl_specialities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
