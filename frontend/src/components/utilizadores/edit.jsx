import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const EditarUtilizador = () => {
  const { id } = useParams();

  const [utilizador, setUtilizador] = useState({ nome: "", sobrenome: "", email: "", password: "", telemovel: "", tipo_utilizador: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();
  const { token } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (id && token) {
      axios.get(`http://localhost:5000/api/v1/utilizador/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      })
        .then((res) => {
          //console.log(res.data);
          setUtilizador(res.data.data);
        })
        .catch(() => setError("Erro ao carregar dados do utilizador."));
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUtilizador({ ...utilizador, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:5000/api/v1/utilizador/${id}`, utilizador, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      })
        .then(() => {
          setSuccess(true);
          setTimeout(() => nav("/utilizadores"), 1500);
        })
        .catch(() => setError("Erro ao editar utilizador."));
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center">Atualizar {utilizador.nome}</h2>
            {success && (
              <div className="alert alert-success" role="alert">
                Utilizador alterado com sucesso! A redirecionar para a lista de utilizadores..
              </div>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                Erro ao tentar editar utilizador: {error}
              </div>
            )}
            <form method="post" onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3">
                  <label htmlFor="nome" className="col-sm-2 col-form-label">Nome:</label>
                  <div className="col-sm-12">
                    <input type="text" className="form-control" id="nome" name="nome" value={utilizador.nome ?? ""}
                      onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="sobrenome" className="col-sm-2 col-form-label">Sobrenome:</label>
                  <div className="col-sm-12">
                    <input type="text" className="form-control" id="sobrenome" name="sobrenome" value={utilizador.sobrenome ?? ""}
                      onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                  <div className="col-sm-12">
                    <input type="email" className="form-control" id="email" name="email" value={utilizador.email ?? ""}
                      onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
                  <div className="col-sm-12">
                    <input type="password" className="form-control" id="password" name="password" value={utilizador.password ?? ""}
                      onChange={handleChange} />
                    <span className="text-muted">* Deixe a password em branco se não quiser alterar.</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="telemovel" className="col-sm-2 col-form-label">Telemóvel:</label>
                  <div className="col-sm-12">
                    <input type="number" className="form-control" id="telemovel" name="telemovel" value={utilizador.telemovel ?? ""}
                      onChange={handleChange} required />
                  </div>
                </div>
                {user && user.tipo_utilizador == "admin" && (
                  <div className="mb-3">
                    <label htmlFor="tipo_utilizador" className="col-sm-6 col-form-label">Tipo de utilizador:</label>
                    <div className="col-sm-12">
                      <select id="tipo_utilizador" className="form-select" name="tipo_utilizador" value={utilizador.tipo_utilizador ?? ""}
                        onChange={handleChange} required>
                        <option value="cliente">Cliente</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>
                  </div>
                )}
                <br />
                <div className="mb-3">
                  <div className="col-sm-6">
                    <button type="submit" className="btn custom-btn">Atualizar utilizador</button>
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

export default EditarUtilizador;