import React from 'react';

const EditarAutocarro = () => {
  return (
  <>
<div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <h2 className="text-center">Editar Autocarro FF-38-LS</h2>
      <form className="container" method="post" action="/">
        <div className="row">
          <input type="hidden" id="id_viagem" name="id_viagem" value="1" />
          <div className="mb-3">
            <label htmlFor="matricula" className="col-sm-2 col-form-label">Matrícula:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="matricula" name="matricula" value="FF-38-LS" required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="capacidade" className="col-sm-2 col-form-label">Capacidade:</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="capacidade" name="capacidade" value="50" required />
            </div>
          </div>
          <div className="mb-3">
            <div className="col-sm-6">
              <a href="/autocarros" className="btn custom-btn">Atualizar autocarro</a>&nbsp;
              {/* <button type="submit" className="btn custom-btn">Atualizar autocarro</button>&nbsp; */}
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