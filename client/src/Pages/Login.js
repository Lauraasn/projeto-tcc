import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', {username, password});
            console.log('Logado com sucesso:', response.data);
        } catch (error) {
            setError('Username ou senha inválida');
            console.error('Erro no Login:', error);
        }
    };

    return (
        <div className="Login">
            <h1>Página de Login</h1>
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;