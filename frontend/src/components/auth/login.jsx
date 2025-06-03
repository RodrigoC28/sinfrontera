import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [remember, setRemember] = useState(false);

  const nav = useNavigate();
  const { login, token } = useContext(AuthContext);

  async function HandleLogin(e) {
    e.preventDefault();
    setMessage("");
    setLoad(true);

    try {
      await login(email, password);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Erro ao autenticar o utilizador.");
      //console.error("Erro ao autenticar o utilizador:", error);
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    if (token) {
      nav("/");
    }
  }, [token, nav]);

  return (
    <div className="container my-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <h2 className="text-center">Login</h2>
            {message && (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
            )}
            <form onSubmit={HandleLogin} noValidate>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        placeholder="Insira o seu email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        autoFocus
                        disabled={load}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Palavra-passe</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        placeholder="Insira a sua password" 
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={load}
                    />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    disabled={load}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Lembrar-me
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn custom-btn w-100"
                  disabled={load}
                >
                  {load ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">A carregar...</span>
                      <span> A entrar...</span>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
                {/* <button type="submit" className="btn custom-btn w-100">Login</button> */}
                <div className="text-center mt-3">
                    <RouterLink to="/registar">Não tem uma conta? Registar</RouterLink>
                </div>
            </form>
        </div>
    </div>
</div>
  );
};

export default Login;