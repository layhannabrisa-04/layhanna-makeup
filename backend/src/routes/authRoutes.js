// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { buscarUsuarioPorEmail, criarUsuario } = require("../models/Usarios");

// Cria um novo usuário (registro) salvando de fato no MongoDB
router.post("/register", async (req, res) => {
  try {
    const db = req.app.locals.db;
    if (!db) {
      return res.status(503).json({ erro: "Banco de dados ainda conectando, tente novamente em alguns segundos" });
    }

    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "E-mail e senha são obrigatórios" });
    }

    const usuarioExistente = await buscarUsuarioPorEmail(db, email);
    if (usuarioExistente) {
      return res.status(400).json({ erro: "Este e-mail já está cadastrado" });
    }

    // Nunca salvar senha em texto puro: aqui ela é criptografada
    const senhaHash = await bcrypt.hash(senha, 10);
    await criarUsuario(db, { email, senha: senhaHash });

    return res.status(201).json({
      mensagem: "Usuário criado com sucesso!",
      usuario: { email }
    });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    return res.status(500).json({ erro: "Erro ao criar usuário" });
  }
});

// Login real, consultando o banco de dados (não é mais um valor fixo no código)
router.post("/login", async (req, res) => {
  try {
    const db = req.app.locals.db;
    if (!db) {
      return res.status(503).json({ erro: "Banco de dados ainda conectando, tente novamente em alguns segundos" });
    }

    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "E-mail e senha são obrigatórios" });
    }

    const usuario = await buscarUsuarioPorEmail(db, email);
    if (!usuario) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos" });
    }

    return res.json({
      mensagem: "Login efetuado com sucesso! Bem-vinda!",
      usuario: { email: usuario.email }
    });
  } catch (err) {
    console.error("Erro ao realizar login:", err);
    return res.status(500).json({ erro: "Erro ao tentar realizar o login" });
  }
});

module.exports = router;