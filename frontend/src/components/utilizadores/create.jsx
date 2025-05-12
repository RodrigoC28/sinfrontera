import React from 'react';

const Registar = () => {
  return (
  <>
    <div className="container my-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2 className="text-center">Registar</h2>
                <form method="post" action="/">
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="nome" name="nome" placeholder="Nome" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
                        <input type="text" className="form-control" id="sobrenome" name="sobrenome" placeholder="Sobrenome" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Endereço de email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telemovel" className="form-label">Telemóvel</label>
                        <input type="number" className="form-control" id="telemovel" name="telemovel" placeholder="Telemóvel" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Palavra-passe</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Palavra-passe" required />
                    </div>
                    <a href="/" className="btn custom-btn w-100">Registar</a>
                    {/* <button type="submit" className="btn custom-btn w-100">Registar</button> */}
                </form>
            </div>
        </div>
    </div>
  </>
  );
};

export default Registar;