-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 27-05-2025 a las 23:28:19
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda_amigurumis`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refiere`
--

DROP TABLE IF EXISTS `refiere`;
CREATE TABLE IF NOT EXISTS `refiere` (
  `Id_pedido_producto` int NOT NULL AUTO_INCREMENT,
  `Cantidad` int DEFAULT NULL,
  `Personalizacion` varchar(255) COLLATE ucs2_spanish2_ci DEFAULT NULL,
  `Tamaño` varchar(10) COLLATE ucs2_spanish2_ci DEFAULT NULL,
  `Empaque_especial` tinyint(1) DEFAULT NULL,
  `Total_producto` decimal(10,2) DEFAULT NULL,
  `Id_producto` int DEFAULT NULL,
  `Id_pedido` int DEFAULT NULL,
  PRIMARY KEY (`Id_pedido_producto`),
  KEY `fk_refiere_pedido` (`Id_pedido`),
  KEY `fk_refiere_producto` (`Id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=ucs2 COLLATE=ucs2_spanish2_ci;

--
-- Volcado de datos para la tabla `refiere`
--

INSERT INTO `refiere` (`Id_pedido_producto`, `Cantidad`, `Personalizacion`, `Tamaño`, `Empaque_especial`, `Total_producto`, `Id_producto`, `Id_pedido`) VALUES
(1, 1, 'Kiki personalizado como Tanjiro Kamado (ropa + cicatriz)', 'Grande (20', 1, 165000.00, 2, 1),
(2, 1, 'Mochi personalizado como Kakashi (uniforme + cabello blanco)', 'Grande (20', 1, 150000.00, 6, 1),
(3, 1, 'TonTon personalizado como Naruto (traje naranja + vincha)', 'Pequeño (1', 1, 135000.00, 1, 1),
(4, 1, 'Kuma personalizado como Luffy (sombrero + chaleco rojo)', 'Pequeño (1', 1, 135000.00, 3, 1),
(5, 1, 'Shiro como Nezuko (ropa + bambú en boca)', 'Grande (20', 1, 155000.00, 5, 2),
(6, 1, 'Maru personalizado como Goku (traje naranja + cabello)', 'Único', 1, 150000.00, 4, 3),
(7, 1, 'Kiki como Zenitsu (ropa amarillo relámpago)', 'Grande (20', 1, 165000.00, 2, 4),
(8, 1, 'TonTon como Sailor Moon (ropa + moño)', 'Pequeño (1', 1, 135000.00, 1, 5),
(9, 1, 'Mochi como Levi Ackerman (ropa de explorador)', 'Grande (20', 1, 150000.00, 6, 6),
(10, 1, 'Shiro como Eren Jaeger (temporada 4)', 'Único', 0, 80000.00, 5, 7);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
