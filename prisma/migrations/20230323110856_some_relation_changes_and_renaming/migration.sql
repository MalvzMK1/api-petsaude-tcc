/*
  Warnings:

  - A unique constraint covering the columns `[vet_infos_id]` on the table `tbl_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `formationDate` to the `tbl_vet_infos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startActingDate` to the `tbl_vet_infos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `tbl_phone_number_number_key` ON `tbl_phone_number`;

-- AlterTable
ALTER TABLE `tbl_vet_infos` ADD COLUMN `formationDate` DATETIME(3) NOT NULL,
    ADD COLUMN `startActingDate` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tbl_user_vet_infos_id_key` ON `tbl_user`(`vet_infos_id`);
