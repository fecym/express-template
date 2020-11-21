const env2 = require('env2');

if (process.env.NODE_ENV === 'production') {
  env2('.env.prod' || '.env');
} else {
  env2('.env.local' || '.env');
}

const { env } = process;

module.exports = {
  development: {
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    dialect: 'mysql'
  },
  production: {
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    dialect: 'mysql'
  }
};
