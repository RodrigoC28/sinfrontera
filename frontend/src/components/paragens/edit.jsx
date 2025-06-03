import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const EditarParagem = () => {
   const { id } = useParams();

    const [paragem, setParagem] = useState({ nome: "", coordenadas: "" });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const nav = useNavigate();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (id && token) {
            axios.get(`http://localhost:5000/api/v1/paragem/${id}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
                .then((res) => {
                    //console.log(res.data);
                    setParagem(res.data.data);
                })
                .catch(() => setError("Erro ao carregar dados do paragem."));
        }
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParagem({ ...paragem, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axios.put(`http://localhost:5000/api/v1/paragem/${id}`, paragem, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            })
                .then(() => {
                    setSuccess(true);
                    setTimeout(() => nav("/paragens"), 1500);
                })
                .catch(() => setError("Erro ao editar paragem."));
        } 
    };
  return (
  <>
<div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <h2 className="text-center">Editar Paragem "{paragem.nome}"</h2>
      {success && (
        <div className="alert alert-success" role="alert">
          Paragem alterada com sucesso! A redirecionar para a lista de paragens..
        </div>
        )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Erro ao tentar editar paragem: {error}
        </div>
      )}
      <form className="container" onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3">
            <label htmlFor="nome" className="col-sm-2 col-form-label">Nome da Paragem:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="nome" name="nome" value={paragem.nome ?? ""}
                onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="coordenadas" className="col-sm-2 col-form-label">Coordenadas:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="coordenadas" name="coordenadas" value={paragem.coordenadas ?? ""}
                onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-3">
            <div className="col-sm-6">
              <button type="submit" className="btn custom-btn">Atualizar paragem</button>&nbsp;
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