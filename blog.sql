/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-03-11 21:29:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `categoryId` varchar(60) NOT NULL,
  `name` varchar(20) NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '1', 'JavaScript', '1');
INSERT INTO `category` VALUES ('2', '81268a4b-0fb9-4d83-95ac-4a73572d9df8', 'HTML', '1');
INSERT INTO `category` VALUES ('3', 'f6fe773d-d7d7-404a-ba57-2ba4c999e2cf', 'CSS', '1');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(5) NOT NULL,
  `content` text NOT NULL,
  `uid` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `abstract` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(60) NOT NULL,
  `ctime` varchar(14) NOT NULL,
  `mtime` varchar(14) DEFAULT '0',
  `category` int(5) NOT NULL,
  `comment` int(5) DEFAULT '0',
  `like` int(5) DEFAULT '0',
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES ('14', '测试title1', '测试摘要1', '测试content1245', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520586371052', '1520745079090', '1', '0', '19', '1');
INSERT INTO `posts` VALUES ('15', '5435', '5454', '54543', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520652040085', '1520653322446', '1', '0', '31', '1');
INSERT INTO `posts` VALUES ('16', '5435', '5', '5', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520652733944', '0', '1', '0', '10', '1');
INSERT INTO `posts` VALUES ('17', '534', '543', '543', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520745088662', '0', '1', '0', '0', '1');
INSERT INTO `posts` VALUES ('18', 'html', 'html', 'html', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520745778992', '0', '1', '0', '1', '1');
INSERT INTO `posts` VALUES ('19', 'html', 'html', 'html', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520745944243', '0', '2', '0', '0', '1');
INSERT INTO `posts` VALUES ('20', 'html', 'html', 'html', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520746116296', '0', '2', '0', '0', '1');
INSERT INTO `posts` VALUES ('21', 'html', 'html', 'html', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', '1520746158993', '0', '2', '0', '0', '1');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sessions
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `uid` varchar(60) NOT NULL,
  `uname` varchar(20) NOT NULL,
  `nickname` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '1dbbfd67-72b6-49f6-9d40-dfc49dc24558', 'admin', 'admin', 'fdb93343548e548af01bcce98008dbfa', '1');
INSERT INTO `user` VALUES ('2', '6f57e05f-e373-45d2-8f05-f50f8714afa1', 'admin1', '0f3d5fb4-16b9-4e3e-9bba-b05470b246cc', 'fdb93343548e548af01bcce98008dbfa', '1');
