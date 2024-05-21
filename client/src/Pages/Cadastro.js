import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, FormControl, FormLabel, Col, Row } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Cadastro = () => {
    const [formData, setFormData] = useState({ email: '', senha: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/cadastro', formData);
            console.log('Cadastrado com sucesso:', response.data);
            setFormData({ email: '', senha: ''});
            navigate('/home');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    };

    return (
        <div className="Cadastro">
            <h1>Página de Cadastro</h1>
            <p>Já possui uma conta? Entre <Link to='/'>aqui</Link>. </p>

            <Form className="my-3" onSubmit={handleSubmit}>
                <FormGroup as={Row} controlId="formHorizontalEmail">
                    <FormLabel column sm={2}>
                        E-mail
                    </FormLabel>
                    <Col sm={5}>
                        <FormControl type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="exemplo@email.com"/>
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="formHorizontalPassword">
                    <FormLabel column sm={2}>
                        Senha
                    </FormLabel>
                    <Col sm={5}>
                        <FormControl type="password" name="senha" value={formData.senha} onChange={handleInputChange} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                    <Col sm={{span: 10, offset:2}}>
                        <Button className="mt-2" type="submit">Cadastrar</Button>
                    </Col>
                </FormGroup>
            </Form>
            
        </div>
    );

};

export default Cadastro;