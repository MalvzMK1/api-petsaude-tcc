/*
  Warnings:

  - You are about to alter the column `cep` on the `tbl_address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `complement` on the `tbl_address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(5)`.
  - You are about to alter the column `number` on the `tbl_address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to drop the column `cellphoneNumber` on the `tbl_client` table. All the data in the column will be lost.
  - You are about to drop the column `isVet` on the `tbl_client` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `tbl_client` table. All the data in the column will be lost.
  - You are about to alter the column `person_name` on the `tbl_client` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `user_name` on the `tbl_client` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `cpf` on the `tbl_client` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(14)`.
  - You are about to alter the column `rg` on the `tbl_client` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(14)`.
  - You are about to alter the column `name` on the `tbl_pet` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to drop the column `cellphoneNumber` on the `tbl_veterinary` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `tbl_veterinary` table. All the data in the column will be lost.
  - You are about to alter the column `person_name` on the `tbl_veterinary` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `user_name` on the `tbl_veterinary` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `cpf` on the `tbl_veterinary` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(14)`.
  - You are about to alter the column `rg` on the `tbl_veterinary` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(13)`.
  - You are about to alter the column `occupation_area` on the `tbl_veterinary` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `formation` on the `tbl_veterinary` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `institution` on the `tbl_veterinary` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `crmv` on the `tbl_veterinary` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(6)`.
  - Added the required column `cellphone_number` to the `tbl_client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cellphone_number` to the `tbl_veterinary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_address` MODIFY `cep` VARCHAR(10) NOT NULL,
    MODIFY `complement` VARCHAR(5) NULL,
    MODIFY `number` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `tbl_appointment` MODIFY `description` VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE `tbl_client` DROP COLUMN `cellphoneNumber`,
    DROP COLUMN `isVet`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `cellphone_number` VARCHAR(15) NOT NULL,
    ADD COLUMN `is_vet` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `phone_number` VARCHAR(15) NULL,
    MODIFY `person_name` VARCHAR(100) NOT NULL,
    MODIFY `user_name` VARCHAR(50) NOT NULL,
    MODIFY `cpf` VARCHAR(14) NOT NULL,
    MODIFY `rg` VARCHAR(14) NULL,
    MODIFY `email` VARCHAR(256) NOT NULL,
    MODIFY `biography` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `tbl_pet` MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `birth_date` DATE NOT NULL;

-- AlterTable
ALTER TABLE `tbl_pet_specie` MODIFY `name` TINYTEXT NOT NULL;

-- AlterTable
ALTER TABLE `tbl_specialities` MODIFY `name` TINYTEXT NOT NULL;

-- AlterTable
ALTER TABLE `tbl_veterinary` DROP COLUMN `cellphoneNumber`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `cellphone_number` VARCHAR(15) NOT NULL,
    ADD COLUMN `phone_number` VARCHAR(15) NULL,
    MODIFY `person_name` VARCHAR(100) NOT NULL,
    MODIFY `user_name` VARCHAR(50) NOT NULL,
    MODIFY `cpf` VARCHAR(14) NOT NULL,
    MODIFY `rg` VARCHAR(13) NULL,
    MODIFY `email` VARCHAR(256) NOT NULL,
    MODIFY `occupation_area` VARCHAR(50) NOT NULL,
    MODIFY `formation` VARCHAR(30) NOT NULL,
    MODIFY `institution` VARCHAR(100) NOT NULL,
    MODIFY `crmv` VARCHAR(6) NOT NULL,
    MODIFY `formation_date` DATE NOT NULL,
    MODIFY `start_acting_date` DATE NOT NULL,
    MODIFY `biography` VARCHAR(1000) NULL;
