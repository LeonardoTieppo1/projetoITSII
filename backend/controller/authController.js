const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const SECRET_KEY = 'secretkey';

const authController = {
    register: (req, res) => {
        const { username, password } = req.body;

        // Cria um novo usuário com a senha não criptografada
        userModel.create(username, password, (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        });
    },

    login: (req, res) => {
        const { username, password } = req.body;
    
        // Busca o usuário pelo nome de usuário
        userModel.findByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao buscar usuário." });
            }
    
            // Verifica se o usuário foi encontrado
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
    
            // Verifica a senha diretamente
            if (password !== user.password) {
                return res.status(400).json({ message: "Senha incorreta." });
            }
    
            // Gera um token JWT
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

        // Valida se username e password foram fornecidos
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
    
    

    protectedRoute: (req, res) => {
        res.json({ message: "Rota protegida!" });
    }
};

module.exports = authController;
