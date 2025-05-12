import React from 'react';

const EditarUtilizador = () => {
  return (
  <>
    <div className="container my-5">
        <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="text-center">Atualizar Leticia</h2>
        <form method="post" action="/">
          <div className="row">
            <input type="hidden" id="id_utilizador" name="id_utilizador" value="1" />
            <div className="mb-3">
              <label htmlFor="nome" className="col-sm-2 col-form-label">Nome:</label>
              <div className="col-sm-12">
                <input type="text" className="form-control" id="nome" name="nome" value="Leticia" required />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="sobrenome" className="col-sm-2 col-form-label">Sobrenome:</label>
              <div className="col-sm-12">
                <input type="text" className="form-control" id="sobrenome" name="sobrenome" value="Sosa" required />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
              <div className="col-sm-12">
                <input type="email" className="form-control" id="email" name="email" value="leticiasosa@ismt.pt" required />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
              <div className="col-sm-12">
                <input type="password" className="form-control" id="password" name="password" value="123456"
                  required />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="telemovel" className="col-sm-2 col-form-label">Telemóvel:</label>
              <div className="col-sm-12">
                <input type="number" className="form-control" id="telemovel" name="telemovel" value="912345678" required />
              </div>
            </div>
              <div className="mb-3">
                <label htmlFor="tipo_utilizador" className="col-sm-2 col-form-label">Tipo de utilizador:</label>
                <div className="col-sm-12">
                  <select className="form-control" id="tipo_utilizador" name="tipo_utilizador" required>
                    <option value="cliente">Cliente</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>
            <br />
            <div className="mb-3">
              <div className="col-sm-6">
                <a href="/utilizadores" className="btn custom-btn">Atualizar utilizador</a>&nbsp;
                {/* <button type="submit" className="btn custom-btn">Atualizar utilizador</button>&nbsp; */}
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

export default EditarUtilizador;