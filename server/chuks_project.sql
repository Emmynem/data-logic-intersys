-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2022 at 08:22 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chuks_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `user_uuid` varchar(10) NOT NULL,
  `edit_user_uuid` varchar(10) NOT NULL,
  `uuid` varchar(10) NOT NULL,
  `category` varchar(150) NOT NULL,
  `stripped` varchar(150) NOT NULL,
  `views` bigint(20) NOT NULL,
  `added_date` datetime NOT NULL,
  `last_modified` datetime NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `user_uuid`, `edit_user_uuid`, `uuid`, `category`, `stripped`, `views`, `added_date`, `last_modified`, `status`) VALUES
(1, 'Manual-DEV', 'Manual-DEV', 'c845a60af2', 'CNCF Diamond Division Grading Exercise 2022', 'cncf-diamond-division-grading-exercise-2022', 275, '2022-05-30 20:41:56', '2022-06-12 14:42:00', 1),
(2, 'Manual-DEV', 'Manual-DEV', 'c6ea765a99', 'Daily Dose', 'daily-dose', 1899, '2022-05-31 23:23:13', '2022-06-12 14:41:53', 1);

-- --------------------------------------------------------

--
-- Table structure for table `checkers`
--

CREATE TABLE `checkers` (
  `id` int(11) NOT NULL,
  `user_uuid` varchar(10) NOT NULL,
  `edit_user_uuid` varchar(10) NOT NULL,
  `user_role` int(2) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(150) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `password` varchar(128) NOT NULL,
  `added_date` datetime NOT NULL,
  `last_modified` datetime NOT NULL,
  `access` int(2) NOT NULL,
  `status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `checkers`
--

INSERT INTO `checkers` (`id`, `user_uuid`, `edit_user_uuid`, `user_role`, `username`, `email`, `fullname`, `gender`, `phone_number`, `password`, `added_date`, `last_modified`, `access`, `status`) VALUES
(1, 'Manual-DEV', 'Manual-DEV', 1, 'deltorox', 'emmanuelnwoye5@gmail.com', 'Emmanuel Nwoye', 'Male', '+2348093223317', '$2y$12$ZxDCVrOE47Ukjha6fpgGTew1wJp0Qs.s6T6zn2t5w8UObNuLvhZLq', '2021-06-06 14:46:21', '2021-06-06 14:46:21', 1, 1),
(2, 'C918EC5F5C', 'Manual-DEV', 4, 'lamberty', 'davidlambert@yahoo.com', 'David Lambert', 'Male', '+234824892482', '$2y$12$v7wOQl5vmGOmSPUWWEhXv.wfkfc/Ni9Yf2cr9k4MV9hT0fi00KLci', '2022-05-26 18:49:13', '2022-05-26 21:13:43', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` bigint(20) NOT NULL,
  `uuid` varchar(10) NOT NULL,
  `category` varchar(10) NOT NULL,
  `person` varchar(10) DEFAULT NULL,
  `type` varchar(20) NOT NULL,
  `auth_type` varchar(20) NOT NULL,
  `added_date` datetime NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `uuid`, `category`, `person`, `type`, `auth_type`, `added_date`, `status`) VALUES
(2, 'h7e05bab99', 'c845a60af2', 'cea188308a', 'Personal', 'Authenticated', '2022-06-08 01:41:17', 1),
(3, 'h6353e7028', 'c845a60af2', 'ce71d0aa5e', 'Personal', 'Authenticated', '2022-06-08 02:17:04', 1),
(4, 'hcde7e7e7d', 'c845a60af2', 'c5e06f73ed', 'Personal', 'Authenticated', '2022-06-08 02:17:18', 1),
(5, 'h8d44fed2e', 'c845a60af2', 'c03d83643c', 'Personal', 'Authenticated', '2022-06-08 02:17:32', 1),
(6, 'h4ee711122', 'c845a60af2', 'c24bead1bc', 'Personal', 'Authenticated', '2022-06-08 02:18:09', 1),
(7, 'h953896eac', 'c845a60af2', 'c3d79a5b36', 'Personal', 'Authenticated', '2022-06-08 02:18:26', 1),
(8, 'h4a65fb120', 'c845a60af2', 'cbac53ec34', 'Personal', 'Authenticated', '2022-06-08 02:19:11', 1),
(9, 'hcb09ce69f', 'c845a60af2', 'c45d3d533e', 'Personal', 'Authenticated', '2022-06-08 02:19:40', 1),
(10, 'h20ee9d5b7', 'c845a60af2', 'ca09fdab11', 'Personal', 'Authenticated', '2022-06-08 02:19:58', 1),
(11, 'h789a02a16', 'c845a60af2', NULL, 'General', 'Unauthenticated', '2022-06-08 02:21:05', 1),
(12, 'h78b0a335e', 'c845a60af2', 'cea188308a', 'Personal', 'Authenticated', '2022-06-09 14:33:37', 1),
(13, 'h0fcdece5b', 'c845a60af2', 'cea188308a', 'Personal', 'Unauthenticated', '2022-06-09 14:35:02', 1),
(14, 'h2261aace2', 'c845a60af2', 'cea188308a', 'Personal', 'Authenticated', '2022-06-09 14:35:50', 1),
(15, 'hab40b9519', 'c845a60af2', 'cea188308a', 'Personal', 'Unauthenticated', '2022-06-09 14:36:04', 1),
(16, 'h2e78646a4', 'c845a60af2', 'cea188308a', 'Personal', 'Authenticated', '2022-06-09 14:36:15', 1),
(17, 'heecc0f2bb', 'c845a60af2', 'ca09fdab11', 'Personal', 'Authenticated', '2022-06-10 19:57:08', 1),
(18, 'h71713f795', 'c845a60af2', 'ca09fdab11', 'Personal', 'Unauthenticated', '2022-06-10 19:57:18', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL,
  `user_uuid` varchar(10) NOT NULL,
  `uuid` varchar(10) NOT NULL,
  `type` varchar(20) NOT NULL,
  `action` varchar(200) NOT NULL,
  `added_date` datetime NOT NULL,
  `status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_uuid`, `uuid`, `type`, `action`, `added_date`, `status`) VALUES
(1, 'Manual-DEV', 'N70794BAC0', 'Login Activity', 'User logged in successfully.', '2022-05-26 03:39:44', 1),
(2, 'Manual-DEV', 'N05F4DCC34', 'Login Activity', 'User logged in successfully.', '2022-05-26 03:42:43', 1),
(3, 'Manual-DEV', 'N29330AA0A', 'Login Activity', 'User logged in successfully.', '2022-05-26 03:54:17', 1),
(4, 'Manual-DEV', 'N542CED01A', 'Edit Activity', 'Office user details edited', '2022-05-26 03:56:38', 1),
(5, 'Manual-DEV', 'N5877BF2CE', 'Edit Activity', 'Office user details edited', '2022-05-26 03:56:55', 1),
(6, 'Manual-DEV', 'N9B16CAF79', 'Edit Activity', 'Office user details edited', '2022-05-26 03:57:08', 1),
(7, 'Manual-DEV', 'NB91B4FF62', 'Edit Activity', 'Office user details edited', '2022-05-26 17:32:22', 1),
(8, 'Manual-DEV', 'N740BFEFDA', 'Edit Activity', 'Office user details edited', '2022-05-26 17:33:03', 1),
(9, 'Manual-DEV', 'NF5D698924', 'Edit Activity', 'Office user details edited', '2022-05-26 17:33:17', 1),
(10, 'Manual-DEV', 'NEFD5FC4DE', 'Edit Activity', 'Office user details edited', '2022-05-26 17:33:32', 1),
(11, 'Manual-DEV', 'NDF60DD729', 'Edit Activity', 'Office user details edited', '2022-05-26 17:33:49', 1),
(12, 'Manual-DEV', 'NB495D1D2E', 'Edit Activity', 'Office user details edited', '2022-05-26 17:36:40', 1),
(13, 'Manual-DEV', 'N9ED2767EB', 'Edit Activity', 'Office user details edited', '2022-05-26 17:36:57', 1),
(14, 'Manual-DEV', 'NFA97C8932', 'Add Activity', 'Office user added', '2022-05-26 17:47:45', 1),
(15, 'Manual-DEV', 'N96C348478', 'Logout Activity', 'User logged out successfully.', '2022-05-26 18:00:53', 1),
(16, 'UB50CE669B', 'NEEA0F6307', 'Login Activity', 'User logged in successfully.', '2022-05-26 18:01:17', 1),
(17, 'UB50CE669B', 'N6FEFEB92E', 'Logout Activity', 'User logged out successfully.', '2022-05-26 18:02:45', 1),
(18, 'U07292B9EA', 'NA23850903', 'Login Activity', 'User logged in successfully.', '2022-05-26 18:03:20', 1),
(19, 'U07292B9EA', 'N4C6993131', 'Logout Activity', 'User logged out successfully.', '2022-05-26 18:04:32', 1),
(20, 'Manual-DEV', 'NCF542EEE0', 'Login Activity', 'User logged in successfully.', '2022-05-26 18:04:43', 1),
(21, 'Manual-DEV', 'N1A611E0CE', 'Add Activity', 'Data Checker added', '2022-05-26 18:49:13', 1),
(22, 'Manual-DEV', 'NF500B0E85', 'Edit Activity', 'Data Checker details edited', '2022-05-26 21:09:28', 1),
(23, 'Manual-DEV', 'N3C560E2B3', 'Edit Activity', 'Data Checker details edited', '2022-05-26 21:09:42', 1),
(24, 'Manual-DEV', 'NB1B498DEE', 'Edit Activity', 'Data Checker details edited', '2022-05-26 21:09:56', 1),
(25, 'Manual-DEV', 'N4C9F72176', 'Edit Activity', 'Data Checker details edited', '2022-05-26 21:13:43', 1),
(26, 'Manual-DEV', 'N41DC9DEC8', 'Add Activity', 'Category created', '2022-05-30 20:41:56', 1),
(27, 'Manual-DEV', 'NDDE9E05BD', 'Edit Activity', 'Category edited', '2022-05-30 20:43:37', 1),
(28, 'Manual-DEV', 'N8935FA449', 'Delete Activity', 'Product Deleted', '2022-05-31 23:03:18', 1),
(29, 'Manual-DEV', 'N96B08D1F9', 'Delete Activity', 'Sign up with serial 001, code BCS/CNCF/NG-RS/001 was deleted from CNCF Diamond Division Grading Exercise 2022 category.', '2022-05-31 23:04:48', 1),
(30, 'Manual-DEV', 'N20FDA02F5', 'Add Activity', 'Category created', '2022-05-31 23:23:13', 1),
(31, 'Manual-DEV', 'ND011B08E0', 'Logout Activity', 'User logged out successfully.', '2022-06-02 16:21:47', 1),
(32, 'Manual-DEV', 'NF6E58F943', 'Login Activity', 'User logged in successfully.', '2022-06-02 16:22:23', 1),
(33, 'Manual-DEV', 'N3E773B345', 'Logout Activity', 'User logged out successfully.', '2022-06-02 16:24:00', 1),
(34, 'Manual-DEV', 'N7FDE847E9', 'Login Activity', 'User logged in successfully.', '2022-06-02 16:25:06', 1),
(35, 'Manual-DEV', 'N5409C3055', 'Delete Activity', 'Product Deleted', '2022-06-02 17:06:36', 1),
(36, 'Manual-DEV', 'N0B716F5A6', 'Edit Activity', 'User authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-02 19:20:42', 1),
(37, 'Manual-DEV', 'N0F4C6F791', 'Edit Activity', 'User authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-02 19:37:21', 1),
(38, 'Manual-DEV', 'NCF8784342', 'Edit Activity', 'User (005) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-02 19:40:26', 1),
(39, 'Manual-DEV', 'N5576C4EFE', 'Edit Activity', 'User (006) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-02 19:41:25', 1),
(40, 'Manual-DEV', 'N06A633A6F', 'Edit Activity', 'User (001) authenticated for Daily Dose', '2022-06-02 19:41:49', 1),
(41, 'Manual-DEV', 'N657747962', 'Logout Activity', 'User logged out successfully.', '2022-06-04 14:48:52', 1),
(42, 'Manual-DEV', 'NCAEAA7F16', 'Login Activity', 'User logged in successfully.', '2022-06-04 14:49:19', 1),
(43, 'Manual-DEV', 'N70D6ABF49', 'Logout Activity', 'User logged out successfully.', '2022-06-04 15:00:52', 1),
(44, 'Manual-DEV', 'N93D3873A7', 'Login Activity', 'User logged in successfully.', '2022-06-04 15:04:37', 1),
(45, 'Manual-DEV', 'N9D6D31F9D', 'Edit Activity', 'User (0013) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-04 15:04:58', 1),
(46, 'Manual-DEV', 'N8AD04BB3C', 'Logout Activity', 'User logged out successfully.', '2022-06-05 01:07:06', 1),
(47, 'UB50CE669B', 'N6DCAEEFCC', 'Login Activity', 'User logged in successfully.', '2022-06-05 01:07:20', 1),
(48, 'UB50CE669B', 'NB5B1AB24F', 'Logout Activity', 'User logged out successfully.', '2022-06-05 01:11:02', 1),
(49, 'C918EC5F5C', 'NE478B1A88', 'Login Activity', 'User logged in successfully.', '2022-06-05 01:11:20', 1),
(50, 'C918EC5F5C', 'NE9F5CD405', 'Logout Activity', 'User logged out successfully.', '2022-06-05 01:15:31', 1),
(51, 'UB50CE669B', 'NDDCA64CF6', 'Login Activity', 'User logged in successfully.', '2022-06-05 01:15:45', 1),
(52, 'UB50CE669B', 'N174D98E41', 'Logout Activity', 'User logged out successfully.', '2022-06-05 01:18:34', 1),
(53, 'Manual-DEV', 'N27B73333C', 'Login Activity', 'User logged in successfully.', '2022-06-05 01:19:24', 1),
(54, 'Manual-DEV', 'N5E2520249', 'Edit Activity', 'Office user details edited', '2022-06-05 01:20:24', 1),
(55, 'Manual-DEV', 'N0F8A6D00A', 'Logout Activity', 'User logged out successfully.', '2022-06-05 01:20:39', 1),
(56, 'UB50CE669B', 'N9B0F7FA25', 'Login Activity', 'User logged in successfully.', '2022-06-05 01:20:52', 1),
(57, 'UB50CE669B', 'N940654645', 'Edit Activity', 'User (007) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-05 01:23:39', 1),
(58, 'UB50CE669B', 'N023B7DD4F', 'Logout Activity', 'User logged out successfully.', '2022-06-05 01:28:51', 1),
(59, 'Manual-DEV', 'N6AE0C3DC3', 'Login Activity', 'User logged in successfully.', '2022-06-05 01:29:02', 1),
(60, 'Manual-DEV', 'N011C94DE7', 'Edit Activity', 'People unauthenticated in a category', '2022-06-05 13:36:52', 1),
(61, 'Manual-DEV', 'N981247147', 'Edit Activity', 'People unauthenticated in a category', '2022-06-05 13:37:53', 1),
(62, 'Manual-DEV', 'N1F788C16B', 'Edit Activity', 'People unauthenticated in a category', '2022-06-05 13:38:14', 1),
(63, 'Manual-DEV', 'N811A1598C', 'Edit Activity', 'User (009) authenticated for c845a60af2', '2022-06-08 01:38:50', 1),
(64, 'Manual-DEV', 'N699E9CC9E', 'Edit Activity', 'User (009) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-08 01:41:17', 1),
(65, 'Manual-DEV', 'N4F6791327', 'Edit Activity', 'User (001) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-08 02:17:04', 1),
(66, 'Manual-DEV', 'NA8411CFA4', 'Edit Activity', 'User (002) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-08 02:17:18', 1),
(67, 'Manual-DEV', 'NC7AAAA5D1', 'Edit Activity', 'User (003) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-08 02:17:32', 1),
(68, 'Manual-DEV', 'NBDE627310', 'Edit Activity', 'User (004) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-08 02:18:09', 1),
(69, 'Manual-DEV', 'N9000877A1', 'Edit Activity', 'User (005) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-08 02:18:26', 1),
(70, 'Manual-DEV', 'NB67AF2F05', 'Edit Activity', 'User (006) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-08 02:19:11', 1),
(71, 'Manual-DEV', 'N4C72D7E94', 'Edit Activity', 'User (007) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-08 02:19:40', 1),
(72, 'Manual-DEV', 'N7C2494DAD', 'Edit Activity', 'User (0010) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-08 02:19:58', 1),
(73, 'Manual-DEV', 'N959229DEF', 'Edit Activity', 'People unauthenticated in a category', '2022-06-08 02:21:05', 1),
(74, 'Manual-DEV', 'N95D48A377', 'Edit Activity', 'User (009) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-09 14:33:38', 1),
(75, 'Manual-DEV', 'N283E21750', 'Edit Activity', 'User (009) unauthenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-09 14:35:02', 1),
(76, 'Manual-DEV', 'NB037108AF', 'Edit Activity', 'User (009) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-09 14:35:50', 1),
(77, 'Manual-DEV', 'N894EDF54B', 'Edit Activity', 'User (009) unauthenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-09 14:36:04', 1),
(78, 'Manual-DEV', 'N6BE99384F', 'Edit Activity', 'User (009) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-09 14:36:15', 1),
(79, 'Manual-DEV', 'N28072B9E2', 'Edit Activity', 'User (0010) authenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-10 19:57:08', 1),
(80, 'Manual-DEV', 'N5CB550672', 'Edit Activity', 'User (0010) unauthenticated for CNCF Diamond Division Grading Exercise 2022', '2022-06-10 19:57:18', 1);

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` bigint(20) NOT NULL,
  `uuid` varchar(10) NOT NULL,
  `category` varchar(10) NOT NULL,
  `serial_number` varchar(10) NOT NULL,
  `code` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `part` varchar(20) NOT NULL,
  `choir` varchar(50) NOT NULL,
  `zone` varchar(50) NOT NULL,
  `area` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `nation` varchar(50) NOT NULL,
  `image` varchar(300) DEFAULT NULL,
  `file` varchar(30) DEFAULT NULL,
  `file_size` bigint(20) DEFAULT NULL,
  `authenticated` tinyint(1) NOT NULL,
  `added_date` datetime NOT NULL,
  `last_modified` datetime NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `uuid`, `category`, `serial_number`, `code`, `firstname`, `middlename`, `lastname`, `email`, `phone_number`, `gender`, `part`, `choir`, `zone`, `area`, `state`, `nation`, `image`, `file`, `file_size`, `authenticated`, `added_date`, `last_modified`, `status`) VALUES
(2, 'ce71d0aa5e', 'c845a60af2', '001', 'BCS/CNCF/NG-RS/001', 'Emmanuel', 'Aneku', 'Nwoye', 'emmanuelnswoye5@gmail.com', '+2348003223317', 'Male', 'Tenor', 'Mother Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', NULL, NULL, NULL, 0, '2022-05-31 23:05:39', '2022-06-08 02:21:05', 1),
(3, 'c5e06f73ed', 'c845a60af2', '002', 'BCS/CNCF/NG-RS/002', 'John', '', 'Doe', 'johndoe@gmail.com', '08138848294', 'Male', 'Bass', '51 Ngo Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', NULL, NULL, NULL, 0, '2022-05-31 23:06:28', '2022-06-08 02:21:05', 1),
(4, 'c03d83643c', 'c845a60af2', '003', 'BCS/CNCF/NG-RS/003', 'David', NULL, 'Lambert', 'davidlambert@yahoo.com', '+124824892482', 'Male', 'Tenor', 'Agip Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', NULL, NULL, NULL, 0, '2022-05-31 23:07:26', '2022-06-08 02:21:05', 1),
(5, 'c24bead1bc', 'c845a60af2', '004', 'BCS/CNCF/NG-RS/004', 'Deamon', NULL, 'Toro', 'deamontoro@gmail.com', '08123698316', 'Male', 'Bass', 'Family Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', NULL, NULL, NULL, 0, '2022-05-31 23:08:22', '2022-06-08 02:21:05', 1),
(6, 'c3d79a5b36', 'c845a60af2', '005', 'BCS/CNCF/NG-RS/005', 'Deltoro', NULL, 'Xsa', 'aswaggnigga@yahoo.com', '08027540047', 'Male', 'Tenor', '51 Ngo Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', NULL, NULL, NULL, 0, '2022-05-31 23:09:03', '2022-06-08 02:21:05', 1),
(7, 'cbac53ec34', 'c845a60af2', '006', 'BCS/CNCF/NG-RS/006', 'Jane', 'Anna', 'Doe', 'janedoe@gmail.com', '09077348348', 'Male', 'Alto', '51 Ngo Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', NULL, NULL, NULL, 0, '2022-05-31 23:10:00', '2022-06-08 02:21:05', 1),
(8, 'cb30a4c733', 'c6ea765a99', '001', 'BCS/CNCF/NG-RS/001', 'Emmanuel', NULL, 'Nwoye', 'emmanuelnwoye5@gmail.com', '+2348093223317', 'Male', 'Tenor', '51 Ngo Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', NULL, NULL, NULL, 0, '2022-05-31 23:24:16', '2022-06-05 13:38:14', 1),
(9, 'c45d3d533e', 'c845a60af2', '007', 'BCS/CNCF/NG-RS/007', 'Emmanuel', 'Aneku', 'Nwoye', 'emmanuelnswoye5@gmail.com', '+2348093323317', 'Male', 'Tenor', '51 Ngo Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', NULL, NULL, NULL, 0, '2022-06-02 15:13:16', '2022-06-08 02:21:05', 1),
(10, 'ce3cdb58b0', 'c845a60af2', '008', 'BCS/CNCF/NG-RS/008', 'Emmanuel', 'Aneku', 'Nwoye', 'emmawnuelnwoye5@gmail.com', '+2348093293317', 'Male', 'Tenor', '51 Ngo Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', 'signup_images/1654179459.webp', '1654179459.webp', 140733, 0, '2022-06-02 15:17:40', '2022-06-08 02:21:05', 1),
(11, 'cea188308a', 'c845a60af2', '009', 'BCS/CNCF/NG-RS/009', 'Emmanuel', 'Aneku', 'Nwoye', 'emmansuelnwoye5@gmail.com', '+2348093423317', 'Male', 'Bass', '51 Ngo Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', 'signup_images/1654179641.webp', '1654179641.webp', 1030708, 1, '2022-06-02 15:20:43', '2022-06-09 14:36:15', 1),
(12, 'ca09fdab11', 'c845a60af2', '0010', 'BCS/CNCF/NG-RS/0010', 'Emmanuel', NULL, 'Nwoye', 'emmanuselnwoye5@gmail.com', '+2348093923317', 'Male', 'Tenor', '51 Ngo Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', 'signup_images/1654198177.webp', '1654198177.webp', 436349, 0, '2022-06-02 20:29:37', '2022-06-10 19:57:18', 1),
(13, 'c13ed209fe', 'c845a60af2', '0011', 'BCS/CNCF/NG-RS/0011', 'Emmanuel', NULL, 'Nwoye', 'emmakuelnwoye5@gmail.com', '+2348093243317', 'Male', 'Tenor', '51 Ngo Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', 'signup_images/1654198333.webp', '1654198333.webp', 8913902, 0, '2022-06-02 20:32:15', '2022-06-08 02:21:05', 1),
(14, 'c6dde5b8a3', 'c845a60af2', '0012', 'BCS/CNCF/NG-RS/0012', 'Emmanuel', NULL, 'Nwoye', 'emmanuelnwoye5@gmail.com', '+2348093223317', 'Male', 'Tenor', '51 Ngo Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', 'signup_images/1654198650.webp', '1654198650.webp', 452405, 0, '2022-06-02 20:37:31', '2022-06-08 02:21:05', 1),
(15, 'cceeca0b5a', 'c845a60af2', '0013', 'BCS/CNCF/NG-RS/0013', 'Deamon', NULL, 'Toro', 'deamnontoro@gmail.com', '08173698316', 'Male', 'Tenor', '51 Ngo Bethel Choir', 'Diobu Zone', 'Port Harcourt Area 1', 'Rivers', 'AKRIBAY', 'signup_images/1654351061.webp', '1654351061.webp', 1030708, 0, '2022-06-04 14:57:42', '2022-06-08 02:21:05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_uuid` varchar(10) NOT NULL,
  `edit_user_uuid` varchar(10) NOT NULL,
  `user_role` int(2) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(150) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `password` varchar(128) NOT NULL,
  `added_date` datetime NOT NULL,
  `last_modified` datetime NOT NULL,
  `access` int(2) NOT NULL,
  `status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_uuid`, `edit_user_uuid`, `user_role`, `username`, `email`, `fullname`, `gender`, `phone_number`, `password`, `added_date`, `last_modified`, `access`, `status`) VALUES
(1, 'Manual-DEV', 'Manual-DEV', 1, 'deltorox', 'noneofyourbusiness@myass.com', 'Your Administrator', 'Male', '0X0XXXXXXXX', '$2y$12$ZxDCVrOE47Ukjha6fpgGTew1wJp0Qs.s6T6zn2t5w8UObNuLvhZLq', '2020-12-14 19:43:16', '2020-12-16 00:11:17', 1, 1),
(2, 'UB4FA2D7E2', 'Manual-DEV', 2, 'jayme', 'hbwmagazine365@gmail.com', 'Jayme Hoyte', 'Female', '+2340183745792', '$2y$12$qUkfWnqAduIY1OUVtxGvpeCHuGjnRJ8sLaV3NXUEUce4gncD7KeC6', '2020-12-16 20:44:21', '2021-03-16 01:53:49', 1, 1),
(3, 'U7F3B0DFAE', 'Manual-DEV', 3, 'rebellion1', 'reddingtonbellion@gmail.com', 'Bellion Reddington', 'Male', '+2349038599483', '$2y$12$b73ce398c39f506af761duBWSA6jsyaMDuTjrrg.HnvfWyv5ER66i', '2020-12-16 22:04:13', '2022-05-26 03:57:08', 1, 1),
(4, 'U07292B9EA', 'Manual-DEV', 5, 'taylorpark', 'taylorpark@gmail.com', 'Taylor Parkins', 'Female', '+2347084853284', '$2y$12$zY.xmFrM5Hj.RmLdNtERI.14BIkb39EcStUid/5EBbuaVpX3ZP1pG', '2020-12-16 23:46:44', '2022-05-26 17:36:57', 1, 1),
(5, 'U73D997F31', 'Manual-DEV', 2, 'johnny', 'johndoe@gmail.com', 'John Doe', 'Male', '08138848294', '$2y$12$p0nw/WZOfvQeWsIy/WljM.J9HgR5ncjEkQ0oYS3QdwSZ3CABqN9Yq', '2022-05-26 04:05:14', '2022-05-26 04:05:14', 1, 1),
(7, 'UB50CE669B', 'Manual-DEV', 4, 'lambert', 'davidlambert@yahoo.com', 'David Lambert', 'Male', '+124824892482', '$2y$12$sNy0ePNLk9OZfsGZktKSxOSteOwbEQkZlHZFaHPFMACC95s2X8f6W', '2022-05-26 17:47:45', '2022-06-05 01:20:24', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `checkers`
--
ALTER TABLE `checkers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_uuid` (`user_uuid`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `historyPersonUuid` (`person`),
  ADD KEY `historyCategoryUuid` (`category`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `categoryUuid` (`category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_uuid` (`user_uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `checkers`
--
ALTER TABLE `checkers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `historyCategoryUuid` FOREIGN KEY (`category`) REFERENCES `categories` (`uuid`),
  ADD CONSTRAINT `historyPersonUuid` FOREIGN KEY (`person`) REFERENCES `people` (`uuid`);

--
-- Constraints for table `people`
--
ALTER TABLE `people`
  ADD CONSTRAINT `categoryUuid` FOREIGN KEY (`category`) REFERENCES `categories` (`uuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
