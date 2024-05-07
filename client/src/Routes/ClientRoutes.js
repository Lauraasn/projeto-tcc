import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from '../Pages/Login';
import Cadastro from '../Pages/Cadastro';
import Home from '../Pages/Home';

const ClientRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/" element={<Home />} />
                <Route exact path="/cadastro" element={<Cadastro />} />
            </Routes>
        </Router>
    );
};

export default ClientRoutes;
