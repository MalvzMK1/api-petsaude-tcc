/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `tbl_phone_number` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tbl_phone_number_number_key` ON `tbl_phone_number`(`number`);
