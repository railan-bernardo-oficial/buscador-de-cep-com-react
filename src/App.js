
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [result, setResult] = useState({});

  async function handleSearch() {

    if (input === '') {
      alert('Digite um CEP para buscar');
      return;
    }

    try {

      const response = await api.get(`${input}/json`);
      setResult(response.data);
      setInput('');

    } catch (error) {
      alert('Erro ao buscar CEP');
      setInput('');
    }

  }

  return (
    <div className="container">
      <h1 className='title'>Buscador de CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='submit'
          onClick={handleSearch}>
          <FiSearch size={26} color="#FFF" />
        </button>
      </div>

      {Object.keys(result).length > 0 && (
 <div className="containerResult">
 <h2 className='titleResult'>CEP: {result.cep}</h2>
 <span>Cidade: {result.localidade} - {result.uf}</span>
 <span>Rua: {result.logradouro}</span>
 <span>Bairro: {result.bairro}</span>
 <span>Complemento: {result.complemento} </span>
</div>
)};
     
    </div>
  );
}

export default App;
