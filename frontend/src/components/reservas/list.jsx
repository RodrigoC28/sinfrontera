import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const ListarViagensDisponiveis = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const initialState = { resultados: [], pesquisa: {} };
    const { resultados: initialResultados, pesquisa } = location.state || initialState;

    const resultados = Array.isArray(initialResultados) ? initialResultados : [];

    const formatarHora = (horaString) => {
        return horaString.substring(0, 5);
    };

    const formatarData = (dataISO) => {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const handleSelecionarViagem = (viagem) => {
        console.log("ListarViagensDisponiveis - Viagem selecionada (deve ter origem_nome, destino_nome):", viagem);
        console.log("ListarViagensDisponiveis - Objeto 'pesquisa' a ser passado:", pesquisa);
        navigate(`/reservas/booking/${viagem.id_viagem}`, {
            state: {
                viagemDetalhes: viagem,
                pesquisaOriginal: pesquisa,
            }
        });
    };

    return (
        <>
            <div className="container mt-5 mb-5">
                <h2 className="mb-4">Viagens Disponíveis: {pesquisa.origem} para {pesquisa.destino}</h2>
                <p className="lead">Data: {formatarData(pesquisa.data)} | Passageiros: {pesquisa.passageiros}</p>
                {resultados.length === 0 ? (
                    <div className="alert alert-info text-center">
                        Não tem nenhuma viagem reservada de momento. <Link to="/">Procurar viagens</Link>.
                    </div>
                ) : (
                    <div>
                        {resultados.map((viagem) => (
                            <div className="card mb-4 shadow-sm" key={viagem.id_viagem}>
                                <div className="card-header bg-secondary text-white">
                                    <h5 className="mb-0">Viagem #{viagem.id_viagem} - Matrícula: {viagem.autocarro?.matricula || 'N/A'}</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <p><strong>Partida de {pesquisa.origem}:</strong> {formatarHora(viagem.hora_partida_efetiva)}</p>
                                            <p><strong>Chegada a {pesquisa.destino}:</strong> {formatarHora(viagem.hora_chegada_efetiva)}</p>
                                            <p><strong>Preço por passageiro:</strong> {viagem.preco_viagem}€</p>
                                            <p><strong>Lugares Disponíveis nesta Viagem:</strong> {viagem.lugares_disponiveis_na_viagem}</p>
                                        </div>
                                        <div className="col-md-4 text-md-end align-self-center">
                                            <h4 className="text-success mb-3">Total: {(parseFloat(viagem.preco_viagem) * pesquisa.passageiros).toFixed(2)}€</h4>
                                            <button
                                                onClick={() => handleSelecionarViagem(viagem)}
                                                className="btn btn-lg custom-btn w-100"
                                            >
                                                Selecionar Viagem
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                    <h6>Itinerário Completo:</h6>
                                    <ul className="list-group list-group-flush">
                                        {viagem.paragens_da_rota_completa && viagem.paragens_da_rota_completa.map((paragem, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                {paragem.nome}
                                                <span className="badge bg-secondary rounded-pill">{formatarHora(paragem.hora)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                        <div className="text-center mt-4">
                            <Link to="/" className="btn btn-outline-secondary">Nova Pesquisa</Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ListarViagensDisponiveis;