-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 27-05-2025 a las 23:28:43
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
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `Id_producto` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) COLLATE ucs2_spanish2_ci DEFAULT NULL,
  `Tamaño` varchar(10) COLLATE ucs2_spanish2_ci DEFAULT NULL,
  `Precio` decimal(10,2) DEFAULT NULL,
  `Empaque_especial_si_no` tinyint(1) DEFAULT NULL,
  `Incremento_precio` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`Id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=ucs2 COLLATE=ucs2_spanish2_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`Id_producto`, `Nombre`, `Tamaño`, `Precio`, `Empaque_especial_si_no`, `Incremento_precio`) VALUES
(1, 'TonTon', 'Único', 80000.00, 1, 5000.00),
(2, 'Kiki', 'Único', 80000.00, 1, 5000.00),
(3, 'Kuma', 'Único', 80000.00, 1, 5000.00),
(4, 'Maru', 'Único', 80000.00, 1, 5000.00),
(5, 'Shiro', 'Único', 80000.00, 1, 5000.00),
(6, 'Mochi', 'Único', 80000.00, 1, 5000.00);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
