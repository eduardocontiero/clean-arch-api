

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;



CREATE DATABASE IF NOT EXISTS `order_clean_arch` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `order_clean_arch`;


CREATE TABLE IF NOT EXISTS `coupon` (
  `code` varchar(200) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `percentage` decimal(10,2) NOT NULL DEFAULT '0.00',
  `expire_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
INSERT INTO `coupon` (`code`, `percentage`, `expire_date`) VALUES
	('VALE20', 20.00, '2024-01-16 09:07:11'),
	('VALE20_EXPIRED', 0.00, '2024-01-06 09:07:22');
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;


CREATE TABLE IF NOT EXISTS `item` (
  `id_item` int unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `width` decimal(10,2) DEFAULT '0.00',
  `height` decimal(10,2) DEFAULT '0.00',
  `length` decimal(10,2) DEFAULT '0.00',
  `weight` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id_item`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` (`id_item`, `category`, `description`, `price`, `width`, `height`, `length`, `weight`) VALUES
	(1, 'Musica', 'CD', '30', 0.00, 0.00, 0.00, 0.00),
	(2, 'Musica', 'DVD', '50', 0.00, 0.00, 0.00, 0.00),
	(3, 'Musica', 'VHS', '10', 0.00, 0.00, 0.00, 0.00),
	(4, 'Instrumentos Musicais', 'Guitarra', '1000', 100.00, 30.00, 10.00, 3.00),
	(5, 'Instrumentos Musicais', 'Amplificador', '5000', 100.00, 50.00, 50.00, 20.00),
	(6, 'Instrumentos Musicais', 'Amplificador', '5000', 100.00, 50.00, 50.00, 20.00);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;


CREATE TABLE IF NOT EXISTS `order` (
  `id_order` int NOT NULL AUTO_INCREMENT,
  `coupon` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `code` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cpf` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `issue_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `freight` decimal(11,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;


CREATE TABLE IF NOT EXISTS `order_item` (
  `id_order` int NOT NULL,
  `id_item` int NOT NULL,
  `price` decimal(11,2) NOT NULL DEFAULT '0.00',
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_order`,`id_item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
