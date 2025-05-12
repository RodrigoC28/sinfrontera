import React from 'react';

const CriarViagem = () => {
  return (
  <>
    <div className="container my-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2 className="text-center">Criar Viagem</h2>
                <form className="container" method="post" action="/">
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="id_autocarro" className="col-sm-2 col-form-label">Autocarro:</label>
                            <div className="col-sm-10">
                            <select id="id_autocarro" className="form-select" name="id_autocarro" required>
                                <option value="1">FF-38-LS</option>
                                <option value="2">KJ-25-OP</option>
                                <option value="3">UM-85-VM</option>
                                <option value="4">CC-51-HW</option>
                            </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="id_paragem" className="col-sm-2 col-form-label">Paragens:</label>
                            <div className="col-sm-10">
                                <select id="id_paragem" className="form-select" name="id_paragem" multiple required>
                                    <option value="1">Lisboa</option>
                                    <option value="2">Coimbra</option>
                                    <option value="3">Aveiro</option>
                                    <option value="4">Évora</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="data" className="col-sm-2 col-form-label">Data:</label>
                            <div className="col-sm-10">
                                <input type="date" className="form-control" id="data" name="data" required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hora_partida" className="col-sm-2 col-form-label">Hora de Partida:</label>
                            <div className="col-sm-10">
                                <input type="time" className="form-control" id="hora_partida" name="hora_partida" required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hora_chegada" className="col-sm-2 col-form-label">Hora de Chegada:</label>
                            <div className="col-sm-10">
                                <input type="time" className="form-control" id="hora_chegada" name="hora_chegada" required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="preco" className="col-sm-2 col-form-label">Preço:</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" id="preco" name="preco" required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="col-sm-6">
                                <a href="/viagens" className="btn custom-btn">Criar viagem</a>&nbsp;
                                {/* <button type="submit" className="btn custom-btn">Criar viagem</button>&nbsp; */}
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

export default CriarViagem;