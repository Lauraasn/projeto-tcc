import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../Pages/Login';
import Cadastro from '../Pages/Cadastro';
import Home from '../Pages/Home';
import Cliente from '../Pages/Cliente';
//import PrivateRoute from '../Components/PrivateRoute';
import { AuthProvider } from '../Utils/Auth';

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/cadastro" element={<Cadastro />} />
                    <Route exact path="/clientes/:id" element={<Cliente />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRoutes;
