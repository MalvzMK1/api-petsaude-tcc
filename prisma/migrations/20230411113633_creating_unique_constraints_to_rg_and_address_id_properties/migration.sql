/*
  Warnings:

  - A unique constraint covering the columns `[rg]` on the table `tbl_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `tbl_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rg]` on the table `tbl_veterinary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `tbl_veterinary` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `tbl_user` ADD COLUMN `isVet` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `tbl_veterinary` ADD COLUMN `isVet` BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX `tbl_user_rg_key` ON `tbl_user`(`rg`);

-- CreateIndex
CREATE UNIQUE INDEX `tbl_user_address_id_key` ON `tbl_user`(`address_id`);

-- CreateIndex
CREATE UNIQUE INDEX `tbl_veterinary_rg_key` ON `tbl_veterinary`(`rg`);

-- CreateIndex
CREATE UNIQUE INDEX `tbl_veterinary_address_id_key` ON `tbl_veterinary`(`address_id`);
