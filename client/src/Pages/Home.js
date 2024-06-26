import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Collapse, Form, FormGroup, FormLabel, FormControl, Col, Row, Alert, Table } from 'react-bootstrap'
import { TrashFill, PencilSquare } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ nome: '', idade: '', sexo: '', diagnostico: '', observacao: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/clientes');
            setData(response.data);
        } catch (error) {
            console.error('Erro ao coletar dados:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        if (editMode) {
            setEditMode(false);
            setCurrentEditId(null);
            setFormData({ nome: '', idade: '', sexo: '', diagnostico: '', observacao: '' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editMode) {
            try {
                const response = await axios.put(`/clientes/${currentEditId}`, formData);
                console.log('Dados atualizados com sucesso (Client)', response.data);
                setEditMode(false);
                setCurrentEditId(null);
            } catch (error) {
                console.error('Erro ao atualizar dados:', error);
            }
        } else {
            try {
                const response = await axios.post('/clientes', formData);
                console.log('Dados enviados com sucesso (Client)', response.data);
            } catch (error) {
                console.error('Erro ao enviar dados:', error);
            }
        }
        setFormData({ nome: '', idade: '', sexo: '', diagnostico: '', observacao: '' });
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 1500);
        setShowForm(false);
        fetchData();
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        try {
            const response = await axios.delete(`/clientes/${id}`);
            console.log('Cliente deletado com sucesso', response.data);
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
        }
    };

    const handleEdit = async (item, e) => {
        e.stopPropagation();
        setFormData(item);
        setShowForm(true);
        setEditMode(true);
        setCurrentEditId(item.id);
    };

    return (
        <div className="Home">

            <div>
                {showAlert && (
                    <Alert variant="success" className="mt-1">
                        { editMode ? 'Cliente atualizado com sucesso!' : 'Novo cliente enviado com sucesso!' }
                    </Alert>
                )}

                <h1>Página Principal</h1>
                <p>É a página que contém o CRUD</p>

                <Button onClick={toggleForm} variant="primary" className="my-3">
                    {showForm ? 'Cancelar' : 'Novo cliente'}
                </Button>

                <Collapse in={showForm}>
                    <div>
                        <Form className="my-3" onSubmit={handleSubmit}>
                            <FormGroup as={Row} controlId="formHorizontalText">
                                <FormLabel column sm={2}>
                                    Nome
                                </FormLabel>
                                <Col sm={10}>
                                    <FormControl type="text" name="nome" value={formData.nome} onChange={handleInputChange} placeholder="Fulano da Silva" />
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} controlId="formHorizontalText">
                                <FormLabel column sm={2}>
                                    Idade
                                </FormLabel>
                                <Col sm={10}>
                                    <FormControl type="number" name="idade" value={formData.idade} onChange={handleInputChange} placeholder="30" />
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} controlId="formHorizontalText">
                                <FormLabel column sm={2}>
                                    Sexo
                                </FormLabel>
                                <Col sm={10}>
                                    <FormControl type="text" name="sexo" value={formData.sexo} onChange={handleInputChange} placeholder="M" />
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} controlId="formHorizontalText">
                                <FormLabel column sm={2}>
                                    Diagnóstico
                                </FormLabel>
                                <Col sm={10}>
                                    <FormControl type="text" name="diagnostico" value={formData.diagnostico} onChange={handleInputChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} controlId="formHorizontalText">
                                <FormLabel column sm={2}>
                                    Observação
                                </FormLabel>
                                <Col sm={10}>
                                    <FormControl type="text" name="observacao" value={formData.observacao} onChange={handleInputChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row}>
                                <Col sm={{span: 10, offset: 2}}>
                                    <Button className="mt-2" type="submit">{editMode ? 'Atualizar' : 'Enviar'}</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </Collapse>

                <Table hover>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Nome</th>
                            <th scope="col">Idade</th>
                            <th scope="col">Sexo</th>
                            <th scope="col">Diagnóstico</th>
                            <th scope="col">Observações</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} onClick={() => navigate(`/clientes/${item.id}`)}>
                                <th scope="row"></th>
                                <td>{item.nome}</td>
                                <td>{item.idade}</td>
                                <td>{item.sexo}</td>
                                <td>{item.diagnostico}</td>
                                <td>{item.observacao}</td>
                                <td>
                                    <Button variant="success" className="mx-1" onClick={(e) => handleEdit(item, e)}> <PencilSquare /> </Button>
                                    <Button variant="danger" className="mx-1" onClick={(e) => handleDelete(item.id, e)}> <TrashFill /> </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Home;