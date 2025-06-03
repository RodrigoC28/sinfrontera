import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const CriarCondutor = () => {
    const [viagens, setViagens] = useState([]);
    const [id_viagem, setViagem ] = useState("");
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [genero, setGenero] = useState("Masculino");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const nav = useNavigate();
    const { token } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Criar condutor:", { id_viagem, nome, idade, genero });
            axios.post(`http://localhost:5000/api/v1/condutor`, { id_viagem, nome, idade, genero }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
            .then(() => {
                setSuccess(true);
                setTimeout(() => nav("/condutores"), 1500);
            })
            .catch((error) => setError(error.response?.data?.message || "Erro ao criar condutor."));
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
    <div className="container my-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
        <h2 className="text-center">Criar Condutor</h2>
        {success && (
            <div className="alert alert-success" role="alert">
                Condutor criado com sucesso! A redirecionar para a lista de condutores..
            </div>
        )}
        {error && (
            <div className="alert alert-danger" role="alert">
                Erro ao tentar criar condutor: {error}
            </div>
        )}
        <form className="container" onSubmit={handleSubmit}>
            <div className="row">
            <div className="mb-3">
                <label htmlFor="id_viagem" className="col-sm-2 col-form-label">Viagem:</label>
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
                <label htmlFor="nome" className="col-sm-2 col-form-label">Nome:</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="nome" name="nome" value={nome}
                    onChange={(e) => setNome(e.target.value)} required />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="idade" className="col-sm-2 col-form-label">Idade:</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="idade" name="idade" value={idade}
                    onChange={(e) => setIdade(e.target.value)} required />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="genero" className="col-sm-2 col-form-label">Género:</label>
                <div className="col-sm-10">
                <select id="genero" className="form-select" name="genero" value={genero}
                    onChange={(e) => setGenero(e.target.value)} required>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>
                </div>
            </div>
            <div className="mb-3">
                <div className="col-sm-6">
                    <button type="submit" className="btn custom-btn">Criar condutor</button>
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

export default CriarCondutor;