import React from 'react';

const Navbar = () => {
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
                        <a href="/" className="nav-link">Início</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Utilizador
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a href="/utilizadores/editar" className="dropdown-item">Editar Conta</a>
                            <a href="/" className="dropdown-item">Logout</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Conta
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a href="/login" className="dropdown-item">Login</a>
                            <a href="/registar" className="dropdown-item">Registar</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="navbar-brand d-none d-md-block">
                            <img src="/images/sinforteras.png" alt="logo" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/reservas" className="nav-link">Viagens</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dashboard
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <h6 className="dropdown-header">Utilizadores</h6>
                            <a href="/utilizadores" className="dropdown-item">Listar</a>
                            <div className="dropdown-divider"></div>
                            <h6 className="dropdown-header">Viagens</h6>
                            <a href="/viagens" className="dropdown-item"></a>
                            <a href="/viagens/criar" className="dropdown-item">Criar nova</a>
                            <div className="dropdown-divider"></div>
                            <h6 className="dropdown-header">Paragens</h6>
                            <a href="/paragens" className="dropdown-item">Listar</a>
                            <a href="/paragens/criar" className="dropdown-item">Criar nova</a>
                            <div className="dropdown-divider"></div>
                            <h6 className="dropdown-header">Autocarros</h6>
                            <a href="/autocarros" className="dropdown-item">Listar</a>
                            <a href="/autocarros/criar" className="dropdown-item">Criar novo</a>
                            <div className="dropdown-divider"></div>
                            <h6 className="dropdown-header">Condutores</h6>
                            <a href="/condutores" className="dropdown-item">Listar</a>
                            <a href="/condutores/criar" className="dropdown-item">Criar novo</a>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </>
    );
};

export default Navbar;