import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  getDepartamentos, 
  removeDepartamento 
} from '../../services/departamentos';

const ListaDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState();
  const [excluindo, setExcluindo] = useState();

  async function loadDepartamentos() {
    setDepartamentos(await getDepartamentos());
  }

  useEffect(() => {
    loadDepartamentos();
  }, [])

  useEffect(() => {
    setExcluindo(false);
  }, [departamentos])

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className='mt-3'>Departamentos</h3>

        <Link 
          className='btn btn-secondary'
          to='/departamentos/new'>
            <i className='bi bi-plus'/> NOVO
        </Link>
      </div>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Nomes</th>
            <th>Sigla</th>
            <th className='text-center'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {!departamentos &&
          <tr>
            <td colSpan='3'>
              <div className='d-flex justify-content-center'>
                <div className='spinner-border text-secondary'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              </div>
            </td>
          </tr>
          }

          {departamentos && departamentos.map(d => { 
            return (
              <tr key={d.id_departamento}>
                <td>{d.nome}</td>
                <td>{d.sigla}</td>
                <td>
                  <div className='d-flex justify-content-evenly'>
                    
                    
                    <Link 
                      className='btn btn-outline-warning btn-sm'
                      to={`/departamentos/edit/${d.id_departamento}`}
                    >
                      <i className='bi bi-pencil-fill'/> Editar
                    </Link>



                    <button 
                      className='btn btn-outline-danger btn-sm'
                      disabled={excluindo}
                      onClick={() => {
                        
                        setExcluindo(true);

                        removeDepartamento({
                          idDepartamento: d.id_departamento,
                          callback: (resposta) => {
                            loadDepartamentos()

                            if (resposta == '') {
                              alert('Nao foi possivel excluir')
                            }
                          }
                        })
                        
                      }}
                    >
                      {excluindo &&
                        <span className='spinner-border spinner-border-sm' /> 
                      }
                      
                      {!excluindo &&
                        <i className="bi bi-trash3-fill"/> 
                      }
                      
                      {' '} Excluir

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