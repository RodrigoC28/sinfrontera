import React from 'react';

const ListarCondutores = () => {
  return (
  <>
    <div className="container mt-4">
        <div className="table-responsive">
            <h2 className="text-center mb-4">Lista de Condutores</h2>
            <table className="table table-bordered table-hover">
            <thead className="thead-light">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Viagem</th>
                <th scope="col">Nome</th>
                <th scope="col">Idade</th>
                <th scope="col">Género</th>
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
                        Coimbra - Lisboa
                    </td>
                    <td>
                        João Silva
                    </td>
                    <td>
                        49
                    </td>
                    <td>
                        Masculino
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="text-center">
                        <a href="/condutores/editar" data-toggle="tooltip" data-original-title="Editar">
                        <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                        <a href="/condutores" className="delete" data-toggle="tooltip" data-original-title="Apagar">
                        <i className="fas fa-trash-alt"></i></a>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        2
                    </td>
                    <td>
                        Faro - Porto
                    </td>
                    <td>
                        Paulo Mendes
                    </td>
                    <td>
                        36
                    </td>
                    <td>
                        Masculino
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="text-center">
                        <a href="/condutores/editar" data-toggle="tooltip" data-original-title="Editar">
                        <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                        <a href="/condutores" className="delete" data-toggle="tooltip" data-original-title="Apagar">
                        <i className="fas fa-trash-alt"></i></a>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        2
                    </td>
                    <td>
                        Lisboa - Madrid
                    </td>
                    <td>
                        André Miguel
                    </td>
                    <td>
                        28
                    </td>
                    <td>
                        Masculino
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="text-center">
                        <a href="/condutores/editar" data-toggle="tooltip" data-original-title="Editar">
                        <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                        <a href="/condutores" className="delete" data-toggle="tooltip" data-original-title="Apagar">
                        <i className="fas fa-trash-alt"></i></a>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        3
                    </td>
                    <td>
                        Porto - Leiria
                    </td>
                    <td>
                        José Silva
                    </td>
                    <td>
                        42
                    </td>
                    <td>
                        Masculino
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="col text-center">
                        28/10/2023
                    </td>
                    <td className="text-center">
                        <a href="/condutores/editar" data-toggle="tooltip" data-original-title="Editar">
                        <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                        <a href="/condutores" className="delete" data-toggle="tooltip" data-original-title="Apagar">
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

export default ListarCondutores;