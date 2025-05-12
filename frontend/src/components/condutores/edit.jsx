import React from 'react';

const EditarParagem = () => {
  return (
  <>
<div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <h2 className="text-center">Editar Condutor Paulo</h2>
      <form className="container" method="post" action="/">
        <div className="row">
          <input type="hidden" id="id_paragem" name="id_paragem" value="1" />
          <div className="mb-3">
            <label htmlFor="paragem_nome" className="col-sm-2 col-form-label">Viagem</label>
            <div className="col-sm-10">
              <select id="id_viagem" className="form-select" name="id_viagem" required>
                <option value="1">Coimbra - Lisboa</option>
                <option value="2">Faro - Porto</option>
                <option value="3">Lisboa - Madrid</option>
                <option value="4">Porto - Leiria</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="nome" className="col-sm-2 col-form-label">Nome:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="nome" name="nome" value="Paulo" required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="idade" className="col-sm-2 col-form-label">Idade:</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="idade" name="idade" value="36" required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="genero" className="col-sm-2 col-form-label">Género:</label>
            <div className="col-sm-10">
              <select id="genero" className="form-select" name="genero" required>
                    <option value="Masculino" defaultValue>Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
          </div>
          <div className="mb-3">
            <div className="col-sm-6">
              <a href="/condutores" className="btn custom-btn">Atualizar condutor</a>&nbsp;
              {/* <button type="submit" className="btn custom-btn">Atualizar condutor</button>&nbsp; */}
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