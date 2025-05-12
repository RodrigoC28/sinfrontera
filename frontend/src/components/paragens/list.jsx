import React from 'react';

const ListarParagens = () => {
  return (
  <>
    <div className="container mt-4">
        <div className="table-responsive">
            <h2 className="text-center mb-4">Lista de Paragens</h2>
            <table className="table table-bordered table-hover">
            <thead className="thead-light">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nome da Paragem</th>
                <th scope="col">Coordenadas</th>
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
                        Leiria
                    </td>
                    <td>
                        39.3985, -8.7522
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="text-center">
                        <a href="/paragens/editar" className="edit" data-toggle="tooltip" data-original-title="Editar">
                        <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                        <a href="/paragens/" className="delete" data-toggle="tooltip" data-original-title="Apagar">
                        <i className="fas fa-trash-alt"></i></a>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        2
                    </td>
                    <td>
                        Coimbra
                    </td>
                    <td>
                        39.1528, -8.80725
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="text-center">
                        <a href="/paragens/editar" className="edit" data-toggle="tooltip" data-original-title="Editar">
                        <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                        <a href="/paragens/" className="delete" data-toggle="tooltip" data-original-title="Apagar">
                        <i className="fas fa-trash-alt"></i></a>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        3
                    </td>
                    <td>
                        Aveiro
                    </td>
                    <td>
                        39.6148, -8.6921
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="text-center">
                        <a href="/paragens/editar" className="edit" data-toggle="tooltip" data-original-title="Editar">
                        <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                        <a href="/paragens/" className="delete" data-toggle="tooltip" data-original-title="Apagar">
                        <i className="fas fa-trash-alt"></i></a>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        4
                    </td>
                    <td>
                        Evora
                    </td>
                    <td>
                        39.7633, -8.57125
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="text-center">
                        <a href="/paragens/editar" className="edit" data-toggle="tooltip" data-original-title="Editar">
                        <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                        <a href="/paragens/" className="delete" data-toggle="tooltip" data-original-title="Apagar">
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

export default ListarParagens;