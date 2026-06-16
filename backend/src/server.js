require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb"); // 👈 Trocado Mongoose pelo MongoClient nativo

const app = express();

app.use(cors());
app.use(express.json());

// 🔌 CONEXÃO COM O BANCO DE DADOS (Usando o Driver Nativo)
// 🔌 CONEXÃO COM O BANCO DE DADOS
// String chumbada direto no código para evitar problemas com o .env
// Pega a URL do painel do Render, se não achar, usa a local
const dbURI = process.env.MONGO_URI;
let db; 

MongoClient.connect(dbURI)
  .then((client) => {
    console.log("MongoDB Nativo conectado com sucesso!");
    db = client.db("layhanna_makeup"); 
    app.locals.db = db; 
  })
  .catch((erro) => {
    console.log("Erro de conexão com o MongoDB Nativo:", erro);
  });

// 🛣️ --- IMPORTAR AS ROTAS ---
const authRoutes = require("./routes/authRoutes");
const servicoRoutes = require("./routes/servicoRoutes");
const agendamentoRoutes = require("./routes/agendamentosRoute");

// ⚡ --- VINCULAR AS ROTAS NA API ---
app.use("/api/auth", authRoutes);
app.use("/api/servicos", servicoRoutes);
app.use("/api/agendamentos", agendamentoRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.json({ mensagem: "API Layhanna Makeup funcionando com MongoDB Nativo!" });
});

// 🚀 DEFINIR A PORTA DO SERVIDOR (Ajustado com process.env.PORT para o Render aceitar)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando perfeitamente na porta ${PORT}`);
});