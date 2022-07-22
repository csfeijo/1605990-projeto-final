import React, { useEffect, useState } from 'react';
import getDepartamentos from '../../services/departamentos';

const ListaDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState();

  async function loadDepartamentos() {
    setDepartamentos(await getDepartamentos());
  }

  useEffect(() => {
    loadDepartamentos()
  }, [])

  return (
    <>
      <h3 className='mt-3'>Departamentos</h3>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Nomes</th>
            <th>Sigla</th>
            <th className='text-center'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {departamentos && departamentos.map(d => { 
            return (
              <tr key={d.id_departamento}>
                <td>{d.nome}</td>
                <td>{d.sigla}</td>
                <td>
                  <div className='d-flex justify-content-evenly'>
                    <button className='btn btn-outline-warning btn-sm'>
                      <i className='bi bi-pencil-fill'/> Editar
                    </button>
                    <button className='btn btn-outline-danger btn-sm'>
                      <i className="bi bi-trash3-fill"/> Excluir
                    </button>
                  </div>

                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default ListaDepartamentos;