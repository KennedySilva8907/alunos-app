import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import './styles.css';

export default function EditarAluno() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');

   
    const api = axios.create({
        baseURL: 'https://localhost:7172/api',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
       
        if (!token) {
            navigate('/');
            return;
        }

       
        loadAluno();
    }, [id]);

    async function loadAluno() {
        try {
            setLoadingData(true);
            
            console.log('A carregar aluno ID:', id);
            
            const response = await api.get(`/alunos/${id}`);
            
            console.log('Dados recebidos:', response.data); // Debug
            
            const aluno = response.data;
            setNome(aluno.nome || '');
            setEmail(aluno.email || '');
            setIdade(aluno.idade ? aluno.idade.toString() : '');
            
        } catch (error) {
            console.error('Erro ao carregar aluno:', error);
            
            if (error.response?.status === 401) {
                alert('Sessão expirada. Faça login novamente.');
                navigate('/');
            } else if (error.response?.status === 404) {
                alert('Aluno não encontrado.');
                navigate('/alunos');
            } else {
                alert('Erro ao carregar dados do aluno.');
                navigate('/alunos');
            }
        } finally {
            setLoadingData(false);
        }
    }

    async function handleEditAluno(e) {
        e.preventDefault();
        
        
        if (!nome.trim()) {
            alert('Por favor, introduza o nome do aluno.');
            return;
        }
        
        if (!email.trim()) {
            alert('Por favor, introduza o e-mail do aluno.');
            return;
        }
        
        if (!idade || idade <= 0) {
            alert('Por favor, introduza uma idade válida.');
            return;
        }

       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, introduza um e-mail válido.');
            return;
        }

        setLoading(true);

        try {
            const data = {
                id: parseInt(id),
                nome: nome.trim(),
                email: email.trim(),
                idade: parseInt(idade)
            };

            console.log('A enviar dados:', data); 

           
            await api.put(`/alunos/${id}`, data);
            
            alert('Aluno actualizado com sucesso!');
            navigate('/alunos');
            
        } catch (error) {
            console.error('Erro completo:', error); 
            console.error('Response data:', error.response?.data); 
            console.error('Response status:', error.response?.status); 
            
            if (error.response?.status === 401) {
                alert('Sessão expirada. Faça login novamente.');
                navigate('/');
            } else if (error.response?.status === 400) {
                const errorMsg = error.response?.data?.message || 
                               error.response?.data?.title || 
                               'Dados inválidos. Verifique as informações.';
                alert(`Erro: ${errorMsg}`);
            } else if (error.response?.status === 404) {
                alert('Aluno não encontrado.');
                navigate('/alunos');
            } else {
                alert('Erro ao actualizar aluno. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    }

    if (loadingData) {
        return (
            <div className="editar-aluno-container">
                <div className="content">
                    <h1>A carregar...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="editar-aluno-container">
            <div className="content">
                <section>
                    <h1>Editar Aluno</h1>
                    <p>Atualize os dados do aluno abaixo.</p>
                    
                    <Link className="back-link" to="/alunos">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar à lista
                    </Link>
                </section>
                
                <form onSubmit={handleEditAluno}>
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
                        {loading ? 'A atualizar...' : 'Atualizar aluno'}
                    </button>
                </form>
            </div>
        </div>
    );
}
