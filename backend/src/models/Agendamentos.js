// models/Agendamentos.js
// Recebe o "db" já conectado (vindo de req.app.locals.db, definido no server.js)

function agendamentosCollection(db) {
  return db.collection("agendamentos");
}

async function listarAgendamentos(db) {
  return agendamentosCollection(db).find().toArray();
}

async function criarAgendamento(db, { clienteNome, servico, horarioInicio, horarioFim, status = "Confirmado" }) {
  const resultado = await agendamentosCollection(db).insertOne({
    clienteNome,
    servico,
    horarioInicio,
    horarioFim,
    status
  });
  return resultado;
}

module.exports = {
  agendamentosCollection,
  listarAgendamentos,
  criarAgendamento
};