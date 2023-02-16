/*
  Warnings:

  - You are about to drop the column `specialities_id` on the `tbl_vet_infos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_vet_infos` DROP FOREIGN KEY `tbl_vet_infos_specialities_id_fkey`;

-- AlterTable
ALTER TABLE `tbl_vet_infos` DROP COLUMN `specialities_id`;
