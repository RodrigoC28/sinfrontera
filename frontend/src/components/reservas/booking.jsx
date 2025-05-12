import React from 'react';

const CriarReservas = () => {
  return (
  <>
<div className="container my-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <h2 className="text-center">Reservar Viagem</h2>
            <div className="trip-details mb-4">
                <h4 className="mt-4">Detalhes da Viagem</h4>
                <ul className="list-unstyled">
                    <li><strong>De:</strong> Lisboa</li>
                    <li><strong>Para:</strong> Aveiro</li>
                    <li><strong>Data:</strong> 11/05/2025</li>
                    <li><strong>Hora de Partida:</strong> 09:00</li>
                    <li><strong>Hora de Chegada:</strong> 10:00</li>
                    <li><strong>Preço:</strong> 15€</li>
                </ul>
            </div>
            <form method="post" action="/">
                <input type="hidden" name="id_viagem" value="1" />
                <input type="hidden" name="id_utilizador" value="1" />
                <div className="mb-3">
                    <label htmlFor="n_passageiros">Número de Passageiros</label>
                    <input type="number" className="form-control" id="n_passageiros" name="n_passageiros" min="1" max="9" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="mtd_pagamento">Método de Pagamento</label>
                    <select className="form-control" id="mtd_pagamento" name="mtd_pagamento" required>
                        <option value="Cartão de Crédito">Cartão de Débito/Crédito</option>
                        <option value="MB WAY">MB WAY</option>
                        <option value="Paypal">Paypal</option>
                    </select>
                </div>
                <a href="/confirm" className="btn custom-btn w-100">Confirmar Reserva</a>
            </form>
        </div>
    </div>
</div>
  </>
  );
};

export default CriarReservas;