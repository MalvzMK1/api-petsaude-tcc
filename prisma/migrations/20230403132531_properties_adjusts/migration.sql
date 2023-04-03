-- AlterTable
ALTER TABLE `tbl_appointment` MODIFY `date` DATE NOT NULL,
    MODIFY `starts_at` TIME NOT NULL,
    MODIFY `ends_at` TIME NOT NULL;
