const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

// 1. Kondisi jika aplikasi berjalan di Vercel (mendeteksi DATABASE_URL)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true, // Wajib untuk database online gratisan
        rejectUnauthorized: false, // Mencegah error keamanan pada database cloud
      },
    },
  });
}
// 2. Kondisi jika aplikasi berjalan di development lokal (menggunakan SQLite)
else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./todo.db", // File database lokal
    logging: false,
  });
}

module.exports = sequelize;
