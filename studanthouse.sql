
drop database if exists studenthouse;
CREATE database studenthouse;

use studenthouse;

DROP TABLE IF EXISTS `authors`;

CREATE TABLE `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `financeiro`;

CREATE TABLE `financeiro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `closed_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `description` varchar(255) NOT NULL,
  `patrimony` varchar(255) NOT NULL,
  `solution` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_financeiro_authors_idx` (`user_id`),
  CONSTRAINT `fk_financeiro_authors_idx` FOREIGN KEY (`user_id`) REFERENCES `authors` (`id`)

)ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `feeds`;

CREATE TABLE `feeds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagem` varchar(255) NOT NULL,
  `comentario` varchar(510) NOT NULL,
  `authors_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_feed_authors_idx` (`authors_id`),
  CONSTRAINT `fk_feed_authors` FOREIGN KEY (`authors_id`) REFERENCES `authors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `authors` VALUES (1,'Edimundo_jr','edimundojr.jfif');
INSERT INTO `authors` VALUES (2,'AnnaClara','annaclaraf.jfif');
INSERT INTO `authors` VALUES (3,'Letícia','KemitaS.jfif');
INSERT INTO `authors` VALUES (4,'FancineSilva','Francine13.jfif');

INSERT INTO `feeds` VALUES (1,'feed1.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',1);
INSERT INTO `feeds` VALUES (2,'feed2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',2);
INSERT INTO `feeds` VALUES (3,'feed3.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',3);
INSERT INTO `feeds` VALUES (4,'feed4.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',4);

INSERT INTO `feeds` VALUES (5,'feed4.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',1);
INSERT INTO `feeds` VALUES (6,'feed3.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',2);
INSERT INTO `feeds` VALUES (7,'feed2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',3);
INSERT INTO `feeds` VALUES (8,'feed1.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',4);


INSERT INTO `financeiro` VALUES (1,'2021-04-14 18:21:11','2021-04-14 18:21:12','teste','teste2','teste3','open',1);
INSERT INTO `financeiro` VALUES (2,'2021-04-14 18:21:11','2021-04-14 18:21:12','teste','teste2','teste3','open',2);
INSERT INTO `financeiro` VALUES (3,'2021-04-14 18:21:11','2021-04-14 18:21:12','teste','teste2','teste3','open',3);
INSERT INTO `financeiro` VALUES (4,'2021-04-14 18:21:11','2021-04-14 18:21:12','teste','teste2','teste3','open',4);







SELECT authors.name, financeiro.status,financeiro.patrimony
from authors
join financeiro   on   financeiro.id = authors.id;



SELECT feeds.id as feed_id , 
        authors.name as nome_authors , authors.avatar, feeds.comentario, feeds.imagem 
        FROM feeds 
        join authors   on   feeds.authors_id = authors.id
        where authors.id = 1
		ORDER BY feeds.id desc;