import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Collapse, Form, FormGroup, FormLabel, FormControl, Col, Row, Alert, Table } from 'react-bootstrap'
import { TrashFill, PencilSquare } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ nome: '', idade: '', sexo: '', diagnostico: '', observacao: '' });
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/clientes');
                setData(response.data);
            } catch (error) {
                console.error('Erro ao coletar dados:', error);
            }
        };

        fetchData();

    }, []);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/clientes', formData);
            console.log('Dados enviados com sucesso (Client)', response.data);
            setFormData({ nome: '', idade: '', sexo: '', diagnostico: '', observacao: '' });
            setShowAlert(true);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    const navigate = useNavigate();

    return (
        <div className="Home">

            <div>
                {showAlert && (
                    <Alert variant="success" className="mt-1">
                        Novo cliente enviado com sucesso!
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
                                    <Button className="mt-2" type="submit">Enviar</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </Collapse>

                <Table hover>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Idade</th>
                            <th scope="col">Sexo</th>
                            <th scope="col">Diagnóstico</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} onClick={() => navigate('/login')}>
                                <th scope="row" key={item.id}>{item.id}</th>
                                <td key={item.id}>{item.nome}</td>
                                <td key={item.id}>{item.idade}</td>
                                <td key={item.id}>{item.sexo}</td>
                                <td key={item.id}>{item.diagnostico}</td>
                                <td key={item.id}>{item.observacao}</td>
                                <td>
                                    <Button variant="success" className="mx-1"> <PencilSquare /> </Button>
                                    <Button variant="danger" className="mx-1"> <TrashFill /> </Button>
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