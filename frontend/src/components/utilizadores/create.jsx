import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registar = () => {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [telemovel, setTelemovel] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const nav = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:5000/api/v1/utilizador/registo", { nome, sobrenome, email, password, telemovel })
            .then((res) => {
                //console.log(res.data);
                if (res.data.success) {
                    setSuccess(true);
                    setTimeout(() => {
                        nav("/login");
                    }, 5000);
                } else {
                    setError("Ocorreu um erro na criação da nova conta. Tente novamente mais tarde.");
                }
            })
            .catch((error) => {
                console.error(error, error.message);
                setError("Erro na ligação à API. ");
            });
    };
  return (
  <>
    <div className="container my-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2 className="text-center">Registar</h2>
                {success && (
                  <div className="alert alert-success" role="alert">
                    Conta criada com sucesso! A redirecionar para a página de login...
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    Erro ao tentar criar conta: {error}
                  </div>
                )}
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="nome" name="nome" placeholder="Nome" value={nome}
                            onChange={(e) => setNome(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
                        <input type="text" className="form-control" id="sobrenome" name="sobrenome" placeholder="Sobrenome" value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Endereço de email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={email} 
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telemovel" className="form-label">Telemóvel</label>
                        <input type="number" className="form-control" id="telemovel" name="telemovel" placeholder="Telemóvel" value={telemovel}
                            onChange={(e) => setTelemovel(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Palavra-passe</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Palavra-passe" value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn custom-btn w-100">Registar</button>
                </form>
            </div>
        </div>
    </div>
  </>
  );
};

export default Registar;