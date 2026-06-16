require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

// 💡 CONFIGURAÇÃO DE CORS DO RENDER
// Libera explicitamente o seu link do frontend para fazer requisições na API
app.use(cors({
  origin: "https://layhannamakeup.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 🔌 CONEXÃO COM O BANCO DE DADOS (Usando o Driver Nativo)
const dbURI = process.env.MONGO_URI;
let db; 

MongoClient.connect(dbURI)
  .then((client) => {
    console.log("MongoDB Nativo conectado com sucesso!");
    db = client.db("layhanna_makeup"); 
    app.locals.db = db; // Disponibiliza o banco para os arquivos de rotas
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

// Rota de teste raiz
app.get("/", (req, res) => {
  res.json({ mensagem: "API Layhanna Makeup funcionando com MongoDB Nativo!" });
});

// 🚀 DEFINIR A PORTA DO SERVIDOR (Ajustado com process.env.PORT para o Render aceitar)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando perfeitamente na porta ${PORT}`);
});