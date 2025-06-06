import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const ListarParagens = () => {
    const [paragens, setParagens] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { token } = useContext(AuthContext);

    // Estados para o modal de delete
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [paragemIdToDelete, setParagemIdToDelete] = useState(null);

    const formatarDataHora = (dataISO) => {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    };

    const handleAbrirModalDelete = (id) => {
        setParagemIdToDelete(id);
        setShowDeleteModal(true);
        setError('');
        setSuccess(false);
    };

    const handleFecharModalDelete = () => {
        setShowDeleteModal(false);
        setParagemIdToDelete(null);
    };

    const deleteParagem = (id) => {
        axios.delete(`http://localhost:5000/api/v1/paragem/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        })
            .then((res) => {
                if (res.status === 204) {
                    setSuccess(true);
                    setParagens((prevParagens) =>
                        prevParagens.filter((paragem) => paragem.id_paragem !== paragemIdToDelete)
                    );
                } else {
                    setError("Ocorreu um erro ao eliminar o paragem.");
                }
                handleFecharModalDelete();
            })
            .catch((error) => {
                setError("Erro na ligação à API. " + error.message);
            })
    };

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/v1/paragens", {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status) {
                    setParagens(res.data.data);
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
                    <h2 className="mb-0">Lista de Paragens</h2>
                    <Link to="/paragens/criar" className="btn custom-btn">
                        <i className="fas fa-plus me-2"></i>Criar Nova Paragem
                    </Link>
                </div>

                {success && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        Paragem eliminada com sucesso!
                        <button type="button" className="btn-close" onClick={() => setSuccess(false)} aria-label="Close"></button>
                    </div>
                )}

                {error && showDeleteModal && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        Erro ao tentar apagar paragem: {error}
                        <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
                    </div>
                )}

                {paragens.length === 0 ? (
                    <div className="alert alert-info" role="alert">
                        Não existem paragens para mostrar.
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nome da Paragem</th>
                                    <th scope="col">Coordenadas</th>
                                    <th scope="col" className="text-center">Data de registo</th>
                                    <th scope="col" className="text-center">Data da última atualização</th>
                                    <th scope="col" className="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paragens.map((paragem) => (
                                    <tr key={paragem.id_paragem}>
                                        <td scope="row">{paragem.id_paragem}</td>
                                        <td>{paragem.nome}</td>
                                        <td>{paragem.coordenadas}</td>
                                        <td className="text-center">{formatarDataHora(paragem.dta_registo)}</td>
                                        <td className="text-center">{formatarDataHora(paragem.dta_atualizacao)}</td>
                                        <td className="text-center">
                                            <Link
                                                to={`/paragens/editar/${paragem.id_paragem}`}
                                                className="btn btn-sm btn-outline-primary me-2"
                                                title="Editar"
                                            ><i className="fas fa-pencil-alt"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleAbrirModalDelete(paragem.id_paragem)}
                                                className="btn btn-sm btn-outline-danger"
                                                title="Apagar"
                                            ><i className="fas fa-trash-alt"></i>
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
                            <p>Tem a certeza que pretende apagar a paragem com ID: {paragemIdToDelete}? <br />Esta ação não pode ser desfeita.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleFecharModalDelete}>Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={() => deleteParagem(paragemIdToDelete)}>Apagar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListarParagens;