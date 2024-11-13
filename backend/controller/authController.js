const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const SECRET_KEY = 'secretkey';

const authController = {
    register: (req, res) => {
        const { username, password } = req.body;

        userModel.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao verificar nome de usuário." });
            }

            if (user) {
                return res.status(400).json({ message: "Nome de usuário já está em uso." });
            }

            userModel.create(username, password, (err, result) => {
                if (err) return res.status(500).send(err.message);
                res.status(201).json({ message: 'Usuário registrado com sucesso!' });
            });
        });
    },

    login: (req, res) => {
        const { username, password } = req.body;
    
        userModel.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao buscar usuário." });
            }
    
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
    
            if (password !== user.password) {
                return res.status(400).json({ message: "Senha incorreta." });
            }
    
            const token = jwt.sign({ id_user: user.id }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        });
    },

    getUser: (req, res) => {
        userModel.getUserById(req.params.id, (err, resu) => {
            if (err || resu.length === 0) return res.status(404).send({ message: "Usuário não encontrado" });
            res.json(resu);
        });
    },

    updatePassword: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username e nova senha são obrigatórios." });
        }

        userModel.updatePassword(username, password, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.json({ message: "Senha atualizada com sucesso!" });
        });
    },

    checkUsername: (req, res) => {
        const { username } = req.query;

        userModel.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao verificar nome de usuário." });
            }

            res.json({ exists: !!user });
        });
    },

    protectedRoute: (req, res) => {
        res.json({ message: "Rota protegida!" });
    }
};

module.exports = authController;
