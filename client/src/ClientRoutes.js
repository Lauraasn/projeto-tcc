import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// try to add Switch above
import LoginPage from './components/LoginPage';
//import SignInPage from './components/SignInPage';
//import CRUDPage from './components/CRUDPage';

const ClientRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default ClientRoutes;
