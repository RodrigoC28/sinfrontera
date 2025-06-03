import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const CriarViagemParagem = () => {
    const [viagens, setViagens] = useState([]);
    const [paragens, setParagens] = useState([]);
    const [id_viagem, setViagem ] = useState("");
    const [id_paragem, setParagem] = useState("");
    const [hora, setHora] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const nav = useNavigate();
    const { token } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
            axios.post(`http://localhost:5000/api/v1/destino`, { id_viagem, id_paragem, hora }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
            .then(() => {
                setSuccess(true);
                setTimeout(() => nav("/destinos"), 1500);
            })
            .catch((error) => setError(error.response?.data?.message || "Erro ao criar paragem."));
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
    <div className="container my-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2 className="text-center">Criar Viagem</h2>
                {success && (
                    <div className="alert alert-success" role="alert">
                        Destino criado com sucesso! A redirecionar para a lista de destinos..
                    </div>
                    )}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        Erro ao tentar criar destino: {error}
                    </div>
                )}
                <form className="container" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="id_viagem" className="col-sm-2 col-form-label">Autocarro:</label>
                            <div className="col-sm-10">
                            <select id="id_viagem" className="form-select" name="id_viagem" value={id_viagem}
                                    onChange={(e) => setViagem(e.target.value)} required>
                                <option value="" disabled selected>Selecione uma viagem</option>
                                {viagens.map((viagem) => (
                                    <option key={viagem.id_viagem} value={viagem.id_viagem}>
                                        Viagem Nº{viagem.id_viagem}
                                    </option>
                                ))}
                            </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id_paragem" className="col-sm-2 col-form-label">Autocarro:</label>
                            <div className="col-sm-10">
                            <select id="id_paragem" className="form-select" name="id_paragem" value={id_paragem}
                                    onChange={(e) => setParagem(e.target.value)} required>
                                <option value="" disabled selected>Selecione uma paragem</option>
                                {paragens.map((paragem) => (
                                    <option key={paragem.id_paragem} value={paragem.id_paragem}>
                                        {paragem.id_paragem} - {paragem.nome}
                                    </option>
                                ))}
                            </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hora" className="col-sm-2 col-form-label">Hora:</label>
                            <div className="col-sm-10">
                                <input type="time" className="form-control" id="hora" name="hora" value={hora}
                                    onChange={(e) => setHora(e.target.value)} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="col-sm-6">
                                <button type="submit" className="btn custom-btn">Criar viagem</button>
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

export default CriarViagemParagem;