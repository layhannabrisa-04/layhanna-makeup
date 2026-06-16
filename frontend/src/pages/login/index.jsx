import { useState } from 'react';
import api from '../../services/api';

export default function Login({ onLoginSuccess }) {
  // Já deixei o e-mail e a senha preenchidos por padrão!
  const [email, setEmail] = useState('admin@gmail.com');
  const [senha, setSenha] = useState('admin123');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/login', { email, senha });
      alert("Login efetuado com sucesso!");
      onLoginSuccess(); 
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao tentar realizar o login');
    }
  };

  // 🛠️ FUNÇÃO TEMPORÁRIA PARA CRIAR A SUA CONTA
  const handleRegister = async () => {
    try {
      // Cria a conta com o admin@gmail.com e admin123
      await api.post('/api/auth/register', { email, senha });
      alert("Conta criada com sucesso! O banco de dados agora conhece você. Clique em Acessar Dashboard.");
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao tentar criar a conta. Talvez ela já exista!');
    }
  };

  return (
    <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#faf6f0' }}>
      <div style={{ display: 'inline-block', backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: '#ab7a5f', marginBottom: '20px' }}>Layhanna.Makeup_</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>Área Administrativa</p>
        
        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          {erro && <p style={{ color: '#c94a4a', fontSize: '14px', marginBottom: '15px' }}>{erro}</p>}
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '14px', color: '#333' }}>E-mail:</label><br />
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{ padding: '10px', width: '280px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }} 
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontSize: '14px', color: '#333' }}>Senha:</label><br />
            <input 
              type="password" 
              value={senha} 
              onChange={e => setSenha(e.target.value)} 
              required 
              style={{ padding: '10px', width: '280px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }} 
            />
          </div>
          
          <button type="submit" style={{ padding: '12px', backgroundColor: '#e2b49a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold', marginBottom: '10px' }}>
            Acessar Dashboard
          </button>

          {/* 🛠️ BOTÃO TEMPORÁRIO PARA SALVAR ESSA SENHA NO BANCO */}
          <button type="button" onClick={handleRegister} style={{ padding: '12px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
            1º Passo: Salvar Senha no Banco
          </button>
        </form>
      </div>
    </div>
  );
}