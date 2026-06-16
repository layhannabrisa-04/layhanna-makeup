import { useState } from 'react';
import api from '../../services/api';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // AJUSTE: Adicionado o /api antes de /auth/login
      const response = await api.post('/api/auth/login', { email, senha });
      alert(response.data.mensagem);
      onLoginSuccess(); // Entra no painel se tudo estiver certo
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao tentar realizar o login');
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
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '10px', width: '280px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontSize: '14px', color: '#333' }}>Senha:</label><br />
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required style={{ padding: '10px', width: '280px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
          
          <button type="submit" style={{ padding: '12px', backgroundColor: '#e2b49a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
            Acessar Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}