import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

export default function IncluirAluno() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');

    async function handleIncluirAluno(e) {
        e.preventDefault();
        
        if (!nome || !email || !idade) {
            alert('Por favor, preenche todos os campos!');
            return;
        }

        if (parseInt(idade) <= 0) {
            alert('A idade deve ser maior que zero!');
            return;
        }

        setLoading(true);

        const data = {
            nome,
            email,
            idade: parseInt(idade)
        };

        try {
            api.defaults.headers.authorization = `Bearer ${token}`;
            await api.post('/alunos', data);
            
            alert('Aluno registado com sucesso!');
            navigate('/alunos');
            
        } catch (error) {
            if (error.response?.status === 401) {
                alert('Sessão expirada. Faz login novamente.');
                navigate('/');
            } else {
                alert('Erro ao registar aluno. Verifica os dados.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="incluir-aluno-container">
            <div className="content">
                <section>
                    <h1>Incluir Novo Aluno</h1>
                    <p>Preenche os dados do aluno e clica em 'Registar'.</p>
                    
                    <Link className="back-link" to="/alunos">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar à lista
                    </Link>
                </section>
                
                <form onSubmit={handleIncluirAluno}>
                    <input 
                        type="text"
                        placeholder="Nome do aluno"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        disabled={loading}
                    />
                    
                    <input 
                        type="email"
                        placeholder="E-mail do aluno"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    
                    <input 
                        type="number"
                        placeholder="Idade"
                        min="1"
                        max="120"
                        value={idade}
                        onChange={e => setIdade(e.target.value)}
                        disabled={loading}
                    />
                    
                    <button 
                        className="button" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'A registar...' : 'Registar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
