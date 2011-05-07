-- phpMyAdmin SQL Dump
-- version 3.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `sjamayee_demo`
--
-- --------------------------------------------------------
-- Table structure for table `sja_sequences`
--
--DROP TABLE IF EXISTS `sja_sequences`;
CREATE TABLE `sja_sequences` (
  `value` int(10) unsigned NOT NULL DEFAULT 0 COMMENT 'The value of the sequence',
  PRIMARY KEY (`value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='Sjamayee sequences';

-- --------------------------------------------------------
-- Table structure for table `sja_types`
--
--DROP TABLE IF EXISTS `sja_types`;
CREATE TABLE `sja_types` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `type` varchar(32) NOT NULL COMMENT 'Type',
  `code` char(4) NOT NULL COMMENT 'Code',
  `name` varchar(255) NOT NULL COMMENT 'Name',
  `description` mediumtext DEFAULT NULL COMMENT 'Description',
  `in_use` char(1) NOT NULL DEFAULT 'Y' COMMENT 'In use',
  `object` varchar(255) DEFAULT NULL COMMENT 'Object',
  `txi` varchar(255) DEFAULT NULL COMMENT 'Text ID',
  `cbi` varchar(255) NOT NULL COMMENT 'Created by ID',
  `cat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified at',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee types';

-- --------------------------------------------------------
-- Table structure for table `sja_texts`
--
--DROP TABLE IF EXISTS `sja_texts`;
CREATE TABLE `sja_texts` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `name` varchar(255) DEFAULT NULL COMMENT 'Name',
  `nid` varchar(255) DEFAULT NULL COMMENT 'Next ID',
  `pid` varchar(255) DEFAULT NULL COMMENT 'Previous ID',
  `par` char(8) NOT NULL DEFAULT '' COMMENT 'Paragraph',
  `seq` float NOT NULL DEFAULT '0' COMMENT 'Sequence',
  `text` longtext NOT NULL COMMENT 'Text',
  `cbi` varchar(255) NOT NULL COMMENT 'Created by ID',
  `cat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified at',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee texts';

-- --------------------------------------------------------
-- Table structure for table `sja_objects`
--
--DROP TABLE IF EXISTS `sja_objects`;
CREATE TABLE `sja_objects` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `name` varchar(255) DEFAULT NULL COMMENT 'Name',
  `description` mediumtext COMMENT 'Description',
  `tid` varchar(255) NOT NULL COMMENT 'Type ID',
  `exi` varchar(255) DEFAULT NULL COMMENT 'Extens ID',
  `mei` varchar(255) DEFAULT NULL COMMENT 'Model Entity ID',
  `oid` varchar(255) DEFAULT NULL COMMENT 'Object ID',
  `txi` varchar(255) DEFAULT NULL COMMENT 'Text ID',
  `cbi` varchar(255) NOT NULL COMMENT 'Created by ID',
  `cat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified at',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee objects';

-- --------------------------------------------------------
-- Table structure for table `sja_references`
--
--DROP TABLE IF EXISTS `sja_references`;
CREATE TABLE `sja_references` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `name` varchar(255) DEFAULT NULL COMMENT 'Name',
  `mri` varchar(255) NOT NULL COMMENT 'Model Reference ID',
  `pei` varchar(255) NOT NULL COMMENT 'Parent entity ID',
  `cei` varchar(255) NOT NULL COMMENT 'Child entity ID',
  `pid` varchar(255) DEFAULT NULL COMMENT 'Previous ID',
  `nid` varchar(255) DEFAULT NULL COMMENT 'Next ID',
  `txi` varchar(255) DEFAULT NULL COMMENT 'Text ID',
  `cbi` varchar(255) NOT NULL COMMENT 'Created by ID',
  `cat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified at',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee references';

-- --------------------------------------------------------
-- Table structure for table `sja_attributes`
--
--DROP TABLE IF EXISTS `sja_attributes`;
CREATE TABLE `sja_attributes` (
  `id` varchar(255) NOT NULL COMMENT 'Primary ID',
  `version` smallint(6) NOT NULL DEFAULT '0' COMMENT 'Version',
  `name` varchar(255) DEFAULT NULL COMMENT 'Name',
  `value` varchar(255) DEFAULT NULL COMMENT 'Value',
  `mai` varchar(255) NOT NULL COMMENT 'Model Attribute ID',
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
  `cat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created at',
  `mbi` varchar(255) NOT NULL COMMENT 'Modified by ID',
  `mat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Modified at',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Sjamayee attributes';
