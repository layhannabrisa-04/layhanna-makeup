import { useState, useEffect } from 'react';
import api from './services/api';
import Login from "./pages/login";
import './styles.css';

// Fotos reais dos serviços (cycling por índice)
import makeRosto1 from './assets/makerosto1.jpeg';
import makeRosto2 from './assets/makerosto2.jpeg';
import makeRosto3 from './assets/makerosto3.jpeg';
import makeRosto4 from './assets/makerosto4.jpeg';

const servicePhotos = [makeRosto1, makeRosto2, makeRosto3, makeRosto4];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [servicos, setServicos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  const [clienteNome, setClienteNome] = useState('');
  const [servicoSelecionado, setServicoSelecionado] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioFim, setHorarioFim] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      api.get('/api/servicos')
        .then(res => {
          setServicos(res.data);
          if (res.data.length > 0) setServicoSelecionado(res.data[0].nome);
        })
        .catch(err => console.error("Erro ao carregar serviços:", err));

      api.get('/api/agendamentos')
        .then(res => setAgendamentos(res.data))
        .catch(err => console.error("Erro ao carregar agendamentos:", err));
    }
  }, [isLoggedIn]);

  const handleNovoAgendamento = (e) => {
    e.preventDefault();

    const novo = {
      _id: Math.random().toString(),
      clienteNome,
      servico: { nome: servicoSelecionado },
      horarioInicio,
      horarioFim,
      status: 'Confirmado'
    };

    setAgendamentos([...agendamentos, novo]);
    setClienteNome('');
    setHorarioInicio('');
    setHorarioFim('');
    alert('Agendamento realizado com sucesso!');
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="dashboard-container">

      {/* ── SIDEBAR ─────────────────────────────────────── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Layhanna.Makeup_</h2>
          <p>Painel de Controle</p>
        </div>

        <hr className="sidebar-divider" />

        <div className="sidebar-nav-item">
          Dashboard
        </div>

        <div className="sidebar-footer">
          Feito com <span>♡</span> para<br />
          a arte de embelezar
        </div>
      </aside>

      {/* ── CONTEÚDO PRINCIPAL ──────────────────────────── */}
      <main className="main-content">

        {/* Cabeçalho */}
        <div className="page-header">
          <h1>Olá, <span>Layhanna!</span> ♡</h1>
          <p>Que seu dia seja tão lindo quanto a sua make.</p>
        </div>

        {/* ── FORMULÁRIO DE NOVO AGENDAMENTO ────────────── */}
        <div className="form-card">
          <h3 className="section-title">✨ Novo Agendamento</h3>

          <form className="appointment-form" onSubmit={handleNovoAgendamento}>
            <div className="form-group">
              <label>Cliente</label>
              <input
                type="text"
                value={clienteNome}
                onChange={e => setClienteNome(e.target.value)}
                placeholder="Nome da cliente"
                required
              />
            </div>

            <div className="form-group">
              <label>Serviço</label>
              <select
                value={servicoSelecionado}
                onChange={e => setServicoSelecionado(e.target.value)}
              >
                {servicos.map(s => (
                  <option key={s._id} value={s.nome}>{s.nome}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Início</label>
              <input
                type="time"
                value={horarioInicio}
                onChange={e => setHorarioInicio(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Fim</label>
              <input
                type="time"
                value={horarioFim}
                onChange={e => setHorarioFim(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Agendar Cliente
            </button>
          </form>
        </div>

        {/* ── MEUS SERVIÇOS ─────────────────────────────── */}
        <h3 className="section-title">Meus Serviços</h3>

        <div className="services-grid">
          {servicos.map((servico, index) => (
            <div key={servico._id} className="service-card">
              {/* Foto real no lugar do emoji */}
              <div className="service-card-photo">
                <img
                  src={servicePhotos[index % servicePhotos.length]}
                  alt={servico.nome}
                />
              </div>

              <div className="service-card-body">
                <h4>{servico.nome}</h4>
                <p className="price">R$ {servico.preco},00</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── PRÓXIMOS ATENDIMENTOS ─────────────────────── */}
        <h3 className="section-title">🕒 Próximos Atendimentos</h3>

        <div className="appointments-list">
          {agendamentos.length === 0 ? (
            <p className="appointments-empty">
              Nenhum atendimento agendado ainda. ♡
            </p>
          ) : (
            agendamentos.map(agenda => (
              <div key={agenda._id} className="appointment-row">
                <div>
                  <p className="appt-client-name">{agenda.clienteNome}</p>
                  <p className="appt-service-name">{agenda.servico?.nome}</p>
                </div>

                <p className="appt-time">
                  {agenda.horarioInicio} — {agenda.horarioFim}
                </p>

                <span className="status-badge">
                  {agenda.status}
                </span>
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}

export default App;