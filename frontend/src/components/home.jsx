// src/pages/Home.js
import React, { useState } from 'react';

const Home = () => {
    const [tripType, setTripType] = useState('ida');
    const [showReturnDate, setShowReturnDate] = useState(false);
  
    const handleTripTypeChange = (event) => {
        const value = event.target.value;
        setTripType(value);
        setShowReturnDate(value === 'ida_e_volta');
    };
    return (
    <>
      <img src="/images/banner.jpeg" className="img-fluid w-100" alt="..." />
      <main className="container pb-4">
        <div className="container my-5">
          <h2 className="text-center">Planear Viagem</h2>
          <form id="tripForm" method="get" action="">
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
                <select id="origem" className="form-select" name="origem" required>
                  <option defaultValue>Lisboa</option>
                  <option>Porto</option>
                  <option>Coimbra</option>
                  <option>Madrid</option>
                  <option>Vilar Formoso</option>
                  <option>Salamanca</option>
                  <option>Saragoça</option>
                  <option>Barcelona</option>
                  <option>Viseu</option>
                  <option>Vilar Formoso</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="destino" className="form-label">Para</label>
                <select id="destino" className="form-select" name="destino" required>
                  <option>Lisboa</option>
                  <option defaultValue>Porto</option>
                  <option>Coimbra</option>
                  <option>Madrid</option>
                  <option>Lisboa</option>
                  <option>Salamanca</option>
                  <option>Saragoça</option>
                  <option>Barcelona</option>
                  <option>Viseu</option>
                  <option>Vilar Formoso</option>
                </select>
              </div>
            </div>
            <div className="row mb-3 align-items-end">
                <div id="departureDateContainer" className={`col-md-${showReturnDate ? 3 : 6}`}>
                <label htmlFor="data" className="form-label">Ida</label>
                <input type="date" className="form-control" id="data" name="data" required />
                </div>
                <div id="returnDateContainer" className={`col-md-3 ${showReturnDate ? '' : 'd-none'}`}>
                <label htmlFor="returnDate" className="form-label">Volta</label>
                <input type="date" className="form-control" id="returnDate" name="return_date" required/>
                </div>
              <div className="col-md-6">
                <label htmlFor="passengers" className="form-label">Passageiros</label>
                <input type="number" className="form-control" id="passengers" name="passengers" placeholder="Insira o número de passageiros" required />
              </div>
            </div>
            <a href="/reservas/disponiveis" className="btn custom-btn w-100">Procurar</a>
            {/* <button type="submit" className="btn custom-btn w-100">Procurar</button> */}
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;