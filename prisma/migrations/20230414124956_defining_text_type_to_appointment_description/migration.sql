-- AlterTable
ALTER TABLE `tbl_appointment` MODIFY `description` TEXT NOT NULL,
    MODIFY `status` ENUM('CONCLUDED', 'SCHEDULED', 'WAITING_CONFIRMATION', 'CANCELED') NOT NULL DEFAULT 'WAITING_CONFIRMATION';
