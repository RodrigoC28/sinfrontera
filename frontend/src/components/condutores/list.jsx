import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const ListarCondutores = () => {
    const [condutores, setCondutores] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { token } = useContext(AuthContext);

    // Estados para o modal de delete
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [condutorIdToDelete, setCondutorIdToDelete] = useState(null);

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
        setCondutorIdToDelete(id);
        setShowDeleteModal(true);
        setError('');
        setSuccess(false);
    };

    const handleFecharModalDelete = () => {
        setShowDeleteModal(false);
        setCondutorIdToDelete(null);
    };

    const deleteCondutor = (id) => {
        axios.delete(`http://localhost:5000/api/v1/condutor/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
            })
            .then((res) => {
                if (res.status === 204) {
                    setSuccess(true);
                    setCondutores((prevCondutores) => 
                        prevCondutores.filter((condutor) => condutor.id_condutor !== condutorIdToDelete)
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
        axios
            .get("http://localhost:5000/api/v1/condutores", {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status) {
                    setCondutores(res.data.data);
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
                      <h2 className="mb-0">Lista de Condutores</h2>
                          <Link to="/condutores/criar" className="btn custom-btn">
                              <i className="fas fa-plus me-2"></i>Criar Novo Condutor
                          </Link>
                  </div>
          
                  {success && ( 
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      Condutor eliminado com sucesso!
                      <button type="button" className="btn-close" onClick={() => setSuccess(false)} aria-label="Close"></button>
                    </div>
                  )}
          
                  {error && showDeleteModal && ( 
                       <div className="alert alert-danger alert-dismissible fade show" role="alert">
                          Erro ao tentar apagar condutor: {error}
                          <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
                      </div>
                  )}
                        {condutores.length === 0 ? (
                            <div className="alert alert-info" role="alert">
                                Não existem condutores para mostrar.
                            </div>
                        ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                            <thead className="thead-light">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Viagem</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Idade</th>
                                <th scope="col">Género</th>
                                <th scope="col" className="text-center">Data de registo</th>
                                <th scope="col" className="text-center">Data da última atualização</th>
                                <th scope="col" className="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            {condutores.map((condutor) => (
                              <tr key={condutor.id_condutor}>
                                <td scope="row">{condutor.id_condutor}</td>
                                <td>{condutor.viagem.id_viagem}</td>
                                <td>{condutor.nome}</td>
                                <td>{condutor.idade}</td>
                                <td>{condutor.genero}</td>
                                <td className="text-center">{formatarDataHora(condutor.dta_registo)}</td>
                                <td className="text-center">{formatarDataHora(condutor.dta_atualizacao)}</td>
                                <td className="text-center">
                                  <Link
                                    to={`/condutores/editar/${condutor.id_condutor}`}
                                    className="btn btn-sm btn-outline-primary me-1"
                                    title="Editar"
                                  >
                                    <i className="fas fa-pencil-alt"></i>
                                  </Link>
                                  <button
                                    onClick={() => handleAbrirModalDelete(condutor.id_condutor)}
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
                  <p>Tem a certeza que pretende apagar o condutor com ID: {condutorIdToDelete}? <br/>Esta ação não pode ser desfeita.</p>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleFecharModalDelete}>Cancelar</button>
                  <button type="button" className="btn btn-danger" onClick={() => deleteCondutor(condutorIdToDelete)}>Apagar</button>
              </div>
              </div>
          </div>
      </div>  
  </>
  );
};

export default ListarCondutores;