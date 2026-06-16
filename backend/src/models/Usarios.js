// models/Usarios.js
// Não usa mongoose nem conexão própria: recebe o "db" já conectado
// (vindo de req.app.locals.db, definido no server.js)

function usuariosCollection(db) {
  return db.collection("usuarios");
}

async function buscarUsuarioPorEmail(db, email) {
  return usuariosCollection(db).findOne({ email });
}

async function criarUsuario(db, { email, senha }) {
  const resultado = await usuariosCollection(db).insertOne({ email, senha });
  return resultado;
}

module.exports = {
  usuariosCollection,
  buscarUsuarioPorEmail,
  criarUsuario
};