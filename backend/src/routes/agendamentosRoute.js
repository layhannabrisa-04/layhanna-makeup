const express = require("express");
const router = express.Router();

// 1. ROTA GET: Busca os agendamentos direto do MongoDB
router.get("/", async (req, res) => {
  try {
    const db = req.app.locals.db; // Pega o banco de dados conectado
    const agendamentos = await db.collection("agendamentos").find({}).toArray();
    
    // Se o banco estiver vazio, retorna os dados padrão de teste para não ficar em branco
    if (agendamentos.length === 0) {
      const agendamentosTeste = [
        { _id: "1", clienteNome: "Maria Silva", servico: { nome: "Maquiagem Social" }, horarioInicio: "10:00", horarioFim: "12:00", status: "Confirmado" },
        { _id: "2", clienteNome: "Juliana Costa", servico: { nome: "Maquiagem Noiva" }, horarioInicio: "14:00", horarioFim: "16:00", status: "Confirmado" }
      ];
      return res.json(agendamentosTeste);
    }

    res.json(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ erro: "Erro ao buscar agendamentos no banco" });
  }
});

// 2. ROTA POST: Cria o agendamento de verdade no MongoDB
router.post("/", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { clienteNome, servico, horarioInicio, horarioFim } = req.body;

    const novoAgendamento = {
      clienteNome,
      servico, // Objeto { nome: "..." } enviado pelo front
      horarioInicio,
      horarioFim,
      status: "Confirmado",
      criadoEm: new Date()
    };

    // Insere o documento de verdade na coleção do MongoDB
    const resultado = await db.collection("agendamentos").insertOne(novoAgendamento);
    
    // Coloca o _id gerado pelo MongoDB no objeto de resposta
    novoAgendamento._id = resultado.insertedId;

    res.status(201).json(novoAgendamento);
  } catch (error) {
    console.error("Erro ao salvar agendamento:", error);
    res.status(500).json({ erro: "Erro ao salvar agendamento no banco" });
  }
});

module.exports = router;