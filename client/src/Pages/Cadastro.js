import React from 'react';
import {Button, Form, FormGroup, FormControl, FormLabel, Col, Row} from 'react-bootstrap';

const Cadastro = () => {


    return (
        <div className="Cadastro">
            <h1>Página de Cadastro</h1>

            <Form>
                <FormGroup as={Row} controlId="formHorizontalText">
                    <FormLabel column sm={2}>
                        E-mail
                    </FormLabel>
                    <Col sm={10}>
                        <FormControl type="email" name="email" placeholder="exemplo@email.com"/>
                    </Col>
                </FormGroup>

                <FormGroup as={Row} controlId="formHorizontalText">
                    <FormLabel column sm={2}>
                        Senha
                    </FormLabel>
                    <Col sm={10}>
                        <FormControl type="password" name="senha" />
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