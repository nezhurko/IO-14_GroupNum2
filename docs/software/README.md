# SQL-скрипт для створення на початкового наповнення бази даних

```mysql
-- MySQL Script generated by MySQL Workbench
-- Wed May 24 02:20:49 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Role` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`User` ;

CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `blocked` TINYINT NOT NULL DEFAULT 0,
  `UserRole_ManyToOne_id_role` INT NOT NULL,
  PRIMARY KEY (`id`, `UserRole_ManyToOne_id_role`),
  CONSTRAINT `fk_User_Role`
    FOREIGN KEY (`UserRole_ManyToOne_id_role`)
    REFERENCES `mydb`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_User_Role_idx` ON `mydb`.`User` (`UserRole_ManyToOne_id_role` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`Permission`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Permission` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Role_has_Permission`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Role_has_Permission` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Role_has_Permission` (
  `Role_id` INT NOT NULL AUTO_INCREMENT,
  `Permission_id` INT NOT NULL,
  PRIMARY KEY (`Role_id`, `Permission_id`),
  CONSTRAINT `fk_Role_has_Permission_Role1`
    FOREIGN KEY (`Role_id`)
    REFERENCES `mydb`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Role_has_Permission_Permission1`
    FOREIGN KEY (`Permission_id`)
    REFERENCES `mydb`.`Permission` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Role_has_Permission_Permission1_idx` ON `mydb`.`Role_has_Permission` (`Permission_id` ASC) VISIBLE;

CREATE INDEX `fk_Role_has_Permission_Role1_idx` ON `mydb`.`Role_has_Permission` (`Role_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Category` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Data`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Data` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Data` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `content` BLOB NULL,
  `date_creation` DATETIME NOT NULL,
  `blocked` TINYINT NOT NULL DEFAULT 1,
  `DataCategory_ManyToOne_CategoryId` INT NOT NULL,
  `Creator` INT NOT NULL,
  PRIMARY KEY (`id`, `DataCategory_ManyToOne_CategoryId`, `Creator`),
  CONSTRAINT `fk_Data_Category1`
    FOREIGN KEY (`DataCategory_ManyToOne_CategoryId`)
    REFERENCES `mydb`.`Category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Data_User1`
    FOREIGN KEY (`Creator`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Data_Category1_idx` ON `mydb`.`Data` (`DataCategory_ManyToOne_CategoryId` ASC) VISIBLE;

CREATE INDEX `fk_Data_User1_idx` ON `mydb`.`Data` (`Creator` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`ChangeData`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ChangeData` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ChangeData` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `old_content` BLOB NULL,
  `new_content` BLOB NULL,
  `Data_id` INT NOT NULL,
  `Data_DataCategory_ManyToOne_CategoryId` INT NOT NULL,
  `Data_Creator` INT NOT NULL,
  `EditorUser_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Data_id`, `Data_DataCategory_ManyToOne_CategoryId`, `Data_Creator`, `EditorUser_id`),
  CONSTRAINT `fk_ChangeData_Data1`
    FOREIGN KEY (`Data_id` , `Data_DataCategory_ManyToOne_CategoryId` , `Data_Creator`)
    REFERENCES `mydb`.`Data` (`id` , `DataCategory_ManyToOne_CategoryId` , `Creator`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ChangeData_User1`
    FOREIGN KEY (`EditorUser_id`)
    REFERENCES `mydb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_ChangeData_Data1_idx` ON `mydb`.`ChangeData` (`Data_id` ASC, `Data_DataCategory_ManyToOne_CategoryId` ASC, `Data_Creator` ASC) VISIBLE;

CREATE INDEX `fk_ChangeData_User1_idx` ON `mydb`.`ChangeData` (`EditorUser_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


START TRANSACTION;
USE `mydb`;

-- Default 
INSERT INTO `mydb`.`Permission` (`id`, `name`) VALUES (DEFAULT, 'create');
INSERT INTO `mydb`.`Permission` (`id`, `name`) VALUES (DEFAULT, 'read');
INSERT INTO `mydb`.`Permission` (`id`, `name`) VALUES (DEFAULT, 'delete');

INSERT INTO `mydb`.`Role` (`id`, `name`) VALUES (DEFAULT, 'admin');
INSERT INTO `mydb`.`Role` (`id`, `name`) VALUES (DEFAULT, 'user');
INSERT INTO `mydb`.`Role` (`id`, `name`) VALUES (DEFAULT, 'guest');

INSERT INTO `mydb`.`User` (`id`, `email`, `name`, `password`, `blocked`,`UserRole_ManyToOne_id_role`) VALUES (DEFAULT, 'example@gmail.com', 'Kirya Korneplod', '1111', '0', '1');

-- Categories Data
INSERT INTO `mydb`.`Category` (`name`) VALUES ('Tech');
INSERT INTO `mydb`.`Category` (`name`) VALUES ('Lifestyle');
INSERT INTO `mydb`.`Category` (`name`) VALUES ('Sports');
INSERT INTO `mydb`.`Category` (`name`) VALUES ('Entertainment');
INSERT INTO `mydb`.`Category` (`name`) VALUES ('Health');

-- Posts data
INSERT INTO `mydb`.`Data` (`name`, `description`, `content`, `date_creation`, `blocked`, `DataCategory_ManyToOne_CategoryId`, `Creator`) VALUES 
('Tech Article 1', 'An article on AI technology', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', NOW(), '0', '1', '1'),
('Tech Article 2', 'An article on Quantum Computing', 'Vestibulum ante ipsum primis in faucibus orci...', NOW(), '0', '1', '1'),
('Lifestyle Article 1', 'An article on Vegan Lifestyle', 'Pellentesque dignissim odio sit amet mi aliquam, quis...', NOW(), '0', '2', '1'),
('Lifestyle Article 2', 'An article on Minimalist Living', 'Etiam non tellus ex. Nullam tempus vulputate...', NOW(), '0', '2', '1'),
('Sports Article 1', 'An article on the upcoming World Cup', 'Fusce accumsan ultricies massa, a tincidunt...', NOW(), '0', '3', '1'),
('Sports Article 2', 'An article on the impact of sports on mental health', 'Phasellus facilisis fermentum mollis...', NOW(), '0', '3', '1'),
('Entertainment Article 1', 'An article on the impact of streaming services on traditional television', 'Mauris ultrices ligula at ultricies semper...', NOW(), '0', '4', '1'),
('Entertainment Article 2', 'An article on the rise of K-pop', 'Cras imperdiet massa nec justo sollicitudin...', NOW(), '0', '4', '1'),
('Health Article 1', 'An article on maintaining mental health during the pandemic', 'Praesent blandit erat nec mauris sollicitudin...', NOW(), '0', '5', '1'),
('Health Article 2', 'An article on the benefits of Yoga', 'Proin vitae dolor sit amet odio...', NOW(), '0', '5', '1');
UPDATE `mydb`.`Data` SET `blocked` = '1' WHERE `id` = 1;

-- User data
INSERT INTO `mydb`.`User` 
(`email`, `name`, `password`, `blocked`, `UserRole_ManyToOne_id_role`)
VALUES 
('test_user1@gmail.com', 'User One', 'pass1', 0, 2),
('test_user2@gmail.com', 'User Two', 'pass2', 0, 2),
('test_user3@gmail.com', 'User Three', 'pass3', 0, 2),
('test_user4@gmail.com', 'User Four', 'pass4', 1, 2),
('test_user5@gmail.com', 'User Five', 'pass5', 1, 2),
('admin1@gmail.com', 'Admin One', 'admin1', 0, 1),
('admin2@gmail.com', 'Admin Two', 'admin2', 0, 1);


COMMIT;
```
