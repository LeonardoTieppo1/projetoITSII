const express = require('express');
const router = express.Router();
const TaskController = require('../controller/taskController');

// Rotas para tarefas
router.get('/user/:id/tasks/:status', TaskController.getTasks);
router.post('/user/tasks/update_status/', TaskController.updateTaskStatus);
router.post('/user/tasks/new_task/', TaskController.createTask);
router.get('/user/tasks/get_task/:id_task', TaskController.getTaskById);
router.post('/user/tasks/update_task/', TaskController.updateTaskText);
router.get('/user/tasks/delete_task/:id_task', TaskController.deleteTask);

module.exports = router;
