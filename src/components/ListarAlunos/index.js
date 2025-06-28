import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiEdit3, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

export default function ListarAlunos() {
    const [alunos, setAlunos] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const filteredAlunos = searchInput.length > 0
        ? alunos.filter(aluno => aluno.nome.toLowerCase().includes(searchInput.toLowerCase()))
        : alunos;

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            api.defaults.headers.authorization = `Bearer ${token}`;
            loadAlunos();
        }
    }, []);

    async function loadAlunos() {
        try {
            const response = await api.get('/alunos');
            setAlunos(response.data);
        } catch (error) {
            alert('Erro ao carregar alunos');
            handleLogout();
        }
    }

    async function handleDelete(id, nome) {
        if (!window.confirm(`Tem a certeza que deseja eliminar o aluno ${nome}?`)) {
            return;
        }

        try {
            await api.delete(`/alunos/${id}`);
            setAlunos(alunos.filter(aluno => aluno.id !== id));
            alert('Aluno eliminado com sucesso!');
        } catch (error) {
            alert('Erro ao eliminar aluno');
        }
    }

    function handleLogout() {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className="listar-alunos-container">
            <header>
                <span>Bem-vindo, <strong>{email}</strong>!</span>
                <Link className="button" to="/aluno/novo">
                    Registar novo aluno
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            
            <form>
                <input 
                    type="text"
                    placeholder="Filtrar por nome..."
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                />
            </form>
            
            <h1>Alunos Registados</h1>
            
            {filteredAlunos.length === 0 && searchInput.length > 0 ? (
                <p>Nenhum aluno encontrado com o nome "{searchInput}"</p>
            ) : (
                <ul>
                    {filteredAlunos.map(aluno => (
                        <li key={aluno.id}>
                            <strong>NOME:</strong>
                            <p>{aluno.nome}</p>
                            
                            <strong>EMAIL:</strong>
                            <p>{aluno.email}</p>
                            
                            <strong>IDADE:</strong>
                            <p>{aluno.idade} anos</p>
                            
                            <Link to={`/aluno/editar/${aluno.id}`}>
                                <FiEdit3 size={20} color="#e02041" />
                            </Link>
                            
                            <button 
                                type="button"
                                onClick={() => handleDelete(aluno.id, aluno.nome)}
                            >
                                <FiTrash2 size={20} color="#e02041" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
