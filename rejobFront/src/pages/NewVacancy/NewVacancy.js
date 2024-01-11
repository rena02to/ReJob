import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from '../../components/NavBar';
import Title from '../../components/Title/Title';

import './NewVacancy.css'

const NewVacancy = () => {
    const [empresa, setEmpresa] = useState('Starbucks');
    const [localidade, setLocalidade] = useState('');
    const [tipoDeVaga, setTipoDeVaga] = useState('');
    const [categorias, setCategorias] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [cargo, setCargo] = useState('');
    const [escolaridade, setEscolaridade] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const [regime, setRegime] = useState('');
    const [descricao, setDescricao] = useState('');
    const [beneficios, setBeneficios] = useState('');
    const [prazo, setPrazo] = useState('');

    const [users, setUsers] = useState([]);
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTcwNDk0MjUwOSwiZXhwIjoxNzA0OTQzOTQ5fQ.NbPs-lAz4Epd_2rdL17fg2tPvrzmAe0nLA1_WqVOTZM';

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/users', {
            headers: {
              'Authorization': 'Bearer ${token}'
            }
          });
          setUsers(response.data);
          console.log(users);
        } catch (error) {
          console.error('Erro ao obter usuários:', error);
        }
      };
  
      fetchUsers();
    }, []); 

    const handleLocalidadeChange = (event) => {
        setLocalidade(event.target.value);
      }
      
      const handleTipoVagaChange = (event) => {
        setTipoDeVaga(event.target.value);
      }
      
      const handleCategoriasChange = (event) => {
        setCategorias(event.target.value);
      }
      
      const handleResponsavelChange = (event) => {
        setResponsavel(event.target.value);
      }
      
      const handleCargoChange = (event) => {
        setCargo(event.target.value);
      }
      
      const handleEscolaridadeChange = (event) => {
        setEscolaridade(event.target.value);
      }
      
      const handleExperienciaChange = (event) => {
        setExperiencia(event.target.value);
      }
      
      const handleRegimeChange = (event) => {
        setRegime(event.target.value);
      }
      
      const handleDescricaoChange = (event) => {
        setDescricao(event.target.value);
      }
      
      const handleBeneficiosChange = (event) => {
        setBeneficios(event.target.value);
      }
      
      const handlePrazoChange = (event) => {
        setPrazo(event.target.value);
      }

      const handleFormSubmit = (event) => {
        event.preventDefault();

        // Verificação de campos vazios
        if (!empresa || !localidade || !tipoDeVaga || !categorias || 
            !responsavel || !cargo || !escolaridade || !experiencia || !regime || !descricao || !beneficios || !prazo) {
          toast.warn("Por favor, preencha todos os campos obrigatórios.", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          return;
        }

        // Verificação de prazo da candidatura
        const dataInseridaObj = new Date(prazo)
        const dataAtual = new Date()
        if (dataInseridaObj <= dataAtual) {
          toast.warn("A data inserida deve ser posterior à data atual.", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          return;
        }


        console.log('Empresa:', empresa);
        console.log('Localidade:', localidade);
        console.log('Tipo de Vaga:', tipoDeVaga);
        console.log('Categorias:', categorias);
        console.log('Reponsável pela vaga:', responsavel);
        console.log('Cargo ou Função:', cargo);
        console.log('Escolaridade:', escolaridade);
        console.log('Experiência:', experiencia);
        console.log('Regime:', regime);
        console.log('Descrição:', descricao);
        console.log('Benefícios:', beneficios);
        console.log('Prazo:', prazo);
      }

    return (
        <div>
            <NavBar></NavBar>

            <main>
                <Title 
                titulo="OFERTAR VAGA DE EMPREGO" 
                subtitulo="Registre uma nova vaga de emprego passando todas as informações necessárias abaixo.">
                </Title>
                
                <form>
                    <div className="campos">
                        <div className="campo">
                            <label>Empresa Contratante <span>*</span></label>
                            <input 
                            type="text" 
                            value={empresa} 
                            disabled
                            >

                            </input>
                        </div>
                        <div className="campo">
                            <label htmlFor="localidade">Localidade <span>*</span></label>
                            <input
                                id="localidade"
                                type="text"
                                placeholder="Digite a Localidade da Vaga"
                                value={localidade}
                                onChange={handleLocalidadeChange}
                            />
                        </div>
                        <div className="campo">
                            <label htmlFor="TipoVaga">Tipo de Vaga <span>*</span></label>
                            <select id="TipoVaga" value={tipoDeVaga} onChange={handleTipoVagaChange}>
                                <option value="">Selecione o tipo de vaga</option>
                                <option value="Meio Período">Meio Período</option>
                                <option value="Período Completo">Período Completo</option>
                            </select>
                        </div>
                        <div className="campo">
                            <label htmlFor="categorias">Categorias <span>*</span></label>
                            <input
                            id="categorias"
                            placeholder="Digite as categorias da vaga"
                            type="text"
                            value={categorias}
                            onChange={handleCategoriasChange}
                            ></input>
                        </div>
                        <div className="campo">
                            <label htmlFor="responsavel">Responsável pela vaga <span>*</span></label>
                            <select id="responsavel" value={responsavel} onChange={handleResponsavelChange}>
                                <option value="">Selecione o responsável pela vaga</option>
                                <option value="Joao">Joao</option>
                                <option value="Pedro">Pedro</option>
                            </select>
                        </div>
                        <div className="campo">
                            <label htmlFor="cargo">Cargo <span>*</span></label>
                            <input
                            id="cargo"
                            type="text"
                            value={cargo}
                            onChange={handleCargoChange}
                            placeholder="Digite o cargo ou função da vaga"
                            ></input>
                        </div>
                        <div className="campo">
                            <label htmlFor="escolaridade">Escolaridade <span>*</span></label>
                            <select id="escolaridade" value={escolaridade} onChange={handleEscolaridadeChange}>
                                <option value="">Selecione a escolaridade necessária</option>
                                <option value="Ensino Médio">Ensino Médio</option>
                                <option value="Ensino Superior Incompleto">Ensino Superior Incompleto</option>
                                <option value="Ensino Superior Completo">Ensino Superior Completo</option>
                            </select>
                        </div>
                        <div className="campo">
                            <label htmlFor="experiencia">Experiência <span>*</span></label>
                            <select id="experiencia" value={experiencia} onChange={handleExperienciaChange}>
                                <option value="">Selecione a experiência necessária</option>
                                <option value="1 Ano">1 Ano</option>
                                <option value="2-3 Anos">2-3 Anos</option>
                            </select>
                        </div>
                        <div className="campo">
                            <label htmlFor="regime">Regime de Contratação <span>*</span></label>
                            <select id="regime" value={regime} onChange={handleRegimeChange}>
                                <option value="">Selecione o regime de contratação da vaga</option>
                                <option value="CLT">CLT</option>
                                <option value="PJ">PJ</option>
                            </select>
                        </div>
                        <div className="campo">
                            <label htmlFor="descricao">Descrição da vaga <span>*</span></label>
                            <textarea 
                            id="descricao"
                            rows={8}
                            placeholder="Digite uma descrição a respeito da vaga oferecida"
                            value={descricao}
                            onChange={handleDescricaoChange}                            
                            >
                            </textarea>
                        </div>
                        <div className="campo">
                            <label htmlFor="beneficios">Benefícios <span>*</span></label>
                            <textarea rows={8} placeholder="Digite uma descrição a respeito dos benefícios relacionados com a vaga"
                            value={beneficios}
                            id="beneficios"
                            onChange={handleBeneficiosChange}
                            >
                            </textarea>
                        </div>
                        <div className="campo">
                            <label htmlFor="prazo">Prazo para Candidatura <span>*</span></label>
                            <input type="date" placeholder="Marque o prazo de candidatura"
                            id="prazo"
                            value={prazo}
                            onChange={handlePrazoChange}
                            ></input>
                        </div>
                    </div>

                    <div className="botoes">
                        <button className="back">VOLTAR</button>
                        <button type="submit" onClick={handleFormSubmit} className="save">CADASTRAR NOVA VAGA</button>
                    </div>
                </form> 
            </main>

            <ToastContainer />
        </div>
     );
}
 
export default NewVacancy;