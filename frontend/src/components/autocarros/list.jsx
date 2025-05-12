import React from 'react';

const ListarAutocarros = () => {
  return (
  <>
    <div className="container mt-4">
        <div className="table-responsive">
        <h2 className="text-center mb-4">Lista de Autocarros</h2>
        <table className="table table-bordered table-hover">
        <thead className="thead-light">
        <tr>
            <th scope="col">#</th>
            <th scope="col">Matrícula</th>
            <th scope="col">Capacidade</th>
            <th scope="col" className="text-center">Data de registo</th>
            <th scope="col" className="text-center">Data da última atualização</th>
            <th scope="col" className="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
      <tr>
            <td scope="row">
                1
            </td>
            <td>
                FF-38-LS
            </td>
            <td>
                50
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="text-center">
                <a href="/autocarros/editar" data-toggle="tooltip" data-original-title="Editar">
                <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                <a href="/autocarros" data-toggle="tooltip" data-original-title="Apagar">
                <i className="fas fa-trash-alt"></i></a>
            </td>
          </tr>
          <tr>
            <td scope="row">
                2
            </td>
            <td>
                KJ-25-OP
            </td>
            <td>
                40
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="text-center">
                <a href="/autocarros/editar" data-toggle="tooltip" data-original-title="Editar">
                <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                <a href="/autocarros" data-toggle="tooltip" data-original-title="Apagar">
                <i className="fas fa-trash-alt"></i></a>
            </td>
          </tr>
          <tr>
            <td scope="row">
                3
            </td>
            <td>
                UM-85-VM
            </td>
            <td>
                50
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="text-center">
                <a href="/autocarros/editar" data-toggle="tooltip" data-original-title="Editar">
                <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                <a href="/autocarros" data-toggle="tooltip" data-original-title="Apagar">
                <i className="fas fa-trash-alt"></i></a>
            </td>
          </tr>
          <tr>
            <td scope="row">
                4
            </td>
            <td>
                CC-51-HW
            </td>
            <td>
                30
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="text-center">
                <a href="/autocarros/editar" data-toggle="tooltip" data-original-title="Editar">
                <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                <a href="/autocarros" data-toggle="tooltip" data-original-title="Apagar">
                <i className="fas fa-trash-alt"></i></a>
            </td>
          </tr>
      </tbody>
    </table>
  </div>
</div>
  </>
  );
};

export default ListarAutocarros;