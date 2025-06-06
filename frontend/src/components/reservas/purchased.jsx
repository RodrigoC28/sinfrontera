import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext'; // Ajusta o caminho

const ListarReservas = () => {
    const { id } = useParams();
    const [reservas, setReservas] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { token } = useContext(AuthContext);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleAbrirModalDelete = (id_viagem, id_utilizador) => {
        setItemToDelete({ id_viagem: id_viagem, id_utilizador: id_utilizador });
        setShowDeleteModal(true);
        setError('');
        setSuccess(false);
    };

    const handleFecharModalDelete = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

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

    const deleteReserva = (id) => {
        axios.delete(`http://localhost:5000/api/v1/reserva/${itemToDelete.id_viagem}/${itemToDelete.id_utilizador}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        })
            .then((res) => {
                if (res.status === 204) {
                    setSuccess(true);
                    setReservas((prevReservas) =>
                    prevReservas.filter(reserva => 
                            !(reserva.id_viagem === itemToDelete.id_viagem && reserva.id_utilizador === itemToDelete.id_utilizador)
                        )
                    );
                } else {
                    setError("Ocorreu um erro ao eliminar o condutor.");
                }
                handleFecharModalDelete();
            })
            .catch((error) => {
                setError("Erro na ligação à API. " + error.message);
            })
    };

    useEffect(() => {
        if (id && token) {
            axios.get(`http://localhost:5000/api/v1/minhas-viagens/${id}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
                .then((res) => {
                    setReservas(res.data.data);
                })
                .catch(() => setError("Erro ao carregar dados do viagem."));
        }
    }, [id, token]);

    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <h2 className="text-center mb-4">Minhas Reservas de Viagens</h2>
                        {success && (
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                Viagem cancelada com sucesso!
                                <button type="button" className="btn-close" onClick={() => setSuccess(false)} aria-label="Close"></button>
                            </div>
                        )}

                        {error && showDeleteModal && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                Erro ao tentar cancelar a viagem: {error}
                                <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
                            </div>
                        )}

                        {reservas.length === 0 ? (
                            <div className="alert alert-info text-center">
                                Não tem nenhuma viagem reservada de momento. <Link to="/">Procurar viagens</Link>.
                            </div>
                        ) : (
                            reservas.map(reserva => (
                                reserva.viagem && (
                                    <div className="card mb-4 shadow-sm" key={`${reserva.id_viagem}-${reserva.id_utilizador}`}>
                                        <div className="card-header">
                                            <h4 className="mb-0">
                                                {reserva.viagem.paragens && reserva.viagem.paragens.length > 0 ?
                                                    `${reserva.viagem.paragens[0].nome} - ${reserva.viagem.paragens[reserva.viagem.paragens.length - 1].nome}`
                                                    : 'Detalhes da Viagem'
                                                }
                                                <span className="float-end small text-muted">Viagem #{reserva.id_viagem}</span>
                                            </h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p><strong>Data da Viagem:</strong> {formatarData(reserva.viagem.data)}</p>
                                                    <p><strong>Partida:</strong> {formatarHora(reserva.viagem.hora_partida)}</p>
                                                    <p><strong>Chegada:</strong> {formatarHora(reserva.viagem.hora_chegada)}</p>
                                                    <p><strong>Preço (por passageiro):</strong> {parseFloat(reserva.viagem.preco).toFixed(2)}€</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><strong>Data da Reserva:</strong> {formatarData(reserva.dta_registo)}</p>
                                                    <p><strong>Nº de Passageiros:</strong> {reserva.n_passageiros}</p>
                                                    <p><strong>Método de Pagamento:</strong> {reserva.mtd_pagamento}</p>
                                                    <p><strong>Autocarro:</strong> {reserva.viagem.autocarro?.matricula || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer bg-light">
                                            {reserva.viagem.data > new Date().toISOString().split('T')[0] ? (
                                                <button
                                                    onClick={() => handleAbrirModalDelete(reserva.id_viagem, reserva.id_utilizador)}
                                                    className="btn btn-sm btn-outline-danger">Cancelar Reserva</button>
                                            ) : (
                                                <small className="text-muted">O cancelamento já não está disponível para esta viagem.</small>
                                            )}
                                        </div>
                                    </div>
                                )
                            ))
                        )}
                    </div>
                </div>
                <div
                    className={`modal fade ${showDeleteModal ? 'show d-block' : ''}`}
                    tabIndex="-1"
                    style={{ backgroundColor: showDeleteModal ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar Apagar</h5>
                                <button type="button" className="btn-close" onClick={handleFecharModalDelete} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Tem a certeza que pretende cancelar a sua viagem? <br /> (Viagem ID: {itemToDelete?.id_viagem}) <br />Esta ação não pode ser desfeita.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleFecharModalDelete}>Cancelar</button>
                                <button type="button" className="btn btn-danger" onClick={() => deleteReserva(itemToDelete)}>Apagar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListarReservas;