const handleNovoAgendamento = async (e) => {
    e.preventDefault();

    const novoAgendamentoDados = {
      clienteNome,
      servico: { nome: servicoSelecionado },
      horarioInicio,
      horarioFim
    };

    try {
      // Envia os dados para salvar de verdade no MongoDB através do backend
      const response = await api.post('/api/agendamentos', novoAgendamentoDados);
      
      // Se deu certo, adiciona o retorno do banco na tela e limpa os campos
      setAgendamentos([...agendamentos, response.data]);
      setClienteNome('');
      setHorarioInicio('');
      setHorarioFim('');
      alert('Agendamento realizado e salvo com sucesso! ♡');
    } catch (err) {
      console.error("Erro ao salvar agendamento:", err);
      alert('Ocorreu um erro ao salvar o agendamento no servidor.');
    }
  };

  export default App;