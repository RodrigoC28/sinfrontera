-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 03, 2025 at 07:01 AM
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `autocarro`
--

INSERT INTO `autocarro` (`id_autocarro`, `matricula`, `capacidade`, `dta_registo`, `dta_atualizacao`) VALUES
(1, 'MN-58-PB', 30, '2025-06-02 17:44:35', '2025-06-02 22:56:21');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paragem`
--

INSERT INTO `paragem` (`id_paragem`, `nome`, `coordenadas`, `dta_registo`, `dta_atualizacao`) VALUES
(2, 'Coimbra', '40.2115, -8.4292', '2025-06-02 23:30:54', '2025-06-03 03:22:37');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `utilizador`
--

INSERT INTO `utilizador` (`id_utilizador`, `tipo_utilizador`, `nome`, `sobrenome`, `email`, `password`, `telemovel`, `dta_registo`, `dta_atualizacao`) VALUES
(2, 'cliente', 'asd', 'asd', 'asd@dsa.pt', '$2b$10$YGx0lkDMrhvDaGCsTJvNleYqO8nm1egO1zwohZAYGesEdO0d/ltLG', '912345678', '2025-06-02 04:26:34', '2025-06-02 04:26:34'),
(3, 'cliente', 'asd', 'asd', 'sadasd@asd.pt', '$2b$10$Cw8/40IDeRibWo3Gi04Li.m0dHrP24yYKbLpOGdiJHp7LhASlRXgO', '1464654', '2025-06-02 20:17:01', '2025-06-02 20:17:01');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `viagem`
--

INSERT INTO `viagem` (`id_viagem`, `id_autocarro`, `data`, `hora_partida`, `hora_chegada`, `preco`, `dta_registo`, `dta_atualizacao`) VALUES
(4, 1, '2025-06-26', '14:59:00', '10:00:00', 50.00, '2025-06-03 06:00:06', '2025-06-03 06:00:06');

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
(4, 2, '09:50:00', '2025-06-03 06:50:12', '2025-06-03 06:50:12');

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
