const express = require("express");
const router = express.Router();

// Rota para listar os próximos atendimentos
router.get("/", (req, res) => {
  const agendamentosTeste = [
    { _id: "1", clienteNome: "Maria Silva", servico: { nome: "Maquiagem Social" }, horarioInicio: "10:00", horarioFim: "12:00", status: "Confirmado" },
    { _id: "2", clienteNome: "Juliana Costa", servico: { nome: "Maquiagem Noiva" }, horarioInicio: "14:00", horarioFim: "16:00", status: "Confirmado" }
  ];
  res.json(agendamentosTeste);
});

module.exports = router;