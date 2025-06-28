import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import IncluirAluno from './components/IncluirAluno'; 
import ListarAlunos from './components/ListarAlunos';
import EditarAluno from './components/EditarAluno';

import './global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/aluno/novo" element={<IncluirAluno />} />
        <Route path="/alunos" element={<ListarAlunos />} />
        <Route path="/aluno/editar/:id" element={<EditarAluno />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
