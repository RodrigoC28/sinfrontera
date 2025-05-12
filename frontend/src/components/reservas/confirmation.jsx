import React from 'react';

const ViagemComprada = () => {
  return (
  <>
<div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-8 text-center">
            <div className="mb-4">
                <i className="bi bi-check-circle success-icon"></i>
            </div>
            <h1 className="display-4 text-success">Compra Concluída com Sucesso!</h1>
            <p className="lead">Obrigado por sua compra! A sua compra foi registrado no sistema.</p>

            <div className="card">
                <div className="card-header">
                    <h4>Detalhes da Compra</h4>
                </div>
                <div className="card-body">
                    <p><strong>Viagem:</strong> Lisboa - Aveiro</p>
                    <p><strong>Data de Compra:</strong> 11/05/2025</p>
                    <p><strong>Método de Pagamento:</strong> MB WAY</p>
                    <p><strong>Valor Total:</strong> 30€</p>
                </div>
            </div>
            <div className="mt-4">
                <a href="/reservas" className="btn custom-btn">Ver Minhas Viagens</a>
            </div>
        </div>
    </div>
</div>
  </>
  );
};

export default ViagemComprada;