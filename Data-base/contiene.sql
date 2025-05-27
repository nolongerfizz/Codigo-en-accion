-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 27-05-2025 a las 23:29:14
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
-- Estructura de tabla para la tabla `contiene`
--

DROP TABLE IF EXISTS `contiene`;
CREATE TABLE IF NOT EXISTS `contiene` (
  `Id_carrito_producto` int NOT NULL AUTO_INCREMENT,
  `Cantidad` int DEFAULT NULL,
  `Personalizacion` varchar(255) COLLATE ucs2_spanish2_ci DEFAULT NULL,
  `Tamaño` varchar(10) COLLATE ucs2_spanish2_ci DEFAULT NULL,
  `Empaque_especial_si_no` tinyint(1) DEFAULT NULL,
  `Total_producto` decimal(10,2) DEFAULT NULL,
  `Id_carrito` int DEFAULT NULL,
  `Id_producto` int DEFAULT NULL,
  PRIMARY KEY (`Id_carrito_producto`),
  KEY `fk_contiene_carrito` (`Id_carrito`),
  KEY `fk_contiene_producto` (`Id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=ucs2 COLLATE=ucs2_spanish2_ci;

--
-- Volcado de datos para la tabla `contiene`
--

INSERT INTO `contiene` (`Id_carrito_producto`, `Cantidad`, `Personalizacion`, `Tamaño`, `Empaque_especial_si_no`, `Total_producto`, `Id_carrito`, `Id_producto`) VALUES
(1, 1, 'Diseño como Naruto', 'Pequeño (1', 1, 135000.00, 1, 3),
(2, 1, '', 'Grande (20', 1, 165000.00, 1, 1),
(3, 1, '', 'Grande (20', 1, 150000.00, 1, 6),
(4, 1, '', 'Pequeño (1', 1, 135000.00, 1, 3);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contiene`
--
ALTER TABLE `contiene`
  ADD CONSTRAINT `fk_contiene_carrito` FOREIGN KEY (`Id_carrito`) REFERENCES `carrito` (`Id_carrito`),
  ADD CONSTRAINT `fk_contiene_producto` FOREIGN KEY (`Id_producto`) REFERENCES `producto` (`Id_producto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
