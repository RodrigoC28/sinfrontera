-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 06, 2025 at 11:36 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sinfrontera`
--

-- --------------------------------------------------------

--
-- Table structure for table `autocarro`
--

DROP TABLE IF EXISTS `autocarro`;
CREATE TABLE IF NOT EXISTS `autocarro` (
  `id_autocarro` int NOT NULL AUTO_INCREMENT,
  `matricula` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `capacidade` int NOT NULL,
  `dta_registo` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dta_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_autocarro`),
  UNIQUE KEY `matricula` (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `autocarro`
--

INSERT INTO `autocarro` (`id_autocarro`, `matricula`, `capacidade`, `dta_registo`, `dta_atualizacao`) VALUES
(1, 'MN-58-PB', 30, '2025-06-02 17:44:35', '2025-06-02 22:56:21'),
(8, 'BB-22-BB', 50, '2025-06-04 23:14:40', '2025-06-04 23:14:40');

-- --------------------------------------------------------

--
-- Table structure for table `condutor`
--

DROP TABLE IF EXISTS `condutor`;
CREATE TABLE IF NOT EXISTS `condutor` (
  `id_condutor` int NOT NULL AUTO_INCREMENT,
  `id_viagem` int NOT NULL,
  `nome` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `idade` int NOT NULL,
  `genero` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `dta_registo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dta_atualizacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_condutor`),
  KEY `id_viagem` (`id_viagem`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `condutor`
--

INSERT INTO `condutor` (`id_condutor`, `id_viagem`, `nome`, `idade`, `genero`, `dta_registo`, `dta_atualizacao`) VALUES
(6, 4, 'Frederico Fonseca', 43, 'Masculino', '2025-06-04 02:56:28', '2025-06-06 22:52:57');

-- --------------------------------------------------------

--
-- Table structure for table `paragem`
--

DROP TABLE IF EXISTS `paragem`;
CREATE TABLE IF NOT EXISTS `paragem` (
  `id_paragem` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `coordenadas` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `dta_registo` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dta_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_paragem`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paragem`
--

INSERT INTO `paragem` (`id_paragem`, `nome`, `coordenadas`, `dta_registo`, `dta_atualizacao`) VALUES
(2, 'Coimbra', '40.2115, -8.4292', '2025-06-02 23:30:54', '2025-06-03 03:22:37'),
(6, 'Lisboa', '40.2654, -8.2154', '2025-06-03 15:19:01', '2025-06-03 15:19:01'),
(7, 'Porto', '41.15, -8.61024', '2025-06-04 23:13:33', '2025-06-04 23:13:33');

-- --------------------------------------------------------

--
-- Table structure for table `utilizador`
--

DROP TABLE IF EXISTS `utilizador`;
CREATE TABLE IF NOT EXISTS `utilizador` (
  `id_utilizador` int NOT NULL AUTO_INCREMENT,
  `tipo_utilizador` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'cliente',
  `nome` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sobrenome` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telemovel` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dta_registo` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dta_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_utilizador`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `utilizador`
--

INSERT INTO `utilizador` (`id_utilizador`, `tipo_utilizador`, `nome`, `sobrenome`, `email`, `password`, `telemovel`, `dta_registo`, `dta_atualizacao`) VALUES
(2, 'admin', 'Leticia', 'Sosa', 'leticia_caetano94@hotmail.com', '$2b$10$qa2rWGo53WZ3Tku9RN7FT.B7A/hH3r22ZVuRdZhHCF76nc7PgGzoC', '926153317', '2025-06-02 04:26:34', '2025-06-06 22:56:56'),
(3, 'cliente', 'Rodrigo', 'Costa', 'rodrigocosta@gmail.com', '$2b$10$y.kYK85BPZAlefKnujCJSePovYmiS30JEGt/z126zlSmbW9BTnrIO', '913833378', '2025-06-02 20:17:01', '2025-06-06 22:55:42');

-- --------------------------------------------------------

--
-- Table structure for table `viagem`
--

DROP TABLE IF EXISTS `viagem`;
CREATE TABLE IF NOT EXISTS `viagem` (
  `id_viagem` int NOT NULL AUTO_INCREMENT,
  `id_autocarro` int NOT NULL,
  `data` date NOT NULL,
  `hora_partida` time NOT NULL,
  `hora_chegada` time NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `dta_registo` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dta_atualizacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_viagem`),
  KEY `id_autocarro` (`id_autocarro`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `viagem`
--

INSERT INTO `viagem` (`id_viagem`, `id_autocarro`, `data`, `hora_partida`, `hora_chegada`, `preco`, `dta_registo`, `dta_atualizacao`) VALUES
(4, 1, '2025-06-26', '14:59:00', '10:00:00', 50.00, '2025-06-03 06:00:06', '2025-06-03 06:00:06'),
(5, 8, '2025-06-06', '09:00:00', '13:00:00', 20.00, '2025-06-04 23:15:54', '2025-06-04 23:15:54'),
(6, 8, '2025-06-07', '09:00:00', '13:00:00', 30.00, '2025-06-04 23:16:23', '2025-06-04 23:17:20'),
(8, 8, '2025-06-09', '09:00:00', '13:00:00', 30.00, '2025-06-04 23:17:07', '2025-06-04 23:17:29'),
(10, 1, '2025-06-07', '14:00:00', '16:00:00', 30.00, '2025-06-05 00:47:18', '2025-06-05 00:47:18'),
(11, 8, '2025-06-08', '09:00:00', '13:00:00', 25.00, '2025-06-06 23:05:00', '2025-06-06 23:05:00');

-- --------------------------------------------------------

--
-- Table structure for table `viagem_paragem`
--

DROP TABLE IF EXISTS `viagem_paragem`;
CREATE TABLE IF NOT EXISTS `viagem_paragem` (
  `id_viagem` int NOT NULL,
  `id_paragem` int NOT NULL,
  `hora` time NOT NULL,
  `dta_registo` datetime DEFAULT CURRENT_TIMESTAMP,
  `dta_atualizacao` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_viagem`,`id_paragem`),
  KEY `id_paragem` (`id_paragem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `viagem_paragem`
--

INSERT INTO `viagem_paragem` (`id_viagem`, `id_paragem`, `hora`, `dta_registo`, `dta_atualizacao`) VALUES
(4, 2, '09:50:00', '2025-06-03 06:50:12', '2025-06-03 06:50:12'),
(4, 6, '10:00:00', '2025-06-03 15:19:35', '2025-06-03 15:19:35'),
(5, 6, '13:00:00', '2025-06-04 23:18:57', '2025-06-04 23:18:57'),
(5, 7, '09:00:00', '2025-06-04 23:18:45', '2025-06-04 23:18:45'),
(6, 6, '13:00:00', '2025-06-04 23:19:39', '2025-06-04 23:19:39'),
(6, 7, '09:00:00', '2025-06-04 23:19:16', '2025-06-04 23:19:16'),
(8, 7, '09:00:00', '2025-06-06 20:40:49', '2025-06-06 20:40:49'),
(10, 2, '16:00:00', '2025-06-05 00:48:55', '2025-06-05 00:48:55'),
(10, 6, '18:00:00', '2025-06-05 00:49:19', '2025-06-05 00:49:19'),
(10, 7, '14:00:00', '2025-06-05 00:47:47', '2025-06-05 00:47:47'),
(11, 2, '11:00:00', '2025-06-06 23:06:02', '2025-06-06 23:06:02'),
(11, 6, '13:00:00', '2025-06-06 23:06:13', '2025-06-06 23:06:13'),
(11, 7, '09:00:00', '2025-06-06 23:05:50', '2025-06-06 23:05:50');

-- --------------------------------------------------------

--
-- Table structure for table `viagem_utilizador`
--

DROP TABLE IF EXISTS `viagem_utilizador`;
CREATE TABLE IF NOT EXISTS `viagem_utilizador` (
  `id_viagem` int NOT NULL,
  `id_utilizador` int NOT NULL,
  `mtd_pagamento` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `desconto` decimal(5,2) NOT NULL,
  `n_passageiros` int NOT NULL,
  `dta_registo` datetime DEFAULT CURRENT_TIMESTAMP,
  `dta_atualizacao` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_viagem`,`id_utilizador`),
  KEY `id_utilizador` (`id_utilizador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `viagem_utilizador`
--

INSERT INTO `viagem_utilizador` (`id_viagem`, `id_utilizador`, `mtd_pagamento`, `desconto`, `n_passageiros`, `dta_registo`, `dta_atualizacao`) VALUES
(5, 2, 'Cartão de Crédito', 0.00, 1, '2025-06-06 22:11:17', '2025-06-06 22:11:17'),
(11, 3, 'Cartão de Crédito', 0.00, 1, '2025-06-06 23:12:23', '2025-06-06 23:12:23');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `condutor`
--
ALTER TABLE `condutor`
  ADD CONSTRAINT `condutor_ibfk_1` FOREIGN KEY (`id_viagem`) REFERENCES `viagem` (`id_viagem`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `viagem`
--
ALTER TABLE `viagem`
  ADD CONSTRAINT `viagem_ibfk_1` FOREIGN KEY (`id_autocarro`) REFERENCES `autocarro` (`id_autocarro`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `viagem_paragem`
--
ALTER TABLE `viagem_paragem`
  ADD CONSTRAINT `viagem_paragem_ibfk_1` FOREIGN KEY (`id_viagem`) REFERENCES `viagem` (`id_viagem`),
  ADD CONSTRAINT `viagem_paragem_ibfk_2` FOREIGN KEY (`id_paragem`) REFERENCES `paragem` (`id_paragem`);

--
-- Constraints for table `viagem_utilizador`
--
ALTER TABLE `viagem_utilizador`
  ADD CONSTRAINT `viagem_utilizador_ibfk_1` FOREIGN KEY (`id_viagem`) REFERENCES `viagem` (`id_viagem`) ON DELETE CASCADE,
  ADD CONSTRAINT `viagem_utilizador_ibfk_2` FOREIGN KEY (`id_utilizador`) REFERENCES `utilizador` (`id_utilizador`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
