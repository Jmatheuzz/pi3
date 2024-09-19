import React, { useState } from 'react';
import { InputField, Button, Footer } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import {login} from "../../services/user-service.js";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const  navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if(!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if(!validateEmail(email)) {
      setError('Email inválido.');
      return;
    }
    const {data} = await login({email, password})
    window.localStorage.setItem('id', data.userId)
    window.localStorage.setItem('token', data.token)
    window.localStorage.setItem('email', email)
    setError('');
    setLoading(true);

    try {
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  /* FORÇAR NAVEGAÇÃO TEMPORARIA
  const handleSkipLogin = () => {
    navigate('/home');
  };
  */
  /* Adicionar apos o botão login
  <Button type="button" onClick={handleSkipLogin}>
    Pular Login (Teste)
  </Button>
  */
 
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <InputField
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />
          <InputField
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Senha"
          />
          {error && <p className="error-message">{error}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Login'}  
          </Button>
          
          <div className="register-link">
            <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;