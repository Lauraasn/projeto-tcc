import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from '../Pages/Login';
//import Cadastrar from './components/Cadastrar';
import Home from '../Pages/Home';

const ClientRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default ClientRoutes;
