

CREATE TABLE IF NOT EXISTS `account` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `is_lock` int(1) NOT NULL DEFAULT '1',
  `is_logged_in` int(1) NOT NULL DEFAULT '0',
  `is_admin` int(1) NOT NULL DEFAULT '0',
  `jwt_hash` varchar(32) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_connected_at` datetime NOT NULL DEFAULT '1970-01-01 00:00:00',
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `_username` (`username`),
  ADD UNIQUE KEY `_mail` (`mail`),
  ADD UNIQUE KEY `jwt_hash` (`jwt_hash`),
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `csrf` (
  `id` int(11) NOT NULL,
  `token` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `expire_at` datetime NOT NULL DEFAULT '1970-01-01 00:00:00',
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `jwt` (
  `id` int(11) NOT NULL,
  `token` varchar(32) NOT NULL,
  `is_revoke` int(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `expire_at` datetime NOT NULL DEFAULT '1970-01-01 00:00:00',
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

