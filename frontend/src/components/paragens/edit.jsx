import React from 'react';

const EditarParagem = () => {
  return (
  <>
<div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <h2 className="text-center">Editar Paragem Leiria</h2>
      <form className="container" method="post" action="/">
        <div className="row">
          <input type="hidden" id="id_paragem" name="id_paragem" value="1" />
          <div className="mb-3">
            <label htmlFor="paragem_nome" className="col-sm-2 col-form-label">Nome da Paragem:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="paragem_nome" name="paragem_nome" value="Leiria" required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="coordenadas" className="col-sm-2 col-form-label">Coordenadas:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="coordenadas" name="coordenadas" value="39.7443, -8.80725" required />
            </div>
          </div>
          <div className="mb-3">
            <div className="col-sm-6">
              <a href="/paragens"className="btn custom-btn">Atualizar paragem</a>&nbsp;
              {/* <button type="submit" className="btn custom-btn">Atualizar paragem</button>&nbsp; */}
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

export default EditarParagem;