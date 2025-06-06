import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [paragens, setParagens] = useState([]);
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [passageiros, setPassageiros] = useState(1);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [tripType, setTripType] = useState('ida');
  const [showReturnDate, setShowReturnDate] = useState(false);

  const nav = useNavigate();

  const hoje = new Date().toISOString().split('T')[0];

  const handleSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams({
      origem,
      destino,
      data: data,
      passageiros
    });

    axios.get(`http://localhost:5000/api/v1/procurar/?${params.toString()}`)
      .then((res) => {
        if (res.data && res.data.status === 'success' && res.data.data.length > 0) {
          nav('/reservas/disponiveis', {
            state: {
              resultados: res.data.data,
              pesquisa: { origem, destino, data, passageiros }
            }
          });
        } else {
          setError(res.data.message || "Nenhuma viagem encontrada ou erro na pesquisa.");
        }
      })
      .catch((error) => {
        setError("Erro na ligação à API. " + error.message);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/paragens')
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setParagens(res.data.data);
        } else {
          setError("Ocorreu um erro na execução do pedido.");
        }
      })
      .catch((error) => {
        setError("Erro na ligação à API. " + error.message);
      });
  }, []);

  const handleTripTypeChange = (event) => {
    const value = event.target.value;
    setTripType(value);
    setShowReturnDate(value === 'ida_e_volta');
  };

  return (
    <>
      <img src="/images/banner.jpg" className="img-fluid w-100" alt="..." />
      <main className="container pb-4">
        <div className="container my-5">
          <h2 className="text-center">Planear Viagem</h2>
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              Erro ao tentar encontrar viagens: {error}
            </div>
          )}
          <form id="tripForm" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="d-flex justify-content-center mt-5">
                <div className="form-check form-check-inline me-5">
                  <input className="form-check-input custom-radio-input" type="radio" name="tripType" id="inlineRadio1" value="ida" checked={tripType === 'ida'}
                    onChange={handleTripTypeChange} />
                  <label className="form-check-label custom-radio-label" htmlFor="inlineRadio1">Ida</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input custom-radio-input" type="radio" name="tripType" id="inlineRadio2" value="ida_e_volta" checked={tripType === 'ida_e_volta'}
                    onChange={handleTripTypeChange} />
                  <label className="form-check-label custom-radio-label" htmlFor="inlineRadio2">Ida e volta</label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="origem" className="form-label">De</label>
                <select id="origem" className="form-select" name="origem" value={origem} onChange={(e) => setOrigem(e.target.value)} required>
                  <option value="" disabled>Selecione a origem</option>
                  {paragens.map((paragem) => (
                    <option key={paragem.id_paragem} value={paragem.nome}>{paragem.nome}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="destino" className="form-label">Para</label>
                <select id="destino" className="form-select" name="destino" value={destino} onChange={(e) => setDestino(e.target.value)} required>
                  <option value="" disabled>Selecione a origem</option>
                  {paragens.map((paragem) => (
                    <option key={paragem.id_paragem} value={paragem.nome}>{paragem.nome}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3 align-items-end">
              <div id="departureDateContainer" className={`col-md-${showReturnDate ? 3 : 6}`}>
                <label htmlFor="data" className="form-label">Ida</label>
                <input type="date" className="form-control" id="data" name="data" value={data} onChange={(e) => setData(e.target.value)} min={hoje} required />
              </div>
              <div id="returnDateContainer" className={`col-md-3 ${showReturnDate ? '' : 'd-none'}`}>
                <label htmlFor="returnDate" className="form-label">Volta</label>
                <input type="date" className="form-control" id="returnDate" name="return_date" />
              </div>
              <div className="col-md-6">
                <label htmlFor="passengers" className="form-label">Passageiros</label>
                <input type="number" className="form-control" id="passengers" name="passengers" value={passageiros} onChange={(e) => setPassageiros(e.target.value)} min="1"
                  placeholder="Insira o número de passageiros" required />
              </div>
            </div>
            <button type="submit" className="btn custom-btn w-100">Procurar</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;