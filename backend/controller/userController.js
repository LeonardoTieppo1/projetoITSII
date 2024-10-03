const userModel = require('../model/userModel');



const userController = {
    getUser: (req, res) => {
        userModel.getUserById(req.params.id, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.json(result);
        });
    },

    getUserCount: (req, res) => {
        userModel.getUserCount((err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.json(result);
        });
    },
    
};

module.exports = userController;
