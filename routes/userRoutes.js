const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = new express.Router();

router.post('/login', async (req, res) => {
    console.log("Recebendo login para:", req.body.email, "senha: ", req.body.password);

    // try {
    //     const user = await User.findOne({ email: req.body.email });
    //     if (!user) {
    //         console.log("Usuário não encontrado");
    //         return res.status(400).send({ error: 'Usuário não encontrado' });
    //     }

    //     const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    //     console.log("Resultado da comparação de senha:", isPasswordMatch);

    //     if (!isPasswordMatch) {
    //         console.log(user.password);
    //         console.log(req.body.password);
    //         console.log("Falha na autenticação de senha");
    //         return res.status(400).send({ error: 'Senha incorreta' });
    //     }

    //     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' });
    //     console.log("Token gerado:", token);
    //     res.send({ token });
    // } catch (error) {
    //     console.log("Erro durante o login:", error);
    //     res.status(400).send(error);
    // }
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});

router.put('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'level'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Erro' });
    }

    try {
        const user = await User.findById(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        if (!user) {
            return res.status(400).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;
