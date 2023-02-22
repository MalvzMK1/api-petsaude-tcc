/*
  Warnings:

  - You are about to drop the column `neighborhood_id` on the `tbl_address` table. All the data in the column will be lost.
  - You are about to drop the `tbl_neighborhood` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city_id` to the `tbl_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `tbl_address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbl_address` DROP FOREIGN KEY `tbl_address_neighborhood_id_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_neighborhood` DROP FOREIGN KEY `tbl_neighborhood_city_id_fkey`;

-- AlterTable
ALTER TABLE `tbl_address` DROP COLUMN `neighborhood_id`,
    ADD COLUMN `city_id` INTEGER NOT NULL,
    ADD COLUMN `neighborhood` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `tbl_neighborhood`;

-- AddForeignKey
ALTER TABLE `tbl_address` ADD CONSTRAINT `tbl_address_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `tbl_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
