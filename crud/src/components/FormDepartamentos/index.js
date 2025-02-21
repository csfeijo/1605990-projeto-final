import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  insertDepartamento, 
  getDepartamentoById, 
  updateDepartamento 
} from '../../services/departamentos';

const FormDepartamentos = () => {
  const { idDepartamento } = useParams();
  const [departamento, setDepartamento] = useState();
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [showErro, setShowErro] = useState('d-none');
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  const titulo = idDepartamento ? 'Atualização' : 'Cadastro';

  // Caso seja uma edição de departamento
  // Não podemos chamar um async dentro do useEffect, por isso criamos uma função FORA dele
  async function getDepto(idDepartamento) {
    setDepartamento(await getDepartamentoById(idDepartamento));
  }

  useEffect(() => {
    if (idDepartamento) {
      getDepto(idDepartamento)
    }
  }, [])

  useEffect(() => {
    if(departamento) {
      setNome(departamento[0].nome);
      setSigla(departamento[0].sigla);
    }
  },[departamento])

  return (
    <>
      <h3 className='mt-3 mb-3'>{titulo} de Departamento</h3>

      <div className='row'>
        
        <div className='col-md-10 col-sm-6 col-12'>

          <div className='form-floating'>
            <input 
              className='form-control'
              type='text'
              id='nome'
              placeholder='Nome'
              value={nome}
              onChange={e => {
                setNome(e.target.value)
              }}
            />
            <label htmlFor='nome'>Nome</label>
          </div>
        </div>

        <div className='col-md-2 col-sm-6 col-12'>
          <div className='form-floating'>
            <input 
              className='form-control'
              type='text'
              id='sigla'
              placeholder='Sigla'
              value={sigla}
              onChange={e => {
                setSigla(e.target.value)
              }}
            />
            <label htmlFor='sigla'>Sigla</label>
          </div>
        </div>

      </div>

      <div className='row'>
        <div className='col'>
          <button 
            className='btn btn-primary mt-3'
            onClick={() => {
              setShowErro('d-none');

              if (nome == '') {
                setShowErro('d-block');
                setErro('Preencha o nome!');
                return;
              }

              if (sigla == '') {
                setShowErro('d-block');
                setErro('Preencha a sigla!');
                return;
              }
              // aqui vamos chamar nossa API!
              if (departamento) {
                // se o state estiver preenchido então é uma EDIÇÃO
                updateDepartamento({
                  idDepartamento,
                  nome,
                  sigla
                });

              } else {
                // se o state estiver vazio/nulo então é uma INSERÇÃO
                insertDepartamento({
                  nome,
                  sigla
                });
              }

              navigate('/departamentos');
            }}>
            <i className='bi bi-save' /> Salvar
          </button>
        </div>
      </div>
      <div className={`alert alert-danger mt-3 ${showErro}`}>
        {erro}
      </div>
    </>
  )
}

export default FormDepartamentos;
