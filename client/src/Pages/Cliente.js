import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Cliente = () => {
    const params = useParams();

    const [data, setData] = useState(null);
    const clienteId = params.id;

    useEffect(() => {
        axios.get(`/clientes/${clienteId}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Erro ao coletar cliente", error);
            });
    }, [clienteId]);

    if (!data) return <div>Carregando...</div>;

    return (
        <div>
            <h1>Informações do Cliente</h1>
            <p>Nome: {data.nome}</p>
            <p>Idade: {data.idade}</p>
            <p>Sexo: {data.sexo}</p>
            <p>Diagnóstico: {data.diagnostico}</p>
            <p>Observações: {data.observacao}</p>
        </div>
    );
};

export default Cliente;