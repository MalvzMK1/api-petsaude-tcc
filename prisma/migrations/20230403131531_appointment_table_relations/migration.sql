-- AlterTable
ALTER TABLE `tbl_appointment` ADD COLUMN `user_id` INTEGER NULL,
    ADD COLUMN `vet_infos_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `tbl_appointment` ADD CONSTRAINT `tbl_appointment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_appointment` ADD CONSTRAINT `tbl_appointment_vet_infos_id_fkey` FOREIGN KEY (`vet_infos_id`) REFERENCES `tbl_vet_infos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
