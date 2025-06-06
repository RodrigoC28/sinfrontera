import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const EditarParagem = () => {
  const { id } = useParams();
  const [viagens, setViagens] = useState([]);
  const [condutor, setCondutor] = useState({ id_viagem: "", nome: "", idade: "", genero: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();
  const { token } = useContext(AuthContext);

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
    if (id && token) {
      axios.get(`http://localhost:5000/api/v1/condutor/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      })
        .then((res) => {
          //console.log(res.data);
          setCondutor(res.data.data);
        })
        .catch(() => setError("Erro ao carregar dados do viagem."));
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCondutor({ ...condutor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:5000/api/v1/condutor/${id}`, condutor, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      })
        .then(() => {
          setSuccess(true);
          setTimeout(() => nav("/condutores"), 1500);
        })
        .catch(() => setError("Erro ao editar condutor."));
    }
  };
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center">Editar Condutor "{condutor.nome}"</h2>
            {success && (
              <div className="alert alert-success" role="alert">
                Condutor alterado com sucesso! A redirecionar para a lista de condutores..
              </div>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                Erro ao tentar editar condutor: {error}
              </div>
            )}
            <form className="container" onSubmit={handleSubmit}>
              <div className="row">
                <input type="hidden" id="id_paragem" name="id_paragem" value="1" />
                <div className="mb-3">
                  <label htmlFor="paragem_nome" className="col-sm-2 col-form-label">Viagem</label>
                  <div className="col-sm-10">
                    <select id="id_viagem" className="form-select" name="id_viagem" value={condutor.id_viagem ?? ""}
                      onChange={handleChange} required>
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
                    <input type="text" className="form-control" id="nome" name="nome" value={condutor.nome ?? ""}
                      onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="idade" className="col-sm-2 col-form-label">Idade:</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="idade" name="idade" value={condutor.idade ?? ""}
                      onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="genero" className="col-sm-2 col-form-label">Género:</label>
                  <div className="col-sm-10">
                    <select id="genero" className="form-select" name="genero" value={condutor.genero ?? ""}
                      onChange={handleChange} required>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="col-sm-6">
                    <button type="submit" className="btn custom-btn">Atualizar condutor</button>
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

export default EditarParagem;