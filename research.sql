-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 30, 2024 at 04:19 PM
-- Server version: 8.0.31
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `research`
--

-- --------------------------------------------------------

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
CREATE TABLE IF NOT EXISTS `badges` (
  `badge_id` int NOT NULL AUTO_INCREMENT,
  `badge_name` varchar(50) NOT NULL,
  `description` text,
  PRIMARY KEY (`badge_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `connections`
--

DROP TABLE IF EXISTS `connections`;
CREATE TABLE IF NOT EXISTS `connections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `mentor_id` int DEFAULT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `mentor_id` (`mentor_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `connections`
--

INSERT INTO `connections` (`id`, `student_id`, `mentor_id`, `status`) VALUES
(1, 9, 1, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
CREATE TABLE IF NOT EXISTS `documents` (
  `document_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `author_id` int DEFAULT NULL,
  `upload_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`document_id`),
  KEY `author_id` (`author_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE IF NOT EXISTS `feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `module_id` int DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `comments` text,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedback_id`),
  KEY `user_id` (`user_id`),
  KEY `module_id` (`module_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gamification`
--

DROP TABLE IF EXISTS `gamification`;
CREATE TABLE IF NOT EXISTS `gamification` (
  `gamification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `module_id` int DEFAULT NULL,
  `achievement_details` text,
  `reward_points` int DEFAULT NULL,
  `earned_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gamification_id`),
  KEY `user_id` (`user_id`),
  KEY `module_id` (`module_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
CREATE TABLE IF NOT EXISTS `lessons` (
  `lesson_id` int NOT NULL AUTO_INCREMENT,
  `module_id` int DEFAULT NULL,
  `lesson_content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`lesson_id`),
  KEY `module_id` (`module_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mentors`
--

DROP TABLE IF EXISTS `mentors`;
CREATE TABLE IF NOT EXISTS `mentors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `specialization` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mentorships`
--

DROP TABLE IF EXISTS `mentorships`;
CREATE TABLE IF NOT EXISTS `mentorships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mentor_id` varchar(255) NOT NULL,
  `research_area` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mentor_id` (`mentor_id`(250))
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mentorships`
--

INSERT INTO `mentorships` (`id`, `mentor_id`, `research_area`) VALUES
(1, '1', 'Machine Learning'),
(2, '1', 'AI Ethics'),
(3, '2', 'Molecular Biology'),
(4, '2', 'Genetics'),
(5, '3', 'Psychology'),
(6, '3', 'Cognitive Science');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `content` text,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
CREATE TABLE IF NOT EXISTS `modules` (
  `module_id` int NOT NULL AUTO_INCREMENT,
  `module_name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`module_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`module_id`, `module_name`, `description`) VALUES
(1, 'Research Paradigms', 'An overview of different research paradigms used in scientific studies, including positivism, interpretivism, and critical theory.'),
(2, 'Research Types', 'A breakdown of various research types, such as qualitative, quantitative, and mixed-methods approaches.'),
(3, 'Methodologies', 'An in-depth look into research methodologies, including experimental, correlational, and descriptive methods.'),
(4, 'Data Collection Methods', 'Explanation of data collection techniques, such as surveys, interviews, and observations.'),
(5, 'Data Analysis', 'An introduction to different data analysis methods, including statistical analysis and thematic analysis.'),
(6, 'Literature Review', 'Guidelines on conducting a literature review, including searching for and analyzing relevant research papers.'),
(7, 'Ethical Considerations', 'Overview of ethical principles in research, such as consent, confidentiality, and integrity.'),
(8, 'Research Design', 'Details on designing a research study, including choosing a framework and defining variables.'),
(9, 'Sampling Methods', 'Different sampling techniques such as random sampling, stratified sampling, and convenience sampling.'),
(10, 'Report Writing', 'Guidelines on how to write a comprehensive research report, including structure and content.');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `enrollment_date` date DEFAULT NULL,
  `academic_level` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('student','mentor') NOT NULL,
  `research_interest` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `role`, `research_interest`) VALUES
(1, 'georgejere60@gmail.com', '123', 'George Jere', 'student', 'Machine Learning'),
(2, 'georgejere60@gmail.com', '456', 'George Jere', 'student', 'Data Science'),
(3, 'hendersonrassuli60@gmail.com', '456', 'Henderson Rassuli', 'student', 'Neuroscience'),
(4, 'hendersonrassuli60@gmail.com', '890', 'Henderson Rassuli', 'student', 'Neuroscience'),
(5, 'hendersonrassuli60@gmail.com', '456', 'jere', 'student', 'Machine Learning'),
(6, 'hendersonrassuli60@gmail.com', '456', 'jere', 'student', 'Machine Learning'),
(7, 'james60@gmail.com', '456', 'james', 'student', 'Cybersecurity'),
(8, 'hendersonrassuli60@gmail.com', '456', 'him', 'student', 'Climate Change'),
(9, 'jere60@gmail.com', '999', 'Jere george', 'student', 'Machine Learning'),
(10, 'jere60@gmail.com', '999', 'Jere george', 'student', 'Renewable Energy');

-- --------------------------------------------------------

--
-- Table structure for table `user_badges`
--

DROP TABLE IF EXISTS `user_badges`;
CREATE TABLE IF NOT EXISTS `user_badges` (
  `user_id` int NOT NULL,
  `badge_id` int NOT NULL,
  `awarded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`badge_id`),
  KEY `badge_id` (`badge_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_module_progress`
--

DROP TABLE IF EXISTS `user_module_progress`;
CREATE TABLE IF NOT EXISTS `user_module_progress` (
  `progress_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `module_id` int NOT NULL,
  `status` enum('available','in-progress','completed') DEFAULT 'available',
  `progress` int DEFAULT '0',
  `last_accessed` timestamp NULL DEFAULT NULL,
  `completed_sections` int DEFAULT '0',
  PRIMARY KEY (`progress_id`),
  KEY `user_id` (`user_id`),
  KEY `module_id` (`module_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
