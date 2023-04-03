-- CreateTable
CREATE TABLE `tbl_appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_name` VARCHAR(191) NOT NULL,
    `client_email` VARCHAR(191) NOT NULL,
    `veterinary_name` VARCHAR(191) NOT NULL,
    `veterinary_email` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` ENUM('CONCLUDED', 'SCHEDULED', 'WAITING_CONFIRMATION', 'CANCELED') NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `starts_at` DATETIME(3) NOT NULL,
    `ends_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
