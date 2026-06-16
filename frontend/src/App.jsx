import React, { useState, useEffect } from 'react';
import api from './services/api';
import Login from './pages/Login';
import './styles.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [servicos, setServicos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  
  // Estados para o formulário de novo agendamento
  const [clienteNome, setClienteNome] = useState('');
  const [servicoSelecionado, setServicoSelecionado] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioFim, setHorarioFim] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      // Busca os serviços das nossas rotas
      api.get('/servicos')
        .then(res => {
          setServicos(res.data);
          if(res.data.length > 0) setServicoSelecionado(res.data[0].nome);
        })
        .catch(err => console.error("Erro ao carregar serviços:", err));

      // Busca os agendamentos das nossas rotas
      api.get('/agendamentos')
        .then(res => setAgendamentos(res.data))
        .catch(err => console.error("Erro ao carregar agendamentos:", err));
    }
  }, [isLoggedIn]);

  // Função para adicionar novo agendamento na tela na hora!
  const handleNovoAgendamento = (e) => {
    e.preventDefault();
    
    const novo = {
      _id: Math.random().toString(), // Gera um ID temporário
      clienteNome,
      servico: { nome: servicoSelecionado },
      horarioInicio,
      horarioFim,
      status: 'Confirmado'
    };

    // Atualiza a lista na tela instantaneamente
    setAgendamentos([...agendamentos, novo]);
    
    // Limpa os campos do formulário
    setClienteNome('');
    setHorarioInicio('');
    setHorarioFim('');
    alert('Agendamento realizado com sucesso!');
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="dashboard-container" style={{ display: 'flex', fontFamily: 'sans-serif', backgroundColor: '#faf6f0', minHeight: '100vh' }}>
      
      {/* MENU LATERAL */}
      <div style={{ width: '250px', backgroundColor: '#fff', padding: '20px', borderRight: '1px solid #eee' }}>
        <h2 style={{ color: '#ab7a5f' }}>Layhanna.Makeup_</h2>
        <p style={{ fontSize: '14px', color: '#888' }}>Painel de Controle</p>
        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
        <p style={{ fontWeight: 'bold', color: '#ab7a5f' }}>📅 Dashboard</p>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div style={{ flex: 1, padding: '40px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1>Olá, Layhanna! ♡</h1>
          <p style={{ color: '#666' }}>Que seu dia seja tão lindo quanto a sua make.</p>
        </div>

        {/* FORMULÁRIO DE NOVO AGENDAMENTO */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <h3 style={{ color: '#ab7a5f', marginTop: 0, marginBottom: '20px' }}>✨ Novo Agendamento</h3>
          <form onSubmit={handleNovoAgendamento} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div>
              <label style={{ fontSize: '14px' }}>Cliente:</label><br />
              <input type="text" value={clienteNome} onChange={e => setClienteNome(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', width: '200px' }} />
            </div>
            <div>
              <label style={{ fontSize: '14px' }}>Serviço:</label><br />
              <select value={servicoSelecionado} onChange={e => setServicoSelecionado(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', width: '180px' }}>
                {servicos.map(s => <option key={s._id} value={s.nome}>{s.nome}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '14px' }}>Início:</label><br />
              <input type="time" value={horarioInicio} onChange={e => setHorarioInicio(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
            <div>
              <label style={{ fontSize: '14px' }}>Fim:</label><br />
              <input type="time" value={horarioFim} onChange={e => setHorarioFim(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
            </div>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#e2b49a', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Agendar Cliente
            </button>
          </form>
        </div>

        {/* MEUS SERVIÇOS */}
        <h3 style={{ color: '#ab7a5f' }}>Meus Serviços</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 150px))', gap: '20px', marginBottom: '40px' }}>
          {servicos.map(servico => (
            <div key={servico._id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>💄</div>
              <h4 style={{ margin: '10px 0 5px 0' }}>{servico.nome}</h4>
              <p style={{ color: '#ab7a5f', fontWeight: 'bold', margin: 0 }}>R$ {servico.preco},00</p>
            </div>
          ))}
        </div>

        {/* PRÓXIMOS ATENDIMENTOS */}
        <h3 style={{ color: '#ab7a5f' }}>Próximos Atendimentos</h3>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          {agendamentos.map(agenda => (
            <div key={agenda._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{agenda.clienteNome}</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#777' }}>{agenda.servico?.nome}</p>
              </div>
              <div style={{ color: '#555' }}>
                🕒 {agenda.horarioInicio} - {agenda.horarioFim}
              </div>
              <div>
                <span style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  {agenda.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;