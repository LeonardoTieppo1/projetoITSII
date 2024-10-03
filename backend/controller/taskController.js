const TaskModel = require('../model/taskModel');

const TaskController = {

    getTasks: (req, res) => {
        const { id, status } = req.params;
        TaskModel.getTasksByUserId(id, status, (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.json(result);
        });
    },
    updateTaskStatus: (req, res) => {
        TaskModel.updateTaskStatus(req.body.status, req.body.task_id, (err) => {
            if (err) return res.status(500).send("Error MySQL");
            res.status(200).json({ message: "Task status updated successfully" });
        });
    },
    createTask: (req, res) => {
        TaskModel.createTask(req.body.id_user, req.body.task_text, (err) => {
            if (err) return res.status(500).send("Error MySQL");
            res.status(200).json({message:"Task created successfully"});
        });
    },
    getTaskById: (req, res) => {
        TaskModel.getTaskById(req.params.id_task, (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.json(result);
        });
    },
    updateTaskText: (req, res) => {
        TaskModel.updateTaskText(req.body.task_text, req.body.id_task, (err) => {
            if (err) return res.status(500).send("Error MySQL");
            res.status(200).json({message:"Task text updated successfully"});
        });
    },
    deleteTask: (req, res) => {
        TaskModel.deleteTask(req.params.id_task, (err) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).json({message:"Task deleted successfully"});
        });
    }
};

module.exports = TaskController;
