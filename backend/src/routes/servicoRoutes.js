const express = require("express");
const router = express.Router();

// Rota para listar os serviços (Manda os dados direto para o seu frontend)
router.get("/", (req, res) => {
  const servicosTeste = [
    { _id: "1", nome: "Maquiagem Social", preco: 180, imagemUrl: "" },
    { _id: "2", nome: "Maquiagem Noiva", preco: 350, imagemUrl: "" },
    { _id: "3", nome: "Maquiagem Editorial", preco: 250, imagemUrl: "" },
    { _id: "4", nome: "Curso Automaquiagem", preco: 200, imagemUrl: "" }
  ];
  res.json(servicosTeste);
});

module.exports = router;