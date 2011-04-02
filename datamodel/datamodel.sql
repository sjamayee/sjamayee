-- phpMyAdmin SQL Dump
-- version 3.2.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 26, 2011 at 12:39 PM
-- Server version: 5.1.44
-- PHP Version: 5.3.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `sjamayee_demo`
--
-- --------------------------------------------------------

--
-- Table structure for table `sja_sequences`
--

--DROP TABLE IF EXISTS `sja_sequences`;
CREATE TABLE `sja_sequences` (
  `value` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'The value of the sequence',
  PRIMARY KEY (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `sja_texts`
--

--DROP TABLE IF EXISTS `sja_texts`;
CREATE TABLE `sja_texts` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `name` varchar(255) DEFAULT NULL COMMENT 'Name',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `nid` varchar(255) DEFAULT NULL COMMENT 'Next ID',
  `pid` varchar(255) DEFAULT NULL COMMENT 'Previous ID',
  `par` char(8) NOT NULL DEFAULT '' COMMENT 'Paragraph',
  `seq` float NOT NULL DEFAULT '0' COMMENT 'Sequence',
  `text` longtext NOT NULL COMMENT 'Text',
  `cbi` varchar(255) NOT NULL COMMENT 'Created by ID',
  `cat` datetime NOT NULL COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified at',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee texts';

-- --------------------------------------------------------

--
-- Table structure for table `sja_types`
--

--DROP TABLE IF EXISTS `sja_types`;
CREATE TABLE `sja_types` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `type` varchar(32) NOT NULL COMMENT 'Type',
  `code` char(4) NOT NULL COMMENT 'Code',
  `name` varchar(255) NOT NULL COMMENT 'Name',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `description` mediumtext COMMENT 'Description',
  `in_use` char(1) NOT NULL DEFAULT 'Y' COMMENT 'In use',
  `object` varchar(255) DEFAULT NULL COMMENT 'Object',
  `txi` varchar(255) DEFAULT NULL COMMENT 'Text ID',
  `cbi` varchar(255) NOT NULL COMMENT 'Created by ID',
  `cat` datetime NOT NULL COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified at',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee types';


-- --------------------------------------------------------

--
-- Table structure for table `sja_model_attributes`
--

--DROP TABLE IF EXISTS `sja_model_attributes`;
CREATE TABLE `sja_model_attributes` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `name` varchar(255) DEFAULT NULL COMMENT 'Name',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `eid` varchar(255) NOT NULL COMMENT 'Entity ID',
  `default_value` varchar(255) DEFAULT NULL COMMENT 'Default value',
  `description` varchar(255) DEFAULT NULL COMMENT 'Description',
  `digits` smallint(6) DEFAULT NULL COMMENT 'Digits',
  `format` varchar(255) DEFAULT NULL COMMENT 'Format',
  `hxi` varchar(255) DEFAULT NULL COMMENT 'Help text ID',
  `identifier` char(1) NOT NULL DEFAULT 'N' COMMENT 'Identifier flag',
  `label` varchar(255) DEFAULT NULL COMMENT 'Label',
  `length` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Length',
  `mandatory` char(1) NOT NULL DEFAULT 'N' COMMENT 'Mandatory',
  `nid` varchar(255) NOT NULL COMMENT 'Next ID',
  `precision` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Precision',
  `scale` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Scale',
  `txi` varchar(255) DEFAULT NULL COMMENT 'Text ID',
  `type` varchar(32) NOT NULL DEFAULT 'Text' COMMENT 'Type',
  `unique` char(1) NOT NULL DEFAULT 'N' COMMENT 'Unique',
  `cbi` varchar(255) NOT NULL COMMENT 'Created by ID',
  `cat` datetime NOT NULL COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee model attributes';

-- --------------------------------------------------------

--
-- Table structure for table `sja_model_entities`
--

--DROP TABLE IF EXISTS `sja_model_entities`;
CREATE TABLE `sja_model_entities` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `name` varchar(255) DEFAULT NULL COMMENT 'Name',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `description` mediumtext COMMENT 'Description',
  `tid` varchar(255) NOT NULL COMMENT 'Type ID',
  `txi` varchar(255) DEFAULT NULL COMMENT 'Text ID',
  `exi` varchar(255) DEFAULT NULL COMMENT 'Extens ID',
  `cbi` varchar(255) NOT NULL COMMENT 'Created by ID',
  `cat` datetime NOT NULL COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified at',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee model entities';

-- --------------------------------------------------------

--
-- Table structure for table `sja_model_relations`
--

--DROP TABLE IF EXISTS `sja_model_relations`;
CREATE TABLE `sja_model_relations` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `name` varchar(255) DEFAULT NULL COMMENT 'Name',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `pei` varchar(255) NOT NULL COMMENT 'Parent entity ID',
  `cei` varchar(255) NOT NULL COMMENT 'Child entity ID',
  `pid` varchar(255) DEFAULT NULL COMMENT 'Previous ID',
  `nid` varchar(255) DEFAULT NULL COMMENT 'Next ID',
  `txi` varchar(255) DEFAULT NULL COMMENT 'Text ID',
  `cbi` varchar(255) NOT NULL COMMENT 'Created by ID',
  `cat` datetime NOT NULL COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified at',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee model relations';

-- --------------------------------------------------------

--
-- Table structure for table `sja_data_attributes`
--

--DROP TABLE IF EXISTS `sja_data_attributes`;
CREATE TABLE `sja_data_attributes` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `eid` varchar(255) NOT NULL COMMENT 'Entity ID',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `name` varchar(255) NOT NULL COMMENT 'Name',
  `value` varchar(255) NOT NULL DEFAULT '' COMMENT 'Value',
  `mai` varchar(255) DEFAULT NULL COMMENT 'Model attribute ID',
  `cbi` varchar(255) NOT NULL COMMENT 'Created by ID',
  `cat` datetime NOT NULL COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified at',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee data attributes';

-- --------------------------------------------------------

--
-- Table structure for table `sja_data_entities`
--

--DROP TABLE IF EXISTS `sja_data_entities`;
CREATE TABLE `sja_data_entities` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `name` varchar(255) DEFAULT NULL COMMENT 'Name',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `description` mediumtext COMMENT 'Description',
  `mei` varchar(255) NOT NULL COMMENT 'Model entity ID/Type ID',
  `oid` varchar(255) DEFAULT NULL COMMENT 'Object ID',
  `txi` varchar(255) DEFAULT NULL COMMENT 'Text ID',
  `cbi` varchar(255) NOT NULL COMMENT 'Created by ID',
  `cat` datetime NOT NULL COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified at',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee data entities';

-- --------------------------------------------------------

--
-- Table structure for table `sja_data_relations`
--

--DROP TABLE IF EXISTS `sja_data_relations`;
CREATE TABLE `sja_data_relations` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `name` varchar(255) DEFAULT NULL COMMENT 'Name',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `mri` varchar(255) DEFAULT NULL COMMENT 'Model relation ID',
  `pei` varchar(255) NOT NULL COMMENT 'Parent entity ID',
  `cei` varchar(255) NOT NULL COMMENT 'Child entity ID',
  `pid` varchar(255) DEFAULT NULL COMMENT 'Previous ID',
  `nid` varchar(255) DEFAULT NULL COMMENT 'Next ID',
  `txi` varchar(255) DEFAULT NULL COMMENT 'Text ID',
  `cbi` varchar(255) NOT NULL COMMENT 'Created by ID',
  `cat` datetime NOT NULL COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified at',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee data relations';
