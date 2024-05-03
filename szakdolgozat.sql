-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2024 at 09:18 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `szakdolgozat`
--
CREATE DATABASE IF NOT EXISTS `szakdolgozat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `szakdolgozat`;

-- --------------------------------------------------------

--
-- Table structure for table `beszerzes`
--

DROP TABLE IF EXISTS `beszerzes`;
CREATE TABLE `beszerzes` (
  `termek` bigint(20) UNSIGNED NOT NULL,
  `kelt` datetime NOT NULL,
  `mennyiseg` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `beszerzes`
--

INSERT INTO `beszerzes` (`termek`, `kelt`, `mennyiseg`, `created_at`, `updated_at`) VALUES
(9, '2024-05-02 12:08:02', 2, '2024-05-02 10:08:02', '2024-05-02 10:08:02'),
(12, '2024-05-02 09:49:56', 4, '2024-05-02 07:49:56', '2024-05-02 07:49:56');

--
-- Triggers `beszerzes`
--
DROP TRIGGER IF EXISTS `beszerzes_insert_trigger`;
DELIMITER $$
CREATE TRIGGER `beszerzes_insert_trigger` AFTER INSERT ON `beszerzes` FOR EACH ROW BEGIN
            DECLARE termek_mennyiseg INT;
            
            SELECT keszlet INTO termek_mennyiseg FROM termeks WHERE ter_id = NEW.termek;
            
            UPDATE termeks SET keszlet = termek_mennyiseg + NEW.mennyiseg WHERE ter_id = NEW.termek;
        END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `csomags`
--

DROP TABLE IF EXISTS `csomags`;
CREATE TABLE `csomags` (
  `csom_azon` bigint(20) UNSIGNED NOT NULL,
  `allapot` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `csomags`
--

INSERT INTO `csomags` (`csom_azon`, `allapot`, `created_at`, `updated_at`) VALUES
(7, 1, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(85, 2, '2024-05-02 06:47:37', '2024-05-02 06:47:37'),
(322, 3, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(610, 3, '2024-05-02 06:47:37', '2024-05-02 06:47:37'),
(642, 2, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(820, 3, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(2878, 0, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(10846, 1, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(7470380, 3, '2024-05-02 06:47:37', '2024-05-02 06:47:37'),
(15139450, 1, '2024-05-02 06:47:37', '2024-05-02 06:47:37'),
(15139451, 3, '2024-05-02 06:51:16', '2024-05-02 06:51:16'),
(15139452, 0, '2024-05-02 06:59:05', '2024-05-02 06:59:05'),
(15139453, 3, '2024-05-02 08:23:43', '2024-05-02 08:23:43'),
(15139454, 0, '2024-05-02 14:40:15', '2024-05-02 14:40:15'),
(15139455, 0, '2024-05-02 19:57:50', '2024-05-02 19:57:50');

--
-- Triggers `csomags`
--
DROP TRIGGER IF EXISTS `update_kiszallitva_trigger`;
DELIMITER $$
CREATE TRIGGER `update_kiszallitva_trigger` AFTER UPDATE ON `csomags` FOR EACH ROW BEGIN
            IF NEW.allapot = 3 THEN
                UPDATE rendeles SET kiszallitva = NOW() WHERE NEW.csom_azon = rendeles.csomag;
            END IF;
        END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategorias`
--

DROP TABLE IF EXISTS `kategorias`;
CREATE TABLE `kategorias` (
  `kat_id` bigint(20) UNSIGNED NOT NULL,
  `kategoria_nev` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategorias`
--

INSERT INTO `kategorias` (`kat_id`, `kategoria_nev`, `created_at`, `updated_at`) VALUES
(1, 'proba', '2024-05-02 06:47:25', '2024-05-02 06:47:25'),
(2, 'hálószobabútor', '2024-05-02 06:47:25', '2024-05-02 06:47:25'),
(4, 'világítás', '2024-05-02 13:25:05', '2024-05-02 13:25:05'),
(6, 'nappali', '2024-05-02 13:25:32', '2024-05-02 13:25:32'),
(7, 'tárolás', '2024-05-02 13:25:46', '2024-05-02 13:25:46'),
(8, 'fürdőszoba', '2024-05-02 13:26:02', '2024-05-02 13:26:02');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2011_02_27_082904_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2024_02_13_120001_create_kategorias_table', 1),
(7, '2024_02_13_120002_create_modells_table', 1),
(8, '2024_02_13_120003_create_tulajdonsags_table', 1),
(9, '2024_02_13_120004_create_termeks_table', 1),
(10, '2024_02_13_120005_create_termek_tulajdonsags_table', 1),
(11, '2024_02_13_132055_create_beszerzes_table', 1),
(12, '2024_02_13_132523_create_csomags_table', 1),
(13, '2024_02_13_133500_create_rendeles_table', 1),
(14, '2024_02_13_133507_create_rend_tetels_table', 1),
(15, '2024_04_23_164736_beszerzes_insert_trigger', 1),
(16, '2024_04_23_170701_rendeles_tetel_insert_trigger', 1),
(17, '2024_05_02_081525_rendeles_tetel_delete_trigger', 1),
(18, '2024_05_02_082526_update_kisszallitva_trigger', 1);

-- --------------------------------------------------------

--
-- Table structure for table `modells`
--

DROP TABLE IF EXISTS `modells`;
CREATE TABLE `modells` (
  `mod_id` bigint(20) UNSIGNED NOT NULL,
  `nev` varchar(255) NOT NULL,
  `leiras` varchar(255) NOT NULL,
  `kategoria` bigint(20) UNSIGNED NOT NULL,
  `gyarto` varchar(255) NOT NULL,
  `kep` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `modells`
--

INSERT INTO `modells` (`mod_id`, `nev`, `leiras`, `kategoria`, `gyarto`, `kep`, `created_at`, `updated_at`) VALUES
(1, 'id', 'Cumque consequatur explicabo minima dignissimos autem. Et quia nulla vero doloremque. Ea eius tempora quia facere laborum aliquid commodi deleniti.', 1, 'O\'Kon-Lang', 'kepek/fur1.jpg', '2024-05-02 06:47:34', '2024-05-02 06:47:34'),
(2, 'ullam', 'Cum blanditiis cupiditate in. Est distinctio ea sed ut libero magnam at. Quibusdam sed est error voluptatum. Nihil ea vel libero eveniet alias.', 1, 'Pacocha Ltd', 'kepek/fur2.jpg', '2024-05-02 06:47:34', '2024-05-02 06:47:34'),
(3, 'santeli', 'very nice', 1, 'Spavce X', 'kepek/fur3.jpg', '2024-05-02 06:47:34', '2024-05-02 06:47:34'),
(4, 'iste', 'Tempore dolorem nemo accusantium. Laboriosam voluptatem itaque maxime quidem qui aspernatur molestias. Officiis eum tempore quam quis quia. Est fugiat consequatur rerum voluptates.', 2, 'Durgan-Towne', 'kepek/fur4.jpg', '2024-05-02 06:47:34', '2024-05-02 06:47:34'),
(5, 'rerum', 'Impedit ut aut aut qui fugiat magni ad. Alias optio et quod odio. Et optio enim repellat ut. Eligendi ratione consequatur possimus quae nostrum.', 1, 'Douglas, Kuphal and Heller', 'kepek/fur5.jpg', '2024-05-02 06:47:34', '2024-05-02 06:47:34'),
(6, 'laudantium', 'Voluptate veritatis veniam quae eius. Qui sunt tempora mollitia eligendi quam quas corporis voluptatum. Dolorem laudantium expedita dolores ex eos. Vel amet doloribus ut qui quisquam molestias.', 2, 'Russel-Koss', 'kepek/fur6.jpg', '2024-05-02 06:47:34', '2024-05-02 06:47:34'),
(7, 'quos', 'Rerum voluptas architecto qui ad. Iste et doloremque et. Qui earum illum minus quia voluptate aut voluptatibus. Veritatis aperiam tempora tempora dignissimos laboriosam.', 2, 'Kessler and Sons', 'kepek/fur7.jpg', '2024-05-02 06:47:34', '2024-05-02 06:47:34'),
(8, 'ut', 'Animi impedit fugit doloribus possimus. Consequatur minus at maiores quidem et id quo. Et ut delectus aut quia ut. Quam officiis voluptatem dolor amet possimus fuga repellat.', 1, 'Lehner-O\'Kon', 'kepek/fur8.jpg', '2024-05-02 06:47:34', '2024-05-02 06:47:34'),
(9, 'tempora', 'Est consectetur illum quas tempore ipsum atque aliquid iure. Corrupti doloremque doloremque accusantium qui tenetur. Aut illo est facilis laboriosam.', 2, 'Wisozk Inc', 'kepek/fur9.png', '2024-05-02 06:47:34', '2024-05-02 06:47:34'),
(10, 'quisquam', 'Laboriosam delectus totam iste inventore corporis fugit excepturi. Hic quo nemo fuga sint. Aut et est ab quod animi est.', 2, 'Stark-Daugherty', 'kepek/fur10.png', '2024-05-02 06:47:34', '2024-05-02 06:47:34');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rendeles`
--

DROP TABLE IF EXISTS `rendeles`;
CREATE TABLE `rendeles` (
  `rend_szam` bigint(20) UNSIGNED NOT NULL,
  `user` bigint(20) UNSIGNED NOT NULL,
  `csomag` bigint(20) UNSIGNED NOT NULL,
  `kelt` datetime NOT NULL,
  `kiszallitva` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rendeles`
--

INSERT INTO `rendeles` (`rend_szam`, `user`, `csomag`, `kelt`, `kiszallitva`, `created_at`, `updated_at`) VALUES
(13, 2, 15139453, '2024-05-02 10:23:43', '2024-05-02 12:58:02', '2024-05-02 08:23:43', '2024-05-02 08:23:43'),
(14, 2, 15139454, '2024-05-02 16:40:15', NULL, '2024-05-02 14:40:15', '2024-05-02 14:40:15'),
(15, 1, 15139455, '2024-05-02 21:57:50', NULL, '2024-05-02 19:57:50', '2024-05-02 19:57:50');

-- --------------------------------------------------------

--
-- Table structure for table `rend_tetels`
--

DROP TABLE IF EXISTS `rend_tetels`;
CREATE TABLE `rend_tetels` (
  `rendeles` bigint(20) UNSIGNED NOT NULL,
  `termek` bigint(20) UNSIGNED NOT NULL,
  `mennyiseg` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rend_tetels`
--

INSERT INTO `rend_tetels` (`rendeles`, `termek`, `mennyiseg`, `created_at`, `updated_at`) VALUES
(13, 9, 2, '2024-05-02 08:23:44', '2024-05-02 08:23:44'),
(13, 20, 1, '2024-05-02 08:23:44', '2024-05-02 08:23:44'),
(14, 9, 2, '2024-05-02 14:40:16', '2024-05-02 14:40:16');

--
-- Triggers `rend_tetels`
--
DROP TRIGGER IF EXISTS `rendeles_tetel_delete_trigger`;
DELIMITER $$
CREATE TRIGGER `rendeles_tetel_delete_trigger` AFTER DELETE ON `rend_tetels` FOR EACH ROW BEGIN
            DECLARE termek_mennyiseg INT;
            
            SELECT keszlet INTO termek_mennyiseg FROM termeks WHERE ter_id = OLD.termek;
            
            UPDATE termeks SET keszlet = termek_mennyiseg + OLD.mennyiseg WHERE ter_id = OLD.termek;
        END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `rendeles_tetel_insert_trigger`;
DELIMITER $$
CREATE TRIGGER `rendeles_tetel_insert_trigger` AFTER INSERT ON `rend_tetels` FOR EACH ROW BEGIN
            DECLARE termek_mennyiseg INT;
            
            SELECT keszlet INTO termek_mennyiseg FROM termeks WHERE ter_id = NEW.termek;
            
            UPDATE termeks SET keszlet = termek_mennyiseg - NEW.mennyiseg WHERE ter_id = NEW.termek;
        END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `termeks`
--

DROP TABLE IF EXISTS `termeks`;
CREATE TABLE `termeks` (
  `ter_id` bigint(20) UNSIGNED NOT NULL,
  `leiras` text DEFAULT NULL,
  `ar` decimal(10,2) NOT NULL,
  `modell` bigint(20) UNSIGNED NOT NULL,
  `anyag` varchar(255) DEFAULT NULL,
  `szin` varchar(255) DEFAULT NULL,
  `keszlet` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `termeks`
--

INSERT INTO `termeks` (`ter_id`, `leiras`, `ar`, `modell`, `anyag`, `szin`, `keszlet`, `created_at`, `updated_at`) VALUES
(1, NULL, '72988.00', 6, 'sapiente', 'Silver', 31, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(2, NULL, '71047.00', 5, 'rerum', 'AliceBlue', 16, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(3, NULL, '5231.00', 10, 'qui', 'DarkOrchid', 69, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(4, NULL, '63950.00', 9, 'repudiandae', 'AntiqueWhite', 35, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(5, NULL, '55519.00', 7, 'voluptas', 'Khaki', 53, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(6, NULL, '27845.00', 7, 'odit', 'Green', 54, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(7, NULL, '44552.00', 5, 'et', 'Crimson', 85, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(8, NULL, '8880.00', 6, 'voluptate', 'DarkMagenta', 56, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(9, NULL, '8418.00', 3, NULL, 'CornflowerBlue', 92, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(10, NULL, '14279.00', 9, 'enim', 'Purple', 18, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(11, NULL, '6980.00', 10, 'amet', 'Violet', 55, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(12, NULL, '29821.00', 4, 'ut', 'Blue', 93, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(13, NULL, '23267.00', 4, 'in', 'SkyBlue', 68, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(14, NULL, '4815.00', 8, 'ea', 'DarkRed', 48, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(15, NULL, '93440.00', 7, 'magnam', 'Lavender', 51, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(16, NULL, '43869.00', 9, 'dolor', 'MistyRose', 72, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(17, NULL, '55226.00', 7, 'ex', 'BlueViolet', 25, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(18, NULL, '96614.00', 8, 'expedita', 'DarkSlateBlue', 43, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(19, NULL, '26210.00', 10, 'rem', 'Sienna', 48, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(20, NULL, '20974.00', 3, 'Béla', 'Chartreuse', 57, '2024-05-02 06:47:36', '2024-05-02 06:47:36');

-- --------------------------------------------------------

--
-- Table structure for table `termek_tulajdonsags`
--

DROP TABLE IF EXISTS `termek_tulajdonsags`;
CREATE TABLE `termek_tulajdonsags` (
  `termek` bigint(20) UNSIGNED NOT NULL,
  `tulajdonsag` bigint(20) UNSIGNED NOT NULL,
  `ertek` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `termek_tulajdonsags`
--

INSERT INTO `termek_tulajdonsags` (`termek`, `tulajdonsag`, `ertek`, `created_at`, `updated_at`) VALUES
(11, 11, 'et', '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(12, 12, 'modi', '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(13, 13, 'provident', '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(14, 14, 'omnis', '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(15, 15, 'enim', '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(16, 16, 'laborum', '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(17, 17, 'necessitatibus', '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(18, 18, 'placeat', '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(19, 19, 'fuga', '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(20, 20, 'doloremque', '2024-05-02 06:47:36', '2024-05-02 06:47:36');

-- --------------------------------------------------------

--
-- Table structure for table `tulajdonsags`
--

DROP TABLE IF EXISTS `tulajdonsags`;
CREATE TABLE `tulajdonsags` (
  `azonosito` bigint(20) UNSIGNED NOT NULL,
  `nev` varchar(255) NOT NULL,
  `kategoria` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tulajdonsags`
--

INSERT INTO `tulajdonsags` (`azonosito`, `nev`, `kategoria`, `created_at`, `updated_at`) VALUES
(1, 'quaerat', 2, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(2, 'ut', 1, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(3, 'dicta', 2, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(4, 'exercitationem', 2, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(5, 'aliquam', 1, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(6, 'sunt', 2, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(7, 'ut', 1, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(8, 'ea', 1, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(9, 'illo', 2, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(10, 'eaque', 2, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(11, 'assumenda', 2, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(12, 'harum', 1, '2024-05-02 06:47:35', '2024-05-02 06:47:35'),
(13, 'odit', 1, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(14, 'itaque', 1, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(15, 'molestiae', 2, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(16, 'eos', 1, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(17, 'unde', 2, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(18, 'molestiae', 1, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(19, 'illum', 2, '2024-05-02 06:47:36', '2024-05-02 06:47:36'),
(20, 'suscipit', 2, '2024-05-02 06:47:36', '2024-05-02 06:47:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `azon` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `hozzaferes` int(11) NOT NULL DEFAULT 0,
  `cim` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`azon`, `name`, `email`, `email_verified_at`, `password`, `hozzaferes`, `cim`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@admin.com', NULL, '$2y$12$3u.NQ6YB49OdgqodOAKA7eWk1A.McsFvNmshvbAqMsRzylaTR0EQy', 1, NULL, NULL, '2024-05-02 06:47:23', '2024-05-02 06:47:23'),
(2, 'vendeg', 'vendeg@vendeg.com', NULL, '$2y$12$djpktNGKz3PRDRBPWE1d.e423vui7KyT..U/tYAphocp6WO6LjhqO', 0, NULL, NULL, '2024-05-02 06:47:23', '2024-05-02 06:47:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beszerzes`
--
ALTER TABLE `beszerzes`
  ADD PRIMARY KEY (`termek`,`kelt`);

--
-- Indexes for table `csomags`
--
ALTER TABLE `csomags`
  ADD PRIMARY KEY (`csom_azon`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `kategorias`
--
ALTER TABLE `kategorias`
  ADD PRIMARY KEY (`kat_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `modells`
--
ALTER TABLE `modells`
  ADD PRIMARY KEY (`mod_id`),
  ADD KEY `modells_kategoria_foreign` (`kategoria`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `rendeles`
--
ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`rend_szam`),
  ADD KEY `rendeles_user_foreign` (`user`),
  ADD KEY `rendeles_csomag_foreign` (`csomag`);

--
-- Indexes for table `rend_tetels`
--
ALTER TABLE `rend_tetels`
  ADD KEY `rend_tetels_rendeles_foreign` (`rendeles`),
  ADD KEY `rend_tetels_termek_foreign` (`termek`);

--
-- Indexes for table `termeks`
--
ALTER TABLE `termeks`
  ADD PRIMARY KEY (`ter_id`),
  ADD KEY `termeks_modell_foreign` (`modell`);

--
-- Indexes for table `termek_tulajdonsags`
--
ALTER TABLE `termek_tulajdonsags`
  ADD PRIMARY KEY (`termek`,`tulajdonsag`),
  ADD KEY `termek_tulajdonsags_tulajdonsag_foreign` (`tulajdonsag`);

--
-- Indexes for table `tulajdonsags`
--
ALTER TABLE `tulajdonsags`
  ADD PRIMARY KEY (`azonosito`),
  ADD KEY `tulajdonsags_kategoria_foreign` (`kategoria`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`azon`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `csomags`
--
ALTER TABLE `csomags`
  MODIFY `csom_azon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15139456;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategorias`
--
ALTER TABLE `kategorias`
  MODIFY `kat_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `modells`
--
ALTER TABLE `modells`
  MODIFY `mod_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rendeles`
--
ALTER TABLE `rendeles`
  MODIFY `rend_szam` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `termeks`
--
ALTER TABLE `termeks`
  MODIFY `ter_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tulajdonsags`
--
ALTER TABLE `tulajdonsags`
  MODIFY `azonosito` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `azon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `beszerzes`
--
ALTER TABLE `beszerzes`
  ADD CONSTRAINT `beszerzes_termek_foreign` FOREIGN KEY (`termek`) REFERENCES `termeks` (`ter_id`);

--
-- Constraints for table `modells`
--
ALTER TABLE `modells`
  ADD CONSTRAINT `modells_kategoria_foreign` FOREIGN KEY (`kategoria`) REFERENCES `kategorias` (`kat_id`);

--
-- Constraints for table `rendeles`
--
ALTER TABLE `rendeles`
  ADD CONSTRAINT `rendeles_csomag_foreign` FOREIGN KEY (`csomag`) REFERENCES `csomags` (`csom_azon`),
  ADD CONSTRAINT `rendeles_user_foreign` FOREIGN KEY (`user`) REFERENCES `users` (`azon`);

--
-- Constraints for table `rend_tetels`
--
ALTER TABLE `rend_tetels`
  ADD CONSTRAINT `rend_tetels_rendeles_foreign` FOREIGN KEY (`rendeles`) REFERENCES `rendeles` (`rend_szam`),
  ADD CONSTRAINT `rend_tetels_termek_foreign` FOREIGN KEY (`termek`) REFERENCES `termeks` (`ter_id`);

--
-- Constraints for table `termeks`
--
ALTER TABLE `termeks`
  ADD CONSTRAINT `termeks_modell_foreign` FOREIGN KEY (`modell`) REFERENCES `modells` (`mod_id`);

--
-- Constraints for table `termek_tulajdonsags`
--
ALTER TABLE `termek_tulajdonsags`
  ADD CONSTRAINT `termek_tulajdonsags_termek_foreign` FOREIGN KEY (`termek`) REFERENCES `termeks` (`ter_id`),
  ADD CONSTRAINT `termek_tulajdonsags_tulajdonsag_foreign` FOREIGN KEY (`tulajdonsag`) REFERENCES `tulajdonsags` (`azonosito`);

--
-- Constraints for table `tulajdonsags`
--
ALTER TABLE `tulajdonsags`
  ADD CONSTRAINT `tulajdonsags_kategoria_foreign` FOREIGN KEY (`kategoria`) REFERENCES `kategorias` (`kat_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
