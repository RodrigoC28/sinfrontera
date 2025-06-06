import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

const ListarDestinos = () => {
    const [destinos, setDestinos] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { token } = useContext(AuthContext);

    // Estados para o modal de delete
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const formatarDataHora = (dataISO) => {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    };

    const formatarHora = (horaString) => {
        return horaString.substring(0, 5); 
    };

    const handleAbrirModalDelete = (idViagem, idParagem) => {
        setItemToDelete({ id_viagem: idViagem, id_paragem: idParagem });
        setShowDeleteModal(true);
        setError('');
        setSuccess(false);
    };

    const handleFecharModalDelete = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const deleteDestino = (id) => {
        axios.delete(`http://localhost:5000/api/v1/destino/${itemToDelete.id_viagem}/${itemToDelete.id_paragem}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
            })
            .then((res) => {
                if (res.status === 204) {
                    setSuccess(true);
                    setDestinos((prevDestinos) => 
                        prevDestinos.filter((destino) => (destino.id_viagem !== itemToDelete.id_viagem && destino.id_paragem !== itemToDelete.id_paragem)
                ));
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
            .get("http://localhost:5000/api/v1/destinos", {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status) {
                    setDestinos(res.data.data);
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
                    <h2 className="mb-0">Lista de Destinos</h2>
                        <Link to="/destinos/criar" className="btn custom-btn">
                            <i className="fas fa-plus me-2"></i>Criar Novo Destino
                        </Link>
                </div>
        
                {success && ( 
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    Destino eliminado com sucesso!
                    <button type="button" className="btn-close" onClick={() => setSuccess(false)} aria-label="Close"></button>
                  </div>
                )}
        
                {error && showDeleteModal && ( 
                     <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        Erro ao tentar apagar destino: {error}
                        <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
                    </div>
                )}
        
                {destinos.length === 0 ? (
                    <div className="alert alert-info" role="alert">
                        Não existem destinos para mostrar.
                    </div>
                ) : (
        <div className="table-responsive">
        <table className="table table-bordered table-hover">
        <thead className="thead-light">
        <tr>
            <th scope="col">ID da Viagem</th>
            <th scope="col">ID da Paragem</th>
            <th scope="col">Hora</th>
            <th scope="col" className="text-center">Data de registo</th>
            <th scope="col" className="text-center">Data da última atualização</th>
            <th scope="col" className="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
                {destinos.map((destino) => (
                  <tr key={destino.id_viagem}>
                    <td scope="row">{destino.id_viagem}</td>
                    <td>{destino.id_paragem}</td>
                    <td>{formatarHora(destino.hora)}</td>
                    <td className="text-center">{formatarDataHora(destino.dta_registo)}</td>
                    <td className="text-center">{formatarDataHora(destino.dta_atualizacao)}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleAbrirModalDelete(destino.id_viagem, destino.id_paragem)}
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
                  <p>Tem a certeza que pretende apagar a paragem da viagem? <br/> (Viagem ID: {itemToDelete?.id_viagem}, Paragem ID: {itemToDelete?.id_paragem}) <br/>Esta ação não pode ser desfeita.</p>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleFecharModalDelete}>Cancelar</button>
                  <button type="button" className="btn btn-danger" onClick={() => deleteDestino(itemToDelete)}>Apagar</button>
              </div>
              </div>
          </div>
      </div>   
  </>
  );
};

export default ListarDestinos;