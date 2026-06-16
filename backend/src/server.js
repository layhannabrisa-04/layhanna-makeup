require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

// 💡 CONFIGURAÇÃO DE CORS DO RENDER (Atualizado com os links exatos)
const allowedOrigins = [
  "https://layhannamakeup.onrender.com",   // Seu link real sem hífen
  "https://layhanna-makeup.onrender.com",  // Versão com hífen (caso use)
  "http://localhost:5173",                 // Para você conseguir testar no seu PC também
];

// 💡 CONFIGURAÇÃO DE CORS UNIVERSAL (Abre as portas para o front-end sem frescura)
app.use(cors({
  origin: "*", // O asterisco permite que QUALQUER site acesse sua API
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Tem que ser ANTES do express.json e das rotas!
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