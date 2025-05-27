-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 27-05-2025 a las 23:29:01
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
-- Estructura de tabla para la tabla `pedido`
--

DROP TABLE IF EXISTS `pedido`;
CREATE TABLE IF NOT EXISTS `pedido` (
  `Id_pedido` int NOT NULL AUTO_INCREMENT,
  `Direccion` varchar(255) COLLATE ucs2_spanish2_ci DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Total_pedido` decimal(10,2) DEFAULT NULL,
  `Estado` varchar(50) COLLATE ucs2_spanish2_ci DEFAULT NULL,
  `Id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`Id_pedido`),
  KEY `fk_pedido_usuario` (`Id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=ucs2 COLLATE=ucs2_spanish2_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`Id_pedido`, `Direccion`, `Fecha`, `Total_pedido`, `Estado`, `Id_usuario`) VALUES
(1, 'Calle 123 #45-67, Bogotá', '2025-05-27', 597000.00, 'Pagado', 1),
(2, 'Cra 15 #98-23, Medellín', '2025-05-26', 160000.00, 'Pendiente', 2),
(3, 'Av. Siempre Viva 742, Cali', '2025-05-25', 80000.00, 'Entregado', 3),
(4, 'Cl. 72 #8-60, Bogotá', '2025-05-24', 245000.00, 'En preparación', 4),
(5, 'Carrera 10 #20-30, Bucaramanga', '2025-05-23', 98000.00, 'Pagado', 5),
(6, 'Av. Boyacá #21-55, Bogotá', '2025-05-22', 320000.00, 'Cancelado', 6),
(7, 'Cra 50 #70-10, Barranquilla', '2025-05-21', 153000.00, 'Pendiente', 7),
(8, 'Calle 30 #20-40, Cartagena', '2025-05-20', 278000.00, 'Enviado', 8),
(9, 'Cra 33 #25-90, Pereira', '2025-05-19', 125000.00, 'Entregado', 9),
(10, 'Cl. 45 #19-12, Manizales', '2025-05-18', 61000.00, 'Pagado', 10);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`Id_usuario`) REFERENCES `usuario` (`Id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
