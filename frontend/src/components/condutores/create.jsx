import React from 'react';

const CriarCondutor = () => {
    return (
    <>
    <div className="container my-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
        <h2 className="text-center">Criar Paragem</h2>
        <form className="container" method="post" action="/">
            <div className="row">
            <div className="mb-3">
                <label htmlFor="id_viagem" className="col-sm-2 col-form-label">Viagem:</label>
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
                <input type="text" className="form-control" id="nome" name="nome" required />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="idade" className="col-sm-2 col-form-label">Idade:</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" id="idade" name="idade" required />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="genero" className="col-sm-2 col-form-label">Género:</label>
                <div className="col-sm-10">
                <select id="genero" className="form-select" name="genero" required>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </select>
                </div>
            </div>
            <div className="mb-3">
                <div className="col-sm-6">
                    <a href="/condutores" className="btn custom-btn">Criar condutor</a>&nbsp;
                    {/* <button type="submit" className="btn custom-btn">Criar paragem</button>&nbsp; */}
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

export default CriarCondutor;