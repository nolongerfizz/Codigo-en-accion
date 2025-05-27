-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 27-05-2025 a las 23:24:52
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
-- Estructura de tabla para la tabla `carrito`
--

DROP TABLE IF EXISTS `carrito`;
CREATE TABLE IF NOT EXISTS `carrito` (
  `Id_carrito` int NOT NULL AUTO_INCREMENT,
  `Id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`Id_carrito`),
  KEY `fk_carrito_usuario` (`Id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=ucs2 COLLATE=ucs2_spanish2_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`Id_carrito`, `Id_usuario`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `Id_usuario` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) COLLATE ucs2_spanish2_ci DEFAULT NULL,
  `Correo` varchar(100) COLLATE ucs2_spanish2_ci DEFAULT NULL,
  `Telefono` varchar(20) COLLATE ucs2_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`Id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=ucs2 COLLATE=ucs2_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Id_usuario`, `Nombre`, `Correo`, `Telefono`) VALUES
(1, 'Laura Martínez', 'laura.martinez@gmail.com', '3214567890'),
(2, 'Carlos Ramírez', 'carlos.ramirez@gmail.com', '3001234567'),
(3, 'Camila Torres', 'camila.torres@gmail.com', '3109876543'),
(4, 'Juan Pérez', 'juan.perez@gmail.com', '3136549871'),
(5, 'Ana Gómez', 'ana.gomez@gmail.com', '3157893210'),
(6, 'Luis Herrera', 'luis.herrera@gmail.com', '3112345678'),
(7, 'Valentina Ríos', 'valentina.rios@gmail.com', '3123456789'),
(8, 'Andrés Díaz', 'andres.diaz@gmail.com', '3169871234'),
(9, 'Isabella Moreno', 'isabella.moreno@gmail.com', '3184567890'),
(10, 'David Castro', 'david.castro@gmail.com', '3206549871'),
(11, 'Daniela Medina', 'daniela.medina@gmail.com', '3173214560'),
(12, 'Sebastián Ruiz', 'sebastian.ruiz@gmail.com', '3003219876'),
(13, 'Mariana Romero', 'mariana.romero@gmail.com', '3024567890'),
(14, 'Mateo Vargas', 'mateo.vargas@gmail.com', '3041234567'),
(15, 'Sara Cárdenas', 'sara.cardenas@gmail.com', '3057890123'),
(16, 'Felipe Mendoza', 'felipe.mendoza@gmail.com', '3069876543'),
(17, 'Nicole Salazar', 'nicole.salazar@gmail.com', '3098765432'),
(18, 'Tomás Gil', 'tomas.gil@gmail.com', '3147896541'),
(19, 'Luciana Pineda', 'luciana.pineda@gmail.com', '3087654321'),
(20, 'Julián Ortega', 'julian.ortega@gmail.com', '3076543219');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `fk_carrito_usuario` FOREIGN KEY (`Id_usuario`) REFERENCES `usuario` (`Id_usuario`);

--
-- Filtros para la tabla `contiene`
--
ALTER TABLE `contiene`
  ADD CONSTRAINT `fk_contiene_carrito` FOREIGN KEY (`Id_carrito`) REFERENCES `carrito` (`Id_carrito`),
  ADD CONSTRAINT `fk_contiene_producto` FOREIGN KEY (`Id_producto`) REFERENCES `producto` (`Id_producto`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`Id_usuario`) REFERENCES `usuario` (`Id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
