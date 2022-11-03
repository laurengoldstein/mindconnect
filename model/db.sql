SET foreign_key_checks = 0;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS tracked_items;
DROP TABLE IF EXISTS tracked_items_user;
DROP TABLE IF EXISTS data;
SET foreign_key_checks = 1;


CREATE TABLE `user`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL
);


CREATE TABLE `tracked_items`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `indicator` VARCHAR(255) NOT NULL
);

CREATE TABLE `tracked_items_user`(
    `user_id` INT UNSIGNED NOT NULL,
    `tracked_items_id` INT UNSIGNED NOT NULL
);

CREATE TABLE `data`(
    `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `tracked_items_id` INT UNSIGNED NOT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `value` INT NOT NULL,
    `user_id` INT UNSIGNED NOT NULL
);



ALTER TABLE
    `data` ADD CONSTRAINT `data_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `tracked_items_user` ADD CONSTRAINT `tracked_items_user_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `tracked_items_user` ADD CONSTRAINT `tracked_items_user_tracked_items_id_foreign` FOREIGN KEY(`tracked_items_id`) REFERENCES `tracked_items`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `data` ADD CONSTRAINT `data_tracked_items_id_foreign` FOREIGN KEY(`tracked_items_id`) REFERENCES `tracked_items`(`id`);



-- populating table with sample data
INSERT INTO tracked_items (indicator)
    VALUES('anxiety - intensity'), ('self-harm thoughts - frequency'), ('sleep quality');
    -- VALUES('ai'), ('sf'), ('sq');


INSERT INTO user (firstName, lastName, password, email)
    VALUES ('Jane', 'Doe', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'jane_doe@gmail.com'), ('John', 'Park', '$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6', 'john.park@gmail.com');

INSERT INTO tracked_items_user(user_id, tracked_items_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 1);

INSERT INTO data (tracked_items_id, date, value, user_id)
    VALUES (1, "2022-09-26 12:00:00", 5, 1), (1, "2022-09-27 12:00:00", 4, 1), (1, "2022-09-28 12:00:00", 4, 1), (1, "2022-09-29 12:00:00", 3, 1), (1, "2022-09-30 12:00:00", 2, 1),
    (1, "2022-10-01 12:00:00", 5, 1), (2, "2022-10-01 12:00:00", 7, 2), (1, "2022-10-02 12:00:00", 5, 1), (2, "2022-10-02 12:00:00", 4, 2),
    (1, "2022-10-03 12:00:00", 2, 1), (2, "2022-10-03 12:00:00", 5, 2), (1, "2022-10-04 12:00:00", 4, 1),
    (2, "2022-10-04 12:00:00", 4, 2), (1, "2022-10-05 12:00:00", 5, 1), (2, "2022-10-05 12:00:00", 3, 2), (1, "2022-10-01 12:00:00", 5, 1),
    (2, "2022-10-01 12:00:00", 2, 1),
    (1, "2022-10-02 12:00:00", 5, 1),
    (2, "2022-10-02 12:00:00", 5, 1),
    (3, "2022-10-02 12:00:00", 2, 1),
    (1, "2022-10-03 12:00:00", 2, 1),
    (2, "2022-10-03 12:00:00", 1, 1),
    (1, "2022-10-04 12:00:00", 4, 1),
    (3, "2022-10-05 12:00:00", 1, 1),
    (2, "2022-10-05 12:00:00", 2, 1),
    (1, "2022-10-05 12:00:00", 3, 1), (1, "2022-10-06 12:00:00", 4, 1), (1, "2022-10-07 12:00:00", 3, 1), (1, "2022-10-08 12:00:00", 5, 1),
    (1, "2022-10-09 12:00:00", 4, 1), (1, "2022-10-10 12:00:00", 4, 1), (1, "2022-10-11 12:00:00", 5, 1), (1, "2022-10-12 12:00:00", 4, 1),
    (1, "2022-10-13 12:00:00", 5, 1), (1, "2022-10-14 12:00:00", 4, 1), (1, "2022-10-15 12:00:00", 3, 1), (1, "2022-10-16 12:00:00", 3, 1),
    (1, "2022-10-17 12:00:00", 3, 1), (1, "2022-10-18 12:00:00", 2, 1), (1, "2022-10-19 12:00:00", 2, 1), (1, "2022-10-20 12:00:00", 3, 1),
    (1, "2022-10-21 12:00:00", 2, 1), (1, "2022-10-22 12:00:00", 1, 1), (1, "2022-10-23 12:00:00", 1, 1), (1, "2022-10-24 12:00:00", 2, 1),
    (1, "2022-10-25 12:00:00", 3, 1), (1, "2022-10-26 12:00:00", 3, 1), (2, "2022-10-06 12:00:00", 2, 1), (2, "2022-10-07 12:00:00", 3, 1), (2, "2022-10-08 12:00:00", 5, 1),
    (2, "2022-10-09 12:00:00", 6, 1), (2, "2022-10-10 12:00:00", 5, 1), (2, "2022-10-11 12:00:00", 5, 1), (2, "2022-10-12 12:00:00", 5, 1),
    (2, "2022-10-13 12:00:00", 4, 1), (2, "2022-10-14 12:00:00", 3, 1), (2, "2022-10-15 12:00:00", 3, 1), (2, "2022-10-16 12:00:00", 3, 1),
    (2, "2022-10-17 12:00:00", 4, 1), (2, "2022-10-18 12:00:00", 4, 1), (2, "2022-10-19 12:00:00", 4, 1), (2, "2022-10-20 12:00:00", 3, 1),
    (2, "2022-10-21 12:00:00", 4, 1), (2, "2022-10-22 12:00:00", 5, 1), (2, "2022-10-23 12:00:00", 5, 1), (2, "2022-10-24 12:00:00", 6, 1),
    (2, "2022-10-25 12:00:00", 6, 1), (2, "2022-10-26 12:00:00", 6, 1), (3, "2022-10-06 12:00:00", 2, 1), (3, "2022-10-07 12:00:00", 2, 1), (3, "2022-10-08 12:00:00", 3, 1),
    (3, "2022-10-09 12:00:00", 3, 1), (3, "2022-10-10 12:00:00", 2, 1), (3, "2022-10-11 12:00:00", 2, 1), (3, "2022-10-12 12:00:00", 4, 1),
    (3, "2022-10-13 12:00:00", 5, 1), (3, "2022-10-14 12:00:00", 6, 1), (3, "2022-10-15 12:00:00", 6, 1), (3, "2022-10-16 12:00:00", 6, 1),
    (3, "2022-10-17 12:00:00", 7, 1), (3, "2022-10-18 12:00:00", 7, 1), (3, "2022-10-19 12:00:00", 2, 1), (3, "2022-10-20 12:00:00", 7, 1),
    (3, "2022-10-21 12:00:00", 7, 1), (3, "2022-10-22 12:00:00", 6, 1), (3, "2022-10-23 12:00:00", 6, 1), (3, "2022-10-24 12:00:00", 6, 1),
    (3, "2022-10-25 12:00:00", 7, 1), (3, "2022-10-26 12:00:00", 7, 1);



