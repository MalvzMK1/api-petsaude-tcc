-- CreateTable
CREATE TABLE `tbl_post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `text` VARCHAR(1000) NOT NULL,
    `image` VARCHAR(191) NULL,
    `veterinary_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_post` ADD CONSTRAINT `tbl_post_veterinary_id_fkey` FOREIGN KEY (`veterinary_id`) REFERENCES `tbl_veterinary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
