require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// 🔌 CONEXÃO COM O BANCO DE DADOS
const dbURI = process.env.MONGO_URI || "mongodb+srv://layhanna:admin123@cluster0.db_user.mongodb.net/layhanna_makeup?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB conectado com sucesso!"))
  .catch((erro) => console.log("Erro de conexão com o MongoDB:", erro));

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
  res.json({ mensagem: "API Layhanna Makeup funcionando!" });
});

// 🚀 DEFINIR A PORTA DO SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando perfeitamente na porta ${PORT}`);
});