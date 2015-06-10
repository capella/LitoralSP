-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jun 10, 2015 at 06:26 PM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `capeocom_litoral`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertPraia`(IN `praia_in` VARCHAR(100) CHARSET utf8, IN `municipio_in` VARCHAR(100) CHARSET utf8, IN `local_in` VARCHAR(500) CHARSET utf8, IN `status_in` INT(2), OUT `ok` INT(2))
    SQL SECURITY INVOKER
BEGIN
	DECLARE municipio_id INT(10);
	DECLARE praia_id INT(10);

	-- Olha se o municipio exitse
	SELECT id INTO municipio_id FROM municipios WHERE name = municipio_in LIMIT 1;
	IF (municipio_id IS NULL) THEN
	INSERT INTO municipios (name) VALUES (municipio_in);
		SET municipio_id = (select last_insert_id());
	END IF;
	
	-- Olha se a praia exitse
	SELECT id INTO praia_id FROM praias WHERE name = praia_in AND municipioid = municipio_id LIMIT 1;
	IF (praia_id IS NULL) THEN
	INSERT INTO praias (name, municipioid, local) VALUES (praia_in, municipio_id, local_in);
		SET praia_id = (select last_insert_id());
	END IF;

	INSERT INTO status (praiaid, status) VALUES (praia_id ,status_in);
	SET ok = 1;
   
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `municipios`
--

CREATE TABLE `municipios` (
`id` int(100) NOT NULL,
  `name` varchar(500) NOT NULL,
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `praias`
--

CREATE TABLE `praias` (
`id` int(100) NOT NULL,
  `name` varchar(500) NOT NULL,
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `municipioid` int(100) NOT NULL,
  `local` varchar(700) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `praias_status`
--
CREATE TABLE `praias_status` (
`name` varchar(500)
,`local` varchar(700)
,`municipioid` int(100)
,`addtime` timestamp
,`status` int(3)
);
-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
`id` int(100) NOT NULL,
  `praiaid` int(100) NOT NULL,
  `addtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(3) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=689 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure for view `praias_status`
--
DROP TABLE IF EXISTS `praias_status`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `praias_status` AS select `t3`.`name` AS `name`,`t3`.`local` AS `local`,`t3`.`municipioid` AS `municipioid`,`t1`.`addtime` AS `addtime`,`t1`.`status` AS `status` from (`status` `t1` join `praias` `t3` on((`t3`.`id` = `t1`.`praiaid`))) where (`t1`.`addtime` = (select max(`t2`.`addtime`) from `status` `t2` where (`t2`.`praiaid` = `t1`.`praiaid`)));

--
-- Indexes for dumped tables
--

--
-- Indexes for table `municipios`
--
ALTER TABLE `municipios`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `name` (`name`), ADD KEY `id` (`id`);

--
-- Indexes for table `praias`
--
ALTER TABLE `praias`
 ADD UNIQUE KEY `name` (`name`,`municipioid`), ADD KEY `id` (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `praiaid` (`praiaid`,`addtime`), ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `municipios`
--
ALTER TABLE `municipios`
MODIFY `id` int(100) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;
--
-- AUTO_INCREMENT for table `praias`
--
ALTER TABLE `praias`
MODIFY `id` int(100) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;
--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
MODIFY `id` int(100) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=0;