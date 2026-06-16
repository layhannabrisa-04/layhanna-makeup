// models/Servico.js
// Recebe o "db" já conectado (vindo de req.app.locals.db, definido no server.js)

function servicosCollection(db) {
  return db.collection("servicos");
}

async function listarServicos(db) {
  return servicosCollection(db).find().toArray();
}

async function criarServico(db, { nome, preco, imagemUrl = "" }) {
  const resultado = await servicosCollection(db).insertOne({ nome, preco, imagemUrl });
  return resultado;
}

module.exports = {
  servicosCollection,
  listarServicos,
  criarServico
};