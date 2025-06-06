import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const CriarViagem = () => {
    const [autocarros, setAutocarros] = useState([]);
    const [id_autocarro, setAutocarro] = useState("");
    const [data, setData] = useState("");
    const [hora_partida, setPartida] = useState("");
    const [hora_chegada, setChegada] = useState("");
    const [preco, setPreco] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const nav = useNavigate();
    const { token } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/v1/viagem`, { id_autocarro, data, hora_partida, hora_chegada, preco }, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        })
            .then(() => {
                setSuccess(true);
                setTimeout(() => nav("/viagens"), 1500);
            })
            .catch((error) => setError(error.response?.data?.message || "Erro ao criar paragem."));
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
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center">Criar Viagem</h2>
                        {success && (
                            <div className="alert alert-success" role="alert">
                                Viagem criada com sucesso! A redirecionar para a lista de viagens..
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                Erro ao tentar criar viagem: {error}
                            </div>
                        )}
                        <form className="container" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="id_autocarro" className="col-sm-2 col-form-label">Autocarro:</label>
                                    <div className="col-sm-10">
                                        <select id="id_autocarro" className="form-select" name="id_autocarro" value={id_autocarro}
                                            onChange={(e) => setAutocarro(e.target.value)} required>
                                            <option value="" disabled selected>Selecione um autocarro</option>
                                            {autocarros.map((autocarro) => (
                                                <option key={autocarro.id_autocarro} value={autocarro.id_autocarro}>
                                                    {autocarro.id_autocarro} - {autocarro.matricula} - {autocarro.capacidade} lugares
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="data" className="col-sm-2 col-form-label">Data:</label>
                                    <div className="col-sm-10">
                                        <input type="date" className="form-control" id="data" name="data" value={data}
                                            onChange={(e) => setData(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="hora_partida" className="col-sm-2 col-form-label">Hora de Partida:</label>
                                    <div className="col-sm-10">
                                        <input type="time" className="form-control" id="hora_partida" name="hora_partida" value={hora_partida}
                                            onChange={(e) => setPartida(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="hora_chegada" className="col-sm-2 col-form-label">Hora de Chegada:</label>
                                    <div className="col-sm-10">
                                        <input type="time" className="form-control" id="hora_chegada" name="hora_chegada" value={hora_chegada}
                                            onChange={(e) => setChegada(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="preco" className="col-sm-2 col-form-label">Preço:</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" id="preco" name="preco" value={preco}
                                            onChange={(e) => setPreco(e.target.value)} required />
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

export default CriarViagem;