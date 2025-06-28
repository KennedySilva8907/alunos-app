import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import loginImg from '../../assets/login.png';
import './styles.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            email,
            password
        };

        try {
            const response = await api.post('/account/login', data);
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.email);
            
            navigate('/alunos');
            
        } catch (error) {
            alert('Falha no login. Tenta novamente.');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={loginImg} alt="Login" />
                <form onSubmit={handleLogin}>
                    <h1>Faz o teu login</h1>
                    
                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    
                    <input 
                        type="password"
                        placeholder="Palavra-passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    
                    <button className="button" type="submit">
                        Entrar
                    </button>
                </form>
            </section>
        </div>
    );
}
