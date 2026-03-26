const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

const findByEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT id, email, password FROM users WHERE email = ? LIMIT 1',
        [email]
    );
    return rows[0] || null;
};

const createUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword]
    );

    return {
        id: result.insertId,
        email,
        password: hashedPassword,
    };
};

module.exports = {
    findByEmail,
    createUser,
};