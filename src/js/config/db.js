import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export function connectDB() {
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });

    db.connect((err) => {
        if (err) throw err;
        else console.log("Connected to db");
    });

    return db;
};