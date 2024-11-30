-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `dormitory` VARCHAR(15) NOT NULL,
    `department` VARCHAR(15) NOT NULL,
    `gender` VARCHAR(15) NOT NULL,
    `studentId` VARCHAR(15) NOT NULL,
    `lifestyle` VARCHAR(15) NOT NULL,
    `birth` DATE NOT NULL,
    `is_smoking` BOOLEAN NOT NULL,
    `image_url` VARCHAR(255) NULL,
    `wake_up_time` TIME NOT NULL,
    `sleeping_time` TIME NOT NULL,
    `light_out_time` TIME NOT NULL,
    `shower_time` TIME NOT NULL,
    `ac_level` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sleeping_habit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `habit` VARCHAR(255) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sleeping_habit` ADD CONSTRAINT `sleeping_habit_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
