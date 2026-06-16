const express = require("express");
const router = express.Router();

// Rota de Login 100% isolada para testes
router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  // Login fixo temporário para você testar seu Dashboard agora!
  if (email === "layhanna@makeup.com" && senha === "admin123") {
    return res.json({ 
      mensagem: "Login efetuado com sucesso! Bem-vinda!", 
      usuario: { email } 
    });
  }

  // Se errar a senha de teste:
  return res.status(401).json({ erro: "E-mail ou senha incorretos" });
});

module.exports = router;