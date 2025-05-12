import React from 'react';

const ListarViagensDisponiveis = () => {
  return (
  <>
<div className="container my-5">
    <h2 className="text-center mb-4">Viagens Disponiveis</h2>
    <div className="row">
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Lisboa - Aveiro</h5>
                  <p className="card-text">
                    <strong>Data:</strong> 11/05/2025<br />
                    <strong>Hora de Partida:</strong> 09:00<br />
                    <strong>Hora de Chegada:</strong> 10:00<br />
                    <strong>Preço:</strong> 15€
                  </p>
                    <div>
                      <strong>Paragens:</strong>
                      <ul className="mb-2">
                        <li>Lisboa</li>
                        <li>Coimbra</li>
                        <li>Aveiro</li>
                      </ul>
                    </div>
                    <a href="/booking" className="btn custom-btn w-100">Reservar</a>
                </div>
              </div>
            </div>
    </div>
</div>
  </>
  );
};

export default ListarViagensDisponiveis;