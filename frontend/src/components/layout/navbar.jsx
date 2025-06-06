import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand d-md-none">
                        <img src="/images/sinforteras.png" alt="logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a href="/" className="nav-link">Inicio</a>
                            </li>
                            {user && (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Conta
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to={`/utilizadores/editar/${user.id}`} className="dropdown-item">Editar Conta</Link>
                                        <button onClick={handleLogout} className="dropdown-item" type="button">Logout</button>
                                    </div>
                                </li>
                            )}
                            <li className="nav-item">
                                <a href="/" className="navbar-brand d-none d-md-block">
                                    <img src="/images/sinforteras.png" alt="logo" />
                                </a>
                            </li>
                            {user && (
                            <li className="nav-item">
                                <Link to={`/reservas/${user.id}`} className="nav-link">Viagens</Link>
                            </li>
                            )}
                            {!user && (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Conta
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a href="/login" className="dropdown-item">Login</a>
                                        <a href="/registar" className="dropdown-item">Registar</a>
                                    </div>
                                </li>
                            )}
                            {user && user.tipo_utilizador == "admin" && (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dashboard
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <h6 className="dropdown-header text-orange">Utilizadores</h6>
                                        <a href="/utilizadores" className="dropdown-item">Listar</a>
                                        <div className="dropdown-divider"></div>
                                        <h6 className="dropdown-header text-orange">Viagens</h6>
                                        <a href="/viagens" className="dropdown-item">Listar</a>
                                        <a href="/viagens/criar" className="dropdown-item">Criar nova</a>
                                        <div className="dropdown-divider"></div>
                                        <h6 className="dropdown-header text-orange">Paragens</h6>
                                        <a href="/paragens" className="dropdown-item">Listar</a>
                                        <a href="/paragens/criar" className="dropdown-item">Criar nova</a>
                                        <div className="dropdown-divider"></div>
                                        <h6 className="dropdown-header text-orange">Destinos</h6>
                                        <a href="/destinos" className="dropdown-item">Listar</a>
                                        <a href="/destinos/criar" className="dropdown-item">Criar novo</a>
                                        <div className="dropdown-divider"></div>
                                        <h6 className="dropdown-header text-orange">Autocarros</h6>
                                        <a href="/autocarros" className="dropdown-item">Listar</a>
                                        <a href="/autocarros/criar" className="dropdown-item">Criar novo</a>
                                        <div className="dropdown-divider"></div>
                                        <h6 className="dropdown-header text-orange">Condutores</h6>
                                        <a href="/condutores" className="dropdown-item">Listar</a>
                                        <a href="/condutores/criar" className="dropdown-item">Criar novo</a>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;