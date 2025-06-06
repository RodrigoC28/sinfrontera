import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const CriarReservas = () => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { token } = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem('user'));
    const nav = useNavigate();
    const location = useLocation();

    const { viagemDetalhes, pesquisaOriginal } = location.state || { viagemDetalhes: null, pesquisaOriginal: {} };
    const [viagem] = useState(viagemDetalhes);

    const [n_passageiros, setNumPassageiros] = useState(pesquisaOriginal?.passageiros || 1);
    const [mtd_pagamento, setMetodoPagamento] = useState('Cartão de Crédito');
    const desconto = 0;

    const precoViagem = parseFloat(viagem.preco_viagem || viagem.preco || 0);
    const precoTotalEstimado = (precoViagem * parseFloat(n_passageiros || 0)).toFixed(2);
    const maxPassageirosInput = viagem.lugares_disponiveis_na_viagem !== undefined ? viagem.lugares_disponiveis_na_viagem : (viagem.autocarro?.capacidade || 1);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/v1/viagens/${viagem.id_viagem}/utilizadores/${user.id}`, { mtd_pagamento, desconto, n_passageiros }, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        })
            .then((res) => {
                setSuccess(true);
                setTimeout(() => {
                    nav("/reservas/confirmacao", {
                        state: {
                            reservaDetalhes: res.data.data,
                            viagemInfo: viagem,
                            pesquisaInfo: pesquisaOriginal
                        }
                    });
                }, 1500);
            })
            .catch((error) => setError(error.response?.data?.message || "Erro ao comprar viagem."));
    }

    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-7">
                        <div className="card shadow-lg">
                            <div className="card-header bg-secondary text-white">
                                <h2 className="text-center mb-0">Reservar Viagem</h2>
                            </div>
                            <div className="card-body p-4">
                                {success && (
                                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                                        Viagem comprada com sucesso!
                                        <button type="button" className="btn-close" onClick={() => setSuccess(false)} aria-label="Close"></button>
                                    </div>
                                )}

                                {error && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        Erro ao tentar comprar viagem: {error}
                                        <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
                                    </div>
                                )}

                                <div className="trip-details mb-4 p-3 border rounded bg-light">
                                    <h4 className="mt-0 mb-3">Detalhes da Viagem</h4>
                                    <ul className="list-unstyled">
                                        <li><strong>Viagem:</strong> {viagem.id_viagem}</li>
                                        <li><strong>De:</strong> {pesquisaOriginal.origem}</li>
                                        <li><strong>Para:</strong> {pesquisaOriginal.destino}</li>
                                        <li><strong>Data:</strong> {formatarData(viagem.data_viagem)}</li>
                                        <li><strong>Partida:</strong> {formatarHora(viagem.hora_partida_efetiva)}</li>
                                        <li><strong>Chegada:</strong> {formatarHora(viagem.hora_chegada_efetiva)}</li>
                                        <li><strong>Preço por Passageiro:</strong> {precoViagem.toFixed(2)}€</li>
                                        <li><strong>Autocarro:</strong> {viagem.autocarro?.matricula || 'N/A'}</li>
                                        <li><strong>Lugares Disponíveis (aprox.):</strong> {maxPassageirosInput}</li>
                                    </ul>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="n_passageiros" className="form-label">Número de Passageiros:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="n_passageiros"
                                            name="n_passageiros"
                                            value={n_passageiros}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value, 10);
                                                if (e.target.value === "") {
                                                    setNumPassageiros("");
                                                } else if (val >= 1 && val <= maxPassageirosInput) {
                                                    setNumPassageiros(val);
                                                } else if (val < 1) {
                                                    setNumPassageiros(1);
                                                } else if (val > maxPassageirosInput) {
                                                    setNumPassageiros(maxPassageirosInput);
                                                }
                                            }}
                                            min="1"
                                            max={maxPassageirosInput}
                                            required
                                        />
                                        <div className="form-text">
                                            Máximo de {maxPassageirosInput} lugares disponíveis.
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="mtd_pagamento" className="form-label">Método de Pagamento:</label>
                                        <select
                                            className="form-select"
                                            id="mtd_pagamento"
                                            name="mtd_pagamento"
                                            value={mtd_pagamento}
                                            onChange={(e) => setMetodoPagamento(e.target.value)}
                                            required>
                                            <option value="Cartão de Crédito">Cartão de Débito/Crédito</option>
                                            <option value="MB WAY">MB WAY</option>
                                            <option value="Paypal">Paypal</option>
                                        </select>
                                    </div>

                                    <div className="text-end my-3">
                                        <h4>Preço Total Estimado: <span className="text-success fw-bold">{precoTotalEstimado}€</span></h4>
                                    </div>

                                    <button type="submit" className="btn custom-btn w-100 btn-lg">
                                        Confirmar Reserva
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CriarReservas;