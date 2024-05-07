import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, FormControl, FormLabel, Col, Row } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', {email, senha});
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

            <Form onSubmit={handleSubmit}>
                <FormGroup as={Row} controlId="formHorizontalText">
                    <FormLabel column sm={2}>
                        E-mail
                    </FormLabel>
                    <Col sm={10}>
                        <FormControl type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemplo@email.com"/>
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="formHorizontalText">
                    <FormLabel column sm={2}>
                        Senha
                    </FormLabel>
                    <Col sm={10}>
                        <FormControl type="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
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