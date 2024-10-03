// models/userModel.js
const connection = require("../config/database");

const userModel = {
    getUserById: (id, callback) => {
        connection.query("SELECT id, username, created_at FROM users WHERE id=?", [id], callback);
    },
    getUserCount: (callback) => {
        connection.query("SELECT COUNT(*) AS users FROM users", callback);
    },
    create: (username, email, password, callback) => {
        const query = 'INSERT INTO users (username, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
        connection.query(query, [username, email, password], callback);
    },
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        connection.query(query, [username], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback(null, null); // Nenhum usuário encontrado
            }
            callback(null, results[0]); // Retorna o primeiro usuário encontrado
        });
    },
    updatePassword: (username, newPassword, callback) => {
        const query = 'UPDATE users SET password = ? WHERE username = ?';
        connection.query(query, [newPassword, username], callback);
    },
    
}

module.exports = userModel;
