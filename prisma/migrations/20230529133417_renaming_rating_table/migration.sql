/*
  Warnings:

  - You are about to drop the `rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `rating` DROP FOREIGN KEY `Rating_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `rating` DROP FOREIGN KEY `Rating_veterinary_id_fkey`;

-- DropTable
DROP TABLE `rating`;

-- CreateTable
CREATE TABLE `tbl_rating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(200) NOT NULL,
    `score` DECIMAL(2, 1) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `veterinary_id` INTEGER NULL,
    `client_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_rating` ADD CONSTRAINT `tbl_rating_veterinary_id_fkey` FOREIGN KEY (`veterinary_id`) REFERENCES `tbl_veterinary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_rating` ADD CONSTRAINT `tbl_rating_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `tbl_client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
