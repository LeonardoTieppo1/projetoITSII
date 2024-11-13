const connection = require('../config/database');

const TaskModel = {
    getTasksByUserId: (id, status, callback) => {
        const query = status !== "all" 
            ? "SELECT * FROM tasks WHERE id_user = ? AND task_status = ?" 
            : "SELECT * FROM tasks WHERE id_user = ?";
        
        const params = status !== "all" ? [id, status] : [id];
        connection.query(query, params, callback);
    },

    updateTaskStatus: (status, id_task, callback) => {
        connection.query(
            "UPDATE tasks SET task_status = ?, updated_at = NOW() WHERE id = ?", 
            [status, id_task], 
            callback
        );
    },

    createTask: (id_user, task_text, callback) => {
        connection.query(
            "INSERT INTO tasks (id_user, task_text, task_status, created_at, updated_at) VALUES (?, ?, 'new', NOW(), NOW())", 
            [id_user, task_text], 
            callback
        );
    },

    getTaskById: (id_task, callback) => {
        connection.query("SELECT * FROM tasks WHERE id = ?", [id_task], callback);
    },

    updateTaskText: (task_text, id_task, callback) => {
        connection.query(
            "UPDATE tasks SET task_text = ?, updated_at = NOW() WHERE id = ?", 
            [task_text, id_task], 
            callback
        );
    },

    deleteTask: (id_task, callback) => {
        connection.query("DELETE FROM tasks WHERE id = ?", [id_task], callback);
    }
};

module.exports = TaskModel;
