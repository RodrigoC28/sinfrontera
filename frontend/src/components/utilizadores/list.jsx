import React from 'react';

const ListarUtilizadores = () => {
  return (
  <>
    <div className="container mt-4">
        <div className="table-responsive">
        <h2 className="text-center mb-4">Lista de Utilizadores</h2>
    <table className="table table-bordered table-hover">
      <thead className="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tipo de Utilizador</th>
          <th scope="col">Nome</th>
          <th scope="col">Sobrenome</th>
          <th scope="col">Email</th>
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
                admin
            </td>
            <td>
                Leticia
            </td>
            <td>
                Sosa
            </td>
            <td>
                leticiasosa@ismt.pt
            </td>
            <td className="col text-center">
                02/10/2023
            </td>
            <td className="col text-center">
                02/10/2023
            </td>
            <td className="text-center">
                <a href="/utilizadores/editar" className="edit" data-toggle="tooltip" data-original-title="Editar">
                <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                <a href="/utilizadores" className="delete" data-toggle="tooltip" data-original-title="Apagar">
                <i className="fas fa-trash-alt"></i></a>
            </td>
          </tr>
          <tr>
            <td scope="row">
                2
            </td>
            <td>
                admin
            </td>
            <td>
                Paulo
            </td>
            <td>
                Ferreira
            </td>
            <td>
                pauloferreira@ismt.pt
            </td>
            <td className="col text-center">
                02/10/2023
            </td>
            <td className="col text-center">
                02/10/2023
            </td>
            <td className="text-center">
                <a href="/utilizadores/editar" className="edit" data-toggle="tooltip" data-original-title="Editar">
                <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                <a href="/utilizadores" className="delete" data-toggle="tooltip" data-original-title="Apagar">
                <i className="fas fa-trash-alt"></i></a>
            </td>
          </tr>
          <tr>
            <td scope="row">
                3
            </td>
            <td>
                cliente
            </td>
            <td>
                Manuel
            </td>
            <td>
                Silva
            </td>
            <td>
                manuelsilva@ismt.pt
            </td>
            <td className="col text-center">
                02/10/2023
            </td>
            <td className="col text-center">
                02/10/2023
            </td>
            <td className="text-center">
                <a href="/utilizadores/editar" className="edit" data-toggle="tooltip" data-original-title="Editar">
                <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                <a href="/utilizadores" className="delete" data-toggle="tooltip" data-original-title="Apagar">
                <i className="fas fa-trash-alt"></i></a>
            </td>
          </tr>
          <tr>
            <td scope="row">
                4
            </td>
            <td>
                cliente
            </td>
            <td>
                Ana
            </td>
            <td>
                Costa
            </td>
            <td>
                anacosta@ismt.pt
            </td>
            <td className="col text-center">
                02/10/2023
            </td>
            <td className="col text-center">
                02/10/2023
            </td>
            <td className="text-center">
                <a href="/utilizadores/editar" className="edit" data-toggle="tooltip" data-original-title="Editar">
                <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                <a href="/utilizadores" className="delete" data-toggle="tooltip" data-original-title="Apagar">
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

export default ListarUtilizadores;