-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: legalyes
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chatmessages`
--

DROP TABLE IF EXISTS `chatmessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatmessages` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `documentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role` enum('user','ai') NOT NULL,
  `content` longtext NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `documentId` (`documentId`),
  KEY `userId` (`userId`),
  CONSTRAINT `chatmessages_ibfk_1` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_10` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_11` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_12` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_13` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_14` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_15` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_16` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_17` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_18` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_19` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_20` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_21` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_22` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_23` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_24` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_25` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_26` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_27` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_28` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_29` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_3` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_30` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_5` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_6` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_7` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmessages_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `chatmessages_ibfk_9` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatmessages`
--

LOCK TABLES `chatmessages` WRITE;
/*!40000 ALTER TABLE `chatmessages` DISABLE KEYS */;
INSERT INTO `chatmessages` VALUES ('44f1ba9c-a161-4b20-9f13-fab226a249a3','0409222e-28e5-4758-ab38-50d967d50565','2c6c1f3c-98af-4695-9fc9-db714c015556','user','What is this document about?','2026-02-01 16:46:13','2026-02-01 16:46:13'),('c21a801a-e4c3-4a84-9fc9-cd206d28e446','0409222e-28e5-4758-ab38-50d967d50565','2c6c1f3c-98af-4695-9fc9-db714c015556','ai','This document is about an agreement between an independent contractor and a service provider (referred to as \"the Company\"). It outlines the terms and conditions of the independent contractor\'s engagement with the Company, including their duties, compensation, confidentiality, and termination. The document is a draft agreement that can be customized to fit the specific needs of the parties involved.','2026-02-01 16:46:13','2026-02-01 16:46:13');
/*!40000 ALTER TABLE `chatmessages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-02 23:05:41
