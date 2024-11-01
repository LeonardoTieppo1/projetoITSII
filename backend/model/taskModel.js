const connection = require('../config/database');

const TaskModel = {
    // Recupera tarefas pelo ID do usuário e status (ou todas, se o status for "all")
    getTasksByUserId: (id, status, callback) => {
        const query = status !== "all" 
            ? "SELECT * FROM tasks WHERE id_user = ? AND task_status = ?" 
            : "SELECT * FROM tasks WHERE id_user = ?";
        
        const params = status !== "all" ? [id, status] : [id];
        connection.query(query, params, callback);
    },

    // Atualiza o status da tarefa
    updateTaskStatus: (status, id_task, callback) => {
        connection.query(
            "UPDATE tasks SET task_status = ?, updated_at = NOW() WHERE id = ?", 
            [status, id_task], 
            callback
        );
    },

    // Cria uma nova tarefa associada ao id_user
    createTask: (id_user, task_text, callback) => {
        connection.query(
            "INSERT INTO tasks (id_user, task_text, task_status, created_at, updated_at) VALUES (?, ?, 'new', NOW(), NOW())", 
            [id_user, task_text], 
            callback
        );
    },

    // Recupera uma tarefa pelo ID da tarefa
    getTaskById: (id_task, callback) => {
        connection.query("SELECT * FROM tasks WHERE id = ?", [id_task], callback);
    },

    // Atualiza o texto da tarefa
    updateTaskText: (task_text, id_task, callback) => {
        connection.query(
            "UPDATE tasks SET task_text = ?, updated_at = NOW() WHERE id = ?", 
            [task_text, id_task], 
            callback
        );
    },

    // Deleta uma tarefa pelo ID da tarefa
    deleteTask: (id_task, callback) => {
        connection.query("DELETE FROM tasks WHERE id = ?", [id_task], callback);
    }
};

module.exports = TaskModel;
