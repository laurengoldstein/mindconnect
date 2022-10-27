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
    `date` DATE NOT NULL,
    `value` INT NOT NULL,
    `user_id` INT UNSIGNED NOT NULL
);



ALTER TABLE
    `data` ADD CONSTRAINT `data_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `tracked_items_user` ADD CONSTRAINT `tracked_items_user_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `tracked_items_user` ADD CONSTRAINT `tracked_items_user_tracked_items_id_foreign` FOREIGN KEY(`tracked_items_id`) REFERENCES `tracked_items`(`id`);
ALTER TABLE
    `data` ADD CONSTRAINT `data_tracked_items_id_foreign` FOREIGN KEY(`tracked_items_id`) REFERENCES `tracked_items`(`id`);



-- populating table with sample data
INSERT INTO tracked_items (indicator)
    VALUES('anxiety - intensity'), ('self-harm thoughts - frequency');

INSERT INTO user (firstName, lastName, password, email)
    VALUES ('Jane', 'Doe', 'janeDoe93.', 'jane_done@gmail.com'), ('John', 'Park', 'johnPark92!', 'john.park@gmail.com');

INSERT INTO tracked_items_user(user_id, tracked_items_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 1);

INSERT INTO data (tracked_items_id, date, value, user_id)
    VALUES(1, "2022-10-01", 5, 1), (2, "2022-10-01", 7, 2), (1, "2022-10-02", 5, 1), (2, "2022-10-02", 4, 2), 
    (1, "2022-10-03", 2, 1), (2, "2022-10-03", 5, 2), (1, "2022-10-04", 4, 1), 
    (2, "2022-10-04", 4, 2), (1, "2022-10-05", 5, 1), (2, "2022-10-05", 3, 2);

