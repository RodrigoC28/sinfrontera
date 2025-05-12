import React from 'react';

const ListarReservas = () => {
  return (
  <>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-8"> <h2 class="text-center mb-4">Minhas Viagens</h2>
                <div class="card mb-3">
                    <div class="card-header">
                        <h4 class="mb-0">
                            Lisboa - Aveiro
                        </h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Data:</strong> 25/10/2025</p>
                                <p><strong>Hora de Partida:</strong> 09:00</p>
                                <p><strong>Hora de Chegada:</strong> 10:00</p>
                                <p><strong>Preço:</strong> 30€</p>
                                <p><strong>Passageiros:</strong> 2</p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Método de Pagamento:</strong> MB WAY</p>
                                <p><strong>Data da Reserva:</strong> 11/05/2025</p>
                                <p><strong>Autocarro Nº:</strong> 1</p>
                                <p>
                                    <strong>Paragens:</strong>
                                    <ul class="mb-2">
                                        <li>Lisboa</li>
                                        <li>Coimbra</li>
                                        <li>Aveiro</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </>
  );
};

export default ListarReservas;