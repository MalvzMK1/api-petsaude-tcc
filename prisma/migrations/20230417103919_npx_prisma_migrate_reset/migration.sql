/*
  Warnings:

  - Added the required column `pet_id` to the `tbl_appointment` table without a default value. This is not possible if the table is not empty.
  - Made the column `client_id` on table `tbl_appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `veterinary_id` on table `tbl_appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `tbl_appointment` DROP FOREIGN KEY `tbl_appointment_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_appointment` DROP FOREIGN KEY `tbl_appointment_veterinary_id_fkey`;

-- AlterTable
ALTER TABLE `tbl_appointment` ADD COLUMN `pet_id` INTEGER NOT NULL,
    MODIFY `client_id` INTEGER NOT NULL,
    MODIFY `veterinary_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `tbl_appointment` ADD CONSTRAINT `tbl_appointment_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `tbl_client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_appointment` ADD CONSTRAINT `tbl_appointment_veterinary_id_fkey` FOREIGN KEY (`veterinary_id`) REFERENCES `tbl_veterinary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_appointment` ADD CONSTRAINT `tbl_appointment_pet_id_fkey` FOREIGN KEY (`pet_id`) REFERENCES `tbl_pet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
