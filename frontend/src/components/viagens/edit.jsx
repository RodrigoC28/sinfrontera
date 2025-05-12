import React from 'react';

const EditarViagem = () => {
  return (
  <>
<div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <h2 className="text-center">Editar Viagem Coimbra</h2>
      <form className="container" method="post" action="/">
        <div className="row">
          <input type="hidden" id="id_viagem" name="id_viagem" value="1" />
          <div className="mb-3">
            <label htmlFor="id_paragem" className="col-sm-2 col-form-label">Paragens:</label>
            <div className="col-sm-10">
              <select id="id_paragem" className="form-select" name="id_paragem" multiple required>
                <option value="1" selected>Lisboa</option>
                <option value="2" selected>Coimbra</option>
                <option value="3" selected>Aveiro</option>
                <option value="4">Évora</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="data" className="col-sm-2 col-form-label">Data:</label>
            <div className="col-sm-10">
              <input type="date" className="form-control" id="data" name="data" value="2025-05-10" required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="hora_partida" className="col-sm-2 col-form-label">Hora de Partida:</label>
            <div className="col-sm-10">
              <input type="time" className="form-control" id="hora_partida" name="hora_partida" value="09:00" required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="hora_chegada" className="col-sm-2 col-form-label">Hora de Chegada:</label>
            <div className="col-sm-10">
              <input type="time" className="form-control" id="hora_chegada" name="hora_chegada" value="10:00" required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="preco" className="col-sm-2 col-form-label">Preço:</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="preco" name="preco" value="15" required />
            </div>
          </div>
          <div className="mb-3">
            <div className="col-sm-6">
              <a href="/viagens" className="btn custom-btn">Atualizar viagem</a>&nbsp;
              {/* <button type="submit" className="btn custom-btn">Atualizar viagem</button>&nbsp; */}
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

export default EditarViagem;