import React from 'react';

const CriarAutocarro = () => {
  return (
  <>
<div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <h2 className="text-center">Criar Autocarro</h2>
      <form className="container" method="post" action="http://localhost:5000/autocarros/create">
        <div className="row">
          <div className="mb-3">
            <label htmlFor="matricula" className="col-sm-3 col-form-label">Matrícula:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="matricula" name="matricula" required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="capacidade" className="col-sm-3 col-form-label">Capacidade:</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="capacidade" name="capacidade" required />
            </div>
          </div>
          <div className="mb-3">
            <div className="col-sm-6">
              <a href="/autocarros" className="btn custom-btn">Criar autocarro</a>&nbsp;
              {/* <button type="submit" className="btn custom-btn">Criar autocarro</button>&nbsp; */}
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

export default CriarAutocarro;