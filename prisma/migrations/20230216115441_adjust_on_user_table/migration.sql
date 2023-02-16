-- DropForeignKey
ALTER TABLE `tbl_user` DROP FOREIGN KEY `tbl_user_vet_infos_id_fkey`;

-- AlterTable
ALTER TABLE `tbl_user` MODIFY `vet_infos_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `tbl_user` ADD CONSTRAINT `tbl_user_vet_infos_id_fkey` FOREIGN KEY (`vet_infos_id`) REFERENCES `tbl_vet_infos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
