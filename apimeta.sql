-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: cmsdb_test
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_meta`
--

DROP TABLE IF EXISTS `api_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_meta` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `api_meta_param` varchar(250) DEFAULT NULL,
  `api_meta_section` int(1) DEFAULT '1',
  `api_meta_maxpt` int(11) DEFAULT NULL,
  `api_meta_perpt` int(11) DEFAULT NULL,
  `api_meta_ayid` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_meta`
--

LOCK TABLES `api_meta` WRITE;
/*!40000 ALTER TABLE `api_meta` DISABLE KEYS */;
INSERT INTO `api_meta` VALUES (1,'Number of additional experiments performed through Virtual Labs (http://www.vlab.co.in/)(5 point per experiment)',1,10,5,1),(2,'Number of  teaching aids (Charts & Models etc.) developed.(5 point per aid)',1,10,5,1),(3,'Number of webinars (live/recorded) arranged for students.(10 points per webinar)',1,20,10,1),(4,'Ph.D. thesis guided as Main Guide. Notification declared by University.',1,20,20,1),(5,'Ph.D. thesis guided as Co-guide. Notification declared by University.',1,10,10,1),(6,'Interaction with industries for visit/getting industry defined project / expert lecture.(5 points per activity)',2,10,5,1),(7,'Interaction with industries for Campus interviews/students internship.(10 points per activity)',2,20,10,1),(8,'Patent application filed for the Project/Product developed',2,20,20,1),(9,'Students educational tour accompanied',2,10,10,1),(10,'Participation in STEM promotion programs(10 points per program)',2,20,10,1),(11,'Organization/ Coordination of sports /Cultural activity for students/ other activity of Institute level (10 point per activity)',3,20,10,1),(12,'Conducting Club Activities/ Skill Development Program   (10 point per activity)',3,20,10,1),(13,'Participation in Extension Work / Community Service.(10 points per activity)',3,20,10,1),(14,'Publication of articles in college magazine(5 points per article)',3,10,5,1),(15,'Coordination of  FDP (STTP/Seminar/Workshop) at the institute',4,20,20,1),(16,'Online courses completed with certificate (SWAYAM, Coursera, NPTEL etc.) (20 per course)',4,40,20,1),(17,'Number  of Pedagogy lectures delivered(5 points per lecture)',4,10,5,1),(18,'Number  of papers published in UGC approved national journals (Impact Factor more than 1)(10 points per paper)',4,20,10,1),(19,'Number of papers published in UGC approved International journals  (Impact Factor more than 1)(20 points per paper)',4,40,20,1),(20,'Expert lectures delivered at other institutes / professional forums(10 points per lecture)',4,20,10,1),(21,'Prize/Award won (Academic) (State level)',4,10,10,1),(22,'Prize/Award won (Academic) (National level)',4,20,20,1),(23,'Book published (single author) with ISBN',4,30,30,1),(24,'Book co-authored with ISBN',4,20,20,1),(25,'Participation in any activity of recognized  national level professional body of your discipline or attending ISTE National Convention',4,20,20,1),(26,'Publication of articles in newspaper, magazine, radio talks, participation in television program (Academic) etc.(10 point per activity)',4,20,10,1),(27,'STTP attended (Min 5 days)',4,20,20,1),(28,'Number  of seminar/ conference/ workshop attended (10 points per program)',4,20,10,1),(29,'Refereed UGC recognized technical journal',4,20,20,1),(30,'Consultancy services provided to industry as a member of  team',4,20,20,1),(31,'Sponsored Project completed as Chief Coordinator (sponsored by GTU/UGC/DST/ AICTE/GUJCOST)',4,20,20,1),(32,'Team member of Sponsored Project completed  (sponsored by GTU/UGC/DST/ AICTE/GUJCOST)',4,10,10,1);
/*!40000 ALTER TABLE `api_meta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-20 11:45:37
