import React from 'react';

const ListarViagens = () => {
  return (
  <>
    <div className="container mt-4">
        <div className="table-responsive">
        <h2 className="text-center mb-4">Lista de Viagens</h2>
        <table className="table table-bordered table-hover">
        <thead className="thead-light">
        <tr>
            <th scope="col">#</th>
            <th scope="col">Autocarro</th>
            <th scope="col">Paragens</th>
            <th scope="col">Data da Viagem</th>
            <th scope="col">Hora de Partida</th>
            <th scope="col">Hora de Chegada</th>
            <th scope="col">Preço</th>
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
                <ul className="list-unstyled">
                    <li>Lisboa</li>
                    <li>Coimbra</li>
                    <li>Aveiro</li>
                </ul>
            </td>
            <td>
                25/10/2025
            </td>
            <td>
                9:00
            </td>
            <td>
                10:00
            </td>
            <td>
                15€
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="text-center">
                <a href="/viagens/editar" className="edit" data-toggle="tooltip" data-original-title="Editar">
                <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                <a href="/viagens" className="delete" data-toggle="tooltip" data-original-title="Apagar">
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
                <ul className="list-unstyled">
                    <li>Lisboa</li>
                    <li>Coimbra</li>
                    <li>Évora</li>
                </ul>
            </td>
            <td>
                08/06/2025
            </td>
            <td>
                9:00
            </td>
            <td>
                10:00
            </td>
            <td>
                15€
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="text-center">
                <a href="/viagens/editar" className="edit" data-toggle="tooltip" data-original-title="Editar">
                <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                <a href="/viagens" className="delete" data-toggle="tooltip" data-original-title="Apagar">
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
                <ul className="list-unstyled">
                    <li>Faro</li>
                    <li>Évora</li>
                    <li>Lisboa</li>
                    <li>Leiria</li>
                </ul>
            </td>
            <td>
                15/05/2025
            </td>
            <td>
                9:00
            </td>
            <td>
                13:00
            </td>
            <td>
                20€
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="text-center">
                <a href="/viagens/editar" className="edit" data-toggle="tooltip" data-original-title="Editar">
                <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                <a href="/viagens" className="delete" data-toggle="tooltip" data-original-title="Apagar">
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
                <ul className="list-unstyled">
                    <li>Coimbra</li>
                    <li>Leiria</li>
                    <li>Lisboa</li>
                </ul>
            </td>
            <td>
                29/08/2025
            </td>
            <td>
                9:00
            </td>
            <td>
                15:00
            </td>
            <td>
                25€
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="col text-center">
                25/10/2023
            </td>
            <td className="text-center">
                <a href="/viagens/editar" className="edit" data-toggle="tooltip" data-original-title="Editar">
                <i className="fas fa-pencil"></i></a>&nbsp;&nbsp;
                <a href="/viagens" className="delete" data-toggle="tooltip" data-original-title="Apagar">
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

export default ListarViagens;