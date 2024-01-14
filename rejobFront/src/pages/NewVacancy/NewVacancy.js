import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import NavBar from '../../components/NavBar';
import Title from '../../components/Title/Title';
import TextareaCustom from "../../components/TextareaCustom/TextareaCustom";
import SelectCustom from "../../components/SelectCustom/SelectCustom";
import InputCustom from "../../components/InputCustom/InputCustom";

// CSS
import './NewVacancy.css'

const NewVacancy = () => {
  // Variaveis
  const [empresa, setEmpresa] = useState("Starbucks")
  const [formData, setFormData] = useState({
    companyLocation: "",
    jobType: "",
    categories: "",
    contactPerson: {
      id: ""
    },
    jobTitle: "",
    requirements: "",
    jobDescription: "",
    benefits: "",
    employmentType: "",
    applicationDeadline: "",
    salaryRange: {
      salaryRangeMin: "",
      salaryRangeMax: ""
    },
    jobStatus: "ACTIVE"
  });
  const [users, setUsers] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTcwNTA4MjE5NCwiZXhwIjoxNzA1MDg1MDc0fQ.q-pHo6vH-i7kUTs_iQLStF-z9OrbnqXyZ_vwaqCqZFs';

  // GET USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  // Atualizar valores dos inputs, selects e textareas nas variáveis
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("salaryRange")) {
      // Se o campo pertencer a salaryRange, atualize apenas esse campo
      setFormData((formData) => ({
        ...formData,
        salaryRange: {
          ...formData.salaryRange,
          [name]: parseFloat(value),
        },
      }));
    } else if (name === "contactPerson") {
      // Extrair o ID do valor selecionado
      const selectedUserId = parseInt(event.target.value, 10);

      // Encontrar o usuário correspondente no array 'users'
      const selectedUser = users.find((user) => user.id === selectedUserId);

      // Atualizar o estado 'contactPerson.id' com o ID do usuário selecionado
      setFormData((formData) => ({
        ...formData,
        contactPerson: {
          ...formData.contactPerson,
          id: selectedUserId,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // POST JOB
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Verificação de campos vazios
    if (!formData.companyLocation || !formData.jobType || !formData.categories || !formData.contactPerson ||
      !formData.jobTitle || !formData.requirements || !formData.jobDescription ||
      !formData.benefits || !formData.employmentType || !formData.applicationDeadline ||
      !formData.salaryRange.salaryRangeMin || !formData.salaryRange.salaryRangeMax) {
      toast.warn("Por favor, preencha todos os campos obrigatórios.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    // Verificação de prazo da candidatura
    const dataInseridaObj = new Date(formData.applicationDeadline)
    const dataAtual = new Date()
    if (dataInseridaObj <= dataAtual) {
      toast.warn("A data inserida deve ser posterior à data atual.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/jobs', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Resposta da API:', response.data);

      toast.success("A nova vaga foi ofertada com sucesso.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });

    } catch (error) {
      console.error('Erro ao fazer a solicitação POST:', error);
      console.log(formData)
    }
  };

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
            <InputCustom
              label="Título da Vaga"
              placeholder="Digite o Título da Vaga"
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />

            <InputCustom
              label="Tipo de Vaga"
              placeholder="Digite o tipo da vaga"
              type="text"
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleInputChange}
            />

            <SelectCustom
              label="Carga Horária"
              id="employmentType"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleInputChange}
              options={[
                { value: 'Meio Período', label: 'Meio Período' },
                { value: 'Período Integral', label: 'Período Integral' }
              ]
              }
            />

            <InputCustom
              label="Nome da Empresa"
              type="text"
              id="company"
              name="company"
              value={empresa}
              disabled
            />

            <InputCustom
              label="Localidade"
              placeholder="Digite a localização da empresa que oferta a vaga"
              type="text"
              id="companyLocation"
              name="companyLocation"
              value={formData.companyLocation}
              onChange={handleInputChange}
            />

            <SelectCustom
              label="Responsável pela vaga"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson.name}
              onChange={handleInputChange}
              options={users.map(user => ({ value: user.id, label: user.name }))}
            />

            <InputCustom
              label="Requerimentos"
              placeholder="Digite requerimentos necessários para a vaga"
              type="text"
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
            />

            <InputCustom
              label="Categorias"
              placeholder="Digite categorias relacionadas a vaga"
              type="text"
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={handleInputChange}
            />

            <div className="campo">
              <label htmlFor="salaryRangeMin">Faixa Salarial <span>*</span></label>
              <div>
                <input type="number" step="0.1" placeholder="Min (R$)"
                  id="salaryRangeMin"
                  name="salaryRangeMin"
                  value={formData.salaryRange.salaryRangeMin}
                  onChange={handleInputChange}
                ></input>
                <input type="number" step="0.1" placeholder="Max (R$)"
                  id="salaryRangeMax"
                  name="salaryRangeMax"
                  value={formData.salaryRange.salaryRangeMax}
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>

            {/* <div className="campo">
                              <label htmlFor="escolaridade">Escolaridade <span>*</span></label>
                              <select id="escolaridade">
                                  <option value="">Selecione a escolaridade necessária</option>
                                  <option value="1 Ano">Ensino Médio</option>
                                  <option value="2-3 Anos">Ensino Superior Incompleto</option>
                                  <option value="2-3 Anos">Ensino Superior Completo</option>
                              </select>
                          </div> */}

            {/* <div className="campo">
                              <label htmlFor="regime">Regime de Contratação <span>*</span></label>
                              <select id="regime" >
                                  <option value="">Selecione o regime de contratação da vaga</option>
                                  <option value="CLT">CLT</option>
                                  <option value="PJ">PJ</option>
                              </select>
                          </div> */}

            <TextareaCustom
              label="Descrição da vaga"
              id="jobDescription"
              name="jobDescription"
              rows={8}
              placeholder="Digite uma descrição a respeito da vaga oferecida"
              value={formData.jobDescription}
              onChange={handleInputChange}
            />

            <TextareaCustom
              label="Benefícios"
              id="benefits"
              name="benefits"
              rows={8}
              placeholder="Digite uma descrição a respeito dos benefícios relacionados com a vaga"
              value={formData.benefits}
              onChange={handleInputChange}
            />

            <InputCustom
              label="Prazo de Candidatura"
              type="date"
              placeholder="Marque o prazo de candidatura"
              id="applicationDeadline"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
            />
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