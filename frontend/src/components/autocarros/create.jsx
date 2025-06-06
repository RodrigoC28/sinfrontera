import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const CriarAutocarro = () => {
  const [matricula, setMatricula] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();
  const { token } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/v1/autocarro`, { matricula, capacidade }, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    })
      .then(() => {
        setSuccess(true);
        setTimeout(() => nav("/autocarros"), 1500);
      })
      .catch((error) => setError(error.response?.data?.message || "Erro ao criar autocarro."));

  };

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center">Criar Autocarro</h2>
            {success && (
              <div className="alert alert-success" role="alert">
                Autocarro criado com sucesso! A redirecionar para a lista de autocarros..
              </div>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                Erro ao tentar criar autocarro: {error}
              </div>
            )}
            <form className="container" onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3">
                  <label htmlFor="matricula" className="col-sm-3 col-form-label">Matrícula:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="matricula" name="matricula" placeholder="Ex: AA-00-BB" value={matricula}
                      onChange={(e) => setMatricula(e.target.value)} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="capacidade" className="col-sm-3 col-form-label">Capacidade:</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control" id="capacidade" name="capacidade" placeholder="Ex: 50" min="1" value={capacidade}
                      onChange={(e) => setCapacidade(e.target.value)} required />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="col-sm-6">
                    <button type="submit" className="btn custom-btn">Criar autocarro</button>
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

export default CriarAutocarro;