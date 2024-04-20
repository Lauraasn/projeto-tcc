import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  //useEffect(() => {}, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/clientes');
        setData(response.data);
      } catch (err) {
        console.error('Erro ao coletar dados:', err);
      }
    };

    fetchData();

  }, []);

  return (

    <div className="App">
      <h1>Página principal</h1>
      <p>É a página que vai ter o CRUD em si</p>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Ordem</th>
            <th scope="col">Nome</th>
            <th scope="col">Idade</th>
            <th scope="col">Sexo</th>
            <th scope="col">Diagnóstico</th>
            <th scope="col">Observação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <th scope="row" key={item.id}>{item.id}</th>
              <td key={item.id}>{item.nome}</td>
              <td key={item.id}>{item.idade}</td>
              <td key={item.id}>{item.sexo}</td>
              <td key={item.id}>{item.diagnostico}</td>
              <td key={item.id}>{item.observacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
