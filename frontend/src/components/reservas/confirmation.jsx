import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ViagemComprada = () => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    const { reservaDetalhes, viagemInfo, pesquisaInfo } = location.state || {};

    const formatarData = (dataISO) => {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const precoPorPassageiro = parseFloat(viagemInfo.preco_viagem || viagemInfo.preco || 0);
    const numPassageiros = reservaDetalhes.n_passageiros || pesquisaInfo?.passageiros || 0;
    const precoTotal = (precoPorPassageiro * numPassageiros).toFixed(2);

    const dataDaCompra = reservaDetalhes.dta_registo || new Date().toISOString();

    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <div className="mb-4">
                            <i className="fas fa-check-circle fa-4x text-success"></i>
                        </div>
                        <h1 className="display-4 text-success">Compra Concluída com Sucesso!</h1>
                        <p className="lead">Obrigado pela sua compra! A sua reserva foi registada no sistema.</p>

                        <div className="card mt-4 shadow-sm">
                            <div className="card-header">
                                <h4>Detalhes da Reserva</h4>
                            </div>
                            <div className="card-body text-start">
                                <p><strong>Viagem:</strong> {pesquisaInfo.origem} para {pesquisaInfo.destino}</p>
                                <p><strong>Data da Viagem:</strong> {formatarData(viagemInfo.data_viagem)}</p>
                                <p><strong>Número de Passageiros:</strong> {numPassageiros}</p>
                                <hr />
                                <p><strong>Data da Compra:</strong> {formatarData(dataDaCompra)}</p>
                                <p><strong>Método de Pagamento:</strong> {reservaDetalhes.mtd_pagamento}</p>
                                <p><strong>Valor Total:</strong> {precoTotal}€</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link to={`/reservas/${user.id}`} className="btn custom-btn btn-lg">Ver Minhas Reservas</Link>
                            <Link to="/" className="btn btn-outline-secondary btn-lg ms-2">Página Inicial</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViagemComprada;