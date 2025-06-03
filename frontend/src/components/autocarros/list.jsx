// src/components/autocarros/list.jsx
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const ListarAutocarros = () => {
    const [autocarros, setAutocarros] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { token } = useContext(AuthContext);

    // Estados para o modal de delete
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [autocarroIdToDelete, setAutocarroIdToDelete] = useState(null);

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
        setAutocarroIdToDelete(id);
        setShowDeleteModal(true);
        setError('');
        setSuccess(false);
    };

    const handleFecharModalDelete = () => {
        setShowDeleteModal(false);
        setAutocarroIdToDelete(null);
    };

    const deleteAutocarro = (id) => {
        axios.delete(`http://localhost:5000/api/v1/autocarro/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
            })
            .then((res) => {
                if (res.status === 204) {
                    setSuccess(true);
                    setAutocarros((prevAutocarros) => 
                        prevAutocarros.filter((autocarro) => autocarro.id_autocarro !== autocarroIdToDelete)
                    );
                } else {
                    setError("Ocorreu um erro ao eliminar o autocarro.");
                }
                handleFecharModalDelete();
            })
            .catch((error) => {
                setError("Erro na ligação à API. " + error.message);
            })
    };

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/v1/autocarros", {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status) {
                    setAutocarros(res.data.data);
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
          <h2 className="mb-0">Lista de Autocarros</h2>
            <Link to="/autocarros/criar" className="btn custom-btn">
              <i className="fas fa-plus me-2"></i>Criar Novo Autocarro
            </Link>
        </div>

        {success && ( 
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            Autocarro eliminado com sucesso!
            <button type="button" className="btn-close" onClick={() => setSuccess(false)} aria-label="Close"></button>
          </div>
        )}

        {error && showDeleteModal && ( 
             <div className="alert alert-danger alert-dismissible fade show" role="alert">
                Erro ao tentar apagarn autocarro: {error}
                <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
            </div>
        )}
        
       {autocarros.length === 0 ? (
            <div className="alert alert-info" role="alert">
                Não existem autocarros para mostrar.
            </div>
        ) : (
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead className="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Matrícula</th>
                    <th scope="col">Capacidade</th>
                    <th scope="col" className="text-center">Data de Registo</th>
                    <th scope="col" className="text-center">Última Atualização</th>
                    <th scope="col" className="text-center">Ações</th>
                </tr>
                </thead>
                <tbody>
                {autocarros.map((autocarro) => (
                    <tr key={autocarro.id_autocarro}>
                    <td scope="row">{autocarro.id_autocarro}</td>
                    <td>{autocarro.matricula}</td>
                    <td>{autocarro.capacidade}</td>
                    <td className="text-center">{formatarDataHora(autocarro.dta_registo)}</td>
                    <td className="text-center">{formatarDataHora(autocarro.dta_atualizacao)}</td>
                    <td className="text-center">
                        <Link 
                            to={`/autocarros/editar/${autocarro.id_autocarro}`} 
                            className="btn btn-sm btn-outline-primary me-2" 
                            title="Editar"
                        >
                            <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <button 
                            onClick={() => handleAbrirModalDelete(autocarro.id_autocarro)} 
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
          style={{backgroundColor: showDeleteModal ? 'rgba(0,0,0,0.5)' : 'transparent'}}>
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title">Confirmar Apagar</h5>
                  <button type="button" className="btn-close" onClick={handleFecharModalDelete} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                  <p>Tem a certeza que pretende apagar o autocarro com ID: {autocarroIdToDelete}? <br/>Esta ação não pode ser desfeita.</p>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleFecharModalDelete}>Cancelar</button>
                  <button type="button" className="btn btn-danger" onClick={() => deleteAutocarro(autocarroIdToDelete)}>Apagar</button>
              </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default ListarAutocarros;