/*
  Warnings:

  - You are about to drop the column `userId` on the `tbl_pet` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `tbl_pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbl_pet` DROP FOREIGN KEY `tbl_pet_userId_fkey`;

-- AlterTable
ALTER TABLE `tbl_pet` DROP COLUMN `userId`,
    ADD COLUMN `owner_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `tbl_pet` ADD CONSTRAINT `tbl_pet_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `tbl_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
