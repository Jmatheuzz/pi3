import React, { useState } from 'react';
import { InputField, Button, Footer } from '../../components'; 
import { Link } from 'react-router-dom';
import './Register.css';
import {createUser} from "../../services/user-service";

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Nome é obrigatório';
    if (!surname) newErrors.surname = 'Sobrenome é obrigatório';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email inválido';
    if (!password) newErrors.password = 'Senha é obrigatória';
    return newErrors;
  };

  const handleRegister = async () => {
    const validateErrors = validateFields();
    if (Object.keys(validateErrors).length === 0) {
      console.log('Cadastro:0', { name, surname, email, password});
      await createUser({ name, surname, email, passwordHash: password})
    } else {
      setErrors(validateErrors);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Cadastro</h1>
        <form className="register-form">
          <InputField
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nome"
            error={errors.name}
          />
          <InputField
            id="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            label="Sobrenome"
            error={errors.surname}
          />
          <InputField
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            error={errors.email}
          />
          <InputField
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Senha"
            error={errors.password}
          />
          <Button type="button" onClick={handleRegister}>
            Cadastrar
          </Button>
          <div className="login-link">
            <p>Já tem uma conta? <Link to="/">Faça login</Link></p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
