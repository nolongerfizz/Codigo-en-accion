-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 27-05-2025 a las 23:27:30
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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
