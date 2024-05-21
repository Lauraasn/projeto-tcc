import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, FormControl, FormLabel, Col, Row } from 'react-bootstrap';
import {useNavigate, Link} from 'react-router-dom';
import { AuthContext } from '../Utils/Auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, senha });
            console.log('Logado com sucesso:', response.data);
            login();
            navigate('/home');
        } catch (error) {
            setError('Email ou senha inválida (Login.js)');
            console.error('Erro no Login:', error);
        }
    };

    return (
        <div className="Login">
            <h1>Página de Login</h1>
            {error && <p>{error}</p>}

            <p>Não possui conta? Cadastre-se <Link to='/cadastro'>aqui</Link>. </p>

            <Form onSubmit={handleSubmit}>
                <FormGroup as={Row} controlId="formHorizontalEmail">
                    <FormLabel column sm={2}>
                        E-mail
                    </FormLabel>
                    <Col sm={10}>
                        <FormControl type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemplo@email.com"/>
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="formHorizontalPassword">
                    <FormLabel column sm={2}>
                        Senha
                    </FormLabel>
                    <Col sm={10}>
                        <FormControl type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup as={Row}>
                    <Col sm={{span: 10, offset:2}}>
                        <Button className="mt-2" type="submit">Entrar</Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    );
};

export default Login;