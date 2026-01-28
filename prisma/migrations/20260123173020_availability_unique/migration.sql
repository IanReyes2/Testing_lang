/*
  Warnings:

  - You are about to alter the column `price` on the `menuitem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `total` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `unitPrice` on the `orderitem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - A unique constraint covering the columns `[menuItemId,dayOfWeek]` on the table `menuitemavailability` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `menuitemavailability` DROP FOREIGN KEY `MenuItemAvailability_menuItemId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_menuItemId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- AlterTable
ALTER TABLE `menuitem` MODIFY `price` DOUBLE NOT NULL,
    MODIFY `category` VARCHAR(191) NULL DEFAULT 'uncategorized';

-- AlterTable
ALTER TABLE `order` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    MODIFY `total` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `orderitem` MODIFY `unitPrice` DOUBLE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `menuitemavailability_menuItemId_dayOfWeek_key` ON `menuitemavailability`(`menuItemId`, `dayOfWeek`);

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `menuitem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menuitemavailability` ADD CONSTRAINT `menuitemavailability_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `menuitem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `order_customerCode_key` ON `order`(`customerCode`);
DROP INDEX `Order_customerCode_key` ON `order`;

-- RedefineIndex
CREATE INDEX `orderitem_menuItemId_fkey` ON `orderitem`(`menuItemId`);
DROP INDEX `OrderItem_menuItemId_fkey` ON `orderitem`;

-- RedefineIndex
CREATE INDEX `orderitem_orderId_fkey` ON `orderitem`(`orderId`);
DROP INDEX `OrderItem_orderId_fkey` ON `orderitem`;
