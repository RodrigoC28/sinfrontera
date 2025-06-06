import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const ListarUtilizadores = () => {

    const [utilizadores, setUtilizadores] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { token } = useContext(AuthContext);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [utilizadorIdToDelete, setUtilizadorIdToDelete] = useState(null);

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
        setUtilizadorIdToDelete(id);
        setShowDeleteModal(true);
        setError('');
        setSuccess(false);
    };

    const handleFecharModalDelete = () => {
        setShowDeleteModal(false);
        setUtilizadorIdToDelete(null);
    };

    const deleteUtilizador = (id) => {
        axios.delete(`http://localhost:5000/api/v1/utilizador/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        })
            .then((res) => {
                if (res.status === 204) {
                    setSuccess(true);
                    setUtilizadores((prevUtilizadores) =>
                        prevUtilizadores.filter((utilizador) => utilizador.id_utilizador !== utilizadorIdToDelete)
                    );
                } else {
                    setError("Ocorreu um erro ao eliminar o utilizador.");
                }
                handleFecharModalDelete();
            })
            .catch((error) => {
                setError("Erro na ligação à API. " + error.message);
            })
    };

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/v1/utilizadores", {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status) {
                    setUtilizadores(res.data.data);
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
                    <h2 className="mb-0">Lista de Utilizadores</h2>
                </div>
                {success && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        Utilizador eliminado com sucesso!
                        <button type="button" className="btn-close" onClick={() => setSuccess(false)} aria-label="Close"></button>
                    </div>
                )}

                {error && showDeleteModal && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        Erro ao tentar apagar utilizadores: {error}
                        <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
                    </div>
                )}

                {utilizadores.length === 0 ? (
                    <div className="alert alert-info" role="alert">
                        Não existem utilizadores para mostrar.
                    </div>
                ) : (

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tipo de Utilizador</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Sobrenome</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Telemovel</th>
                                    <th scope="col" className="text-center">Data de registo</th>
                                    <th scope="col" className="text-center">Data da última atualização</th>
                                    <th scope="col" className="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {utilizadores.map((utilizador) => (
                                    <tr key={utilizador.id_utilizador}>
                                        <th scope="row">{utilizador.id_utilizador}</th>
                                        <td>{utilizador.tipo_utilizador}</td>
                                        <td>{utilizador.nome}</td>
                                        <td>{utilizador.sobrenome}</td>
                                        <td>{utilizador.email}</td>
                                        <td>{utilizador.telemovel}</td>
                                        <td className="text-center">{formatarDataHora(utilizador.dta_registo)}</td>
                                        <td className="text-center">{formatarDataHora(utilizador.dta_atualizacao)}</td>
                                        <td className="text-center">
                                            <Link
                                                to={`/utilizadores/editar/${utilizador.id_utilizador}`}
                                                className="btn btn-sm btn-outline-primary me-2"
                                                title="Editar"
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleAbrirModalDelete(utilizador.id_utilizador)}
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
                            <p>Tem a certeza que pretende apagar o utilizador com ID: {utilizadorIdToDelete}? <br />Esta ação não pode ser desfeita.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleFecharModalDelete}>Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={() => deleteUtilizador(utilizadorIdToDelete)}>Apagar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListarUtilizadores;