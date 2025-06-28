import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import ListarAlunos from './components/ListarAlunos';
import IncluirAluno from './components/IncluirAluno';
import EditarAluno from './components/EditarAluno';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/alunos" element={<ListarAlunos />} />
                <Route path="/aluno/novo" element={<IncluirAluno />} />
                <Route path="/aluno/editar/:id" element={<EditarAluno />} />
            </Routes>
        </BrowserRouter>
    );
}
