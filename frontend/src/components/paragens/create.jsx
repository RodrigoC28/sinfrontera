import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const CriarParagem = () => {
    const [nome, setNome] = useState("");
    const [coordenadas, setCoordenadas] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const nav = useNavigate();
    const { token } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/v1/paragem`, { nome, coordenadas }, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        })
            .then(() => {
                setSuccess(true);
                setTimeout(() => nav("/paragens"), 1500);
            })
            .catch((error) => setError(error.response?.data?.message || "Erro ao criar paragem."));
    };

    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center">Criar Paragem</h2>
                        {success && (
                            <div className="alert alert-success" role="alert">
                                Paragem criada com sucesso! A redirecionar para a lista de paragens..
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                Erro ao tentar criar paragem: {error}
                            </div>
                        )}
                        <form className="container" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="paragem_nome" className="col-sm-2 col-form-label">Nome da Paragem:</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="paragem_nome" name="paragem_nome" placeholder="Ex: Coimbra" value={nome}
                                            onChange={(e) => setNome(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="coordenadas" className="col-sm-2 col-form-label">Coordenadas:</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="coordenadas" name="coordenadas" placeholder="Ex: 40.2115, -8.4292" value={coordenadas}
                                            onChange={(e) => setCoordenadas(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="col-sm-6">
                                        <button type="submit" className="btn custom-btn">Criar paragem</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CriarParagem;