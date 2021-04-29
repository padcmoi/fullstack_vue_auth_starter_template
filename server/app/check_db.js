const { Db } = require('../middleware/index')

Db.query(`
CREATE TABLE IF NOT EXISTS \`account\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`username\` varchar(255) NOT NULL,
    \`password\` varchar(255) NOT NULL,
    \`mail\` varchar(255) NOT NULL,
    \`firstname\` varchar(50) NOT NULL,
    \`lastname\` varchar(50) NOT NULL,
    \`is_lock\` int(1) NOT NULL DEFAULT '1',
    \`is_logged_in\` int(1) NOT NULL DEFAULT '0',
    \`is_admin\` int(1) NOT NULL DEFAULT '0',
    \`jwt_hash\` varchar(32) DEFAULT NULL,
    \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    \`last_connected_at\` datetime NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`_username\` (\`username\`),
    UNIQUE KEY \`_mail\` (\`mail\`),
    UNIQUE KEY \`jwt_hash\` (\`jwt_hash\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`)

Db.query(`
CREATE TABLE IF NOT EXISTS \`csrf\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`token\` varchar(50) NOT NULL,
    \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    \`expire_at\` datetime NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`token\` (\`token\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`)

Db.query(`
CREATE TABLE IF NOT EXISTS \`jwt\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`token\` varchar(32) NOT NULL,
    \`is_revoke\` int(1) NOT NULL DEFAULT '0',
    \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    \`expire_at\` datetime NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`token\` (\`token\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`)
