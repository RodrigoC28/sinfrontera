import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const EditarAutocarro = () => {
  const { id } = useParams();

  const [autocarro, setAutocarro] = useState({ matricula: "", capacidade: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (id && token) {
      axios.get(`http://localhost:5000/api/v1/autocarro/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      })
        .then((res) => {
          //console.log(res.data);
          setAutocarro(res.data.data);
        })
        .catch(() => setError("Erro ao carregar dados do autocarro."));
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAutocarro({ ...autocarro, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:5000/api/v1/autocarro/${id}`, autocarro, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      })
        .then(() => {
          setSuccess(true);
          setTimeout(() => nav("/autocarros"), 1500);
        })
        .catch(() => setError("Erro ao editar autocarro."));
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center">Editar Autocarro "{autocarro.matricula}"</h2>
            {success && (
              <div className="alert alert-success" role="alert">
                Autocarro alterado com sucesso! A redirecionar para a lista de autocarros..
              </div>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                Erro ao tentar editar autocarro: {error}
              </div>
            )}
            <form className="container" onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3">
                  <label htmlFor="matricula" className="col-sm-2 col-form-label">Matrícula:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="matricula" name="matricula" value={autocarro.matricula ?? ""}
                      onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="capacidade" className="col-sm-2 col-form-label">Capacidade:</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="capacidade" name="capacidade" value={autocarro.capacidade ?? ""}
                      onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="col-sm-6">
                    <button type="submit" className="btn custom-btn">Atualizar autocarro</button>&nbsp;
                    <button type="reset" className="btn btn-secondary">Limpar</button>
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

export default EditarAutocarro;