import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const ListarViagens = () => {
    const [viagens, setViagens] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { token } = useContext(AuthContext);

    // Estados para o modal de delete
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [viagemIdToDelete, setViagemIdToDelete] = useState(null);

    const formatarDataHora = (dataISO) => {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    };

    const formatarData = (dataISO) => {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const formatarHora = (horaString) => {
        return horaString.substring(0, 5);
    };

    const handleAbrirModalDelete = (id) => {
        setViagemIdToDelete(id);
        setShowDeleteModal(true);
        setError('');
        setSuccess(false);
    };

    const handleFecharModalDelete = () => {
        setShowDeleteModal(false);
        setViagemIdToDelete(null);
    };

    const deleteViagem = (id) => {
        axios.delete(`http://localhost:5000/api/v1/viagem/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        })
            .then((res) => {
                if (res.status === 204) {
                    setSuccess(true);
                    setViagens((prevViagens) =>
                        prevViagens.filter((viagem) => viagem.id_viagem !== viagemIdToDelete)
                    );
                } else {
                    setError("Ocorreu um erro ao eliminar o viagem.");
                }
                handleFecharModalDelete();
            })
            .catch((error) => {
                setError("Erro na ligação à API. " + error.message);
            })
    };

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/v1/viagens", {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status) {
                    setViagens(res.data.data);
                } else {
                    setError("Ocorreu um erro na execução do pedido.");
                }
            })
            .catch((error) => {
                setError("Erro na ligação à API. " + error.message);
            });
    }, [token]);
    return (
        <>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Lista de Viagens</h2>
                    <Link to="/viagens/criar" className="btn custom-btn">
                        <i className="fas fa-plus me-2"></i>Criar Nova Viagem
                    </Link>
                </div>

                {success && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        Viagem eliminada com sucesso!
                        <button type="button" className="btn-close" onClick={() => setSuccess(false)} aria-label="Close"></button>
                    </div>
                )}

                {error && showDeleteModal && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        Erro ao tentar apagar viagem: {error}
                        <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
                    </div>
                )}

                {viagens.length === 0 ? (
                    <div className="alert alert-info" role="alert">
                        Não existem viagens para mostrar.
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Autocarro</th>
                                    <th scope="col">Paragens</th>
                                    <th scope="col">Data da Viagem</th>
                                    <th scope="col">Hora de Partida</th>
                                    <th scope="col">Hora de Chegada</th>
                                    <th scope="col">Preço</th>
                                    <th scope="col" className="text-center">Data de registo</th>
                                    <th scope="col" className="text-center">Data da última atualização</th>
                                    <th scope="col" className="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viagens.map((viagem) => (
                                    <tr key={viagem.id_viagem}>
                                        <td scope="row">{viagem.id_viagem}</td>
                                        <td>{viagem.autocarro.matricula}</td>
                                        <td>
                                            {viagem.paragens && viagem.paragens.length > 0 ? (
                                                <ul className="list-unstyled mb-0 small">
                                                    {[...viagem.paragens]
                                                        .sort((paragemA, paragemB) => {
                                                            const horaA = paragemA.viagem_paragem.hora;
                                                            const horaB = paragemB.viagem_paragem.hora;
                                                            return horaA.localeCompare(horaB);
                                                        })
                                                        .map(paragem => (
                                                            <li key={paragem.id_paragem}>
                                                                {paragem.nome}
                                                                {` (${formatarHora(paragem.viagem_paragem.hora)})`}
                                                            </li>
                                                        ))}
                                                </ul>
                                            ) : 'Nenhuma'}
                                        </td>
                                        <td>{formatarData(viagem.data)}</td>
                                        <td>{formatarHora(viagem.hora_partida)}</td>
                                        <td>{formatarHora(viagem.hora_chegada)}</td>
                                        <td>{viagem.preco}€</td>
                                        <td className="text-center">{formatarDataHora(viagem.dta_registo)}</td>
                                        <td className="text-center">{formatarDataHora(viagem.dta_atualizacao)}</td>
                                        <td className="text-center">
                                            <Link
                                                to={`/viagens/editar/${viagem.id_viagem}`}
                                                className="btn btn-sm btn-outline-primary me-1"
                                                title="Editar"
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleAbrirModalDelete(viagem.id_viagem)}
                                                className="btn btn-sm btn-outline-danger"
                                                title="Apagar"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
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
                            <p>Tem a certeza que pretende apagar a viagem com ID: {viagemIdToDelete}? <br />Esta ação não pode ser desfeita.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleFecharModalDelete}>Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={() => deleteViagem(viagemIdToDelete)}>Apagar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListarViagens;