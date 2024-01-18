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

// Services
import api from "../../services/api";

const NewVacancy = () => {
  // Variaveis
  // eslint-disable-next-line
  const [states, setStates] = useState([]);
  const [empresa, setEmpresa] = useState("Starbucks")
  const [formData, setFormData] = useState({
    companyLocation: {
      city: "",
      state: "",
      address: ""
    },
    jobType: "",
    categories: "",
    contactPersonId: "",
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
    responsibilities: "",
    requiredExperience: "",
    educationLevel: "",
    employmentContractType: "",
    jobStatus: "ACTIVE"
  });
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token");
  
  // GET STATES
  useEffect(() => {
    const carregarStates = async () => {
        try {
          // Importar diretamente o arquivo JSON
          const data = require('./states.json');
          setStates(data.estados);
        } catch (error) {
          console.error('Erro ao carregar Estados:', error);
        }
      };
  
      carregarStates();
  }, []);

  // GET USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      }
    };

    fetchUsers();
  }, [token]);

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
    } else if (name === "state" || name === "city" || name === "address") {
      setFormData((formData) => ({
        ...formData,
        companyLocation: {
          ...formData.companyLocation,
          [name]: value,
        },
      }));
    } else if (name === "contactPersonId") {
      setFormData({ ...formData, [name]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // POST JOB
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Verificação de campos vazios
    if (!formData.companyLocation || !formData.jobType || !formData.categories || !formData.contactPersonId ||
      !formData.jobTitle || !formData.requirements || !formData.jobDescription ||
      !formData.benefits || !formData.employmentType || !formData.applicationDeadline ||
      !formData.salaryRange.salaryRangeMin || !formData.salaryRange.salaryRangeMax || !formData.educationLevel || !formData.employmentContractType ||
      !formData.responsibilities || !formData.requiredExperience || !formData.companyLocation.state || !formData.companyLocation.city || !formData.companyLocation.address ) {
      toast.warn("Por favor, preencha todos os campos obrigatórios.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    // Limite de caracteres
    if (formData.jobDescription.length > 1000 ) {
      toast.warn("O limite de caracteres máximo em DESCRIÇÃO é: 1000", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }
    if (formData.benefits.length > 1000 ) {
      toast.warn("O limite de caracteres máximo em BENEFÍCIOS é: 1000", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }
    if (formData.responsibilities.length > 1000 ) {
      toast.warn("O limite de caracteres máximo em RESPONSABILIDADES é: 1000", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }
    if (formData.requiredExperience.length > 1000 ) {
      toast.warn("O limite de caracteres máximo em EXPERIÊNCIA REQUERIDA é: 1000", {
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

    console.log(formData);

    try {
      const response = await api.post('/jobs', formData);

      console.log('Resposta da API:', response.data);

      toast.success("A nova vaga foi ofertada com sucesso.", {
        position: toast.POSITION.BOTTOM_RIGHT
      });

    } catch (error) {
      console.error('Erro ao fazer a solicitação POST:', error);
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

            <SelectCustom
              label="Estado"
              id="state"
              name="state"
              value={formData.companyLocation.state}
              onChange={handleInputChange}
              options={states.map(state => ({ value: state.sigla, label: state.nome }))}
            />

            <SelectCustom
              label="Cidade"
              id="city"
              name="city"
              value={formData.companyLocation.city}
              onChange={handleInputChange}
              options={
                states.find(state => state.sigla === formData.companyLocation.state)?.cidades.map(city => ({
                  value: city,
                  label: city
                })) || []
              }
            />

            <InputCustom
              label="Endereço"
              placeholder="Digite a endereço da vaga"
              type="text"
              id="address"
              name="address"
              value={formData.companyLocation.address}
              onChange={handleInputChange}
            />

            <SelectCustom
              label="Responsável pela vaga"
              id="contactPersonId"
              name="contactPersonId"
              value={formData.contactPersonId.name}
              onChange={handleInputChange}
              options={users.map(user => ({ value: user.id, label: user.name }))}
            />

            <InputCustom
              label="Requisitos"
              placeholder="Digite os conhecimentos necessários para a vaga"
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

            <SelectCustom
              label="Escolaridade"
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleInputChange}
              options={[
                { value: 'ENSINO_FUNDAMENTAL_INCOMPLETO', label: 'Ensino Fundamental Incompleto' },
                { value: 'ENSINO_FUNDAMENTAL_COMPLETO', label: 'Ensino Fundamental Completo' },
                { value: 'ENSINO_MEDIO_INCOMPLETO', label: 'Ensino Médio Incompleto' },
                { value: 'ENSINO_MEDIO_COMPLETO', label: 'Ensino Médio Completo' },
                { value: 'EDUCACAO_SUPERIOR_INCOMPLETA', label: 'Educação Superior Incompleta' },
                { value: 'EDUCACAO_SUPERIOR_COMPLETA', label: 'Educação Superior Completa' },
                { value: 'POS_GRADUACAO_INCOMPLETA', label: 'Pós Graduação Incompleta' },
                { value: 'POS_GRADUACAO_COMPLETA', label: 'Pós Graduação Completa' },
                { value: 'MESTRADO_INCOMPLETO', label: 'Mestrado Incompleto' },
                { value: 'MESTRADO_COMPLETO', label: 'Mestrado Completo' },
                { value: 'DOUTORADO_INCOMPLETO', label: 'Doutorado Incompleto' },
                { value: 'DOUTORADO_COMPLETO', label: 'Doutorado Completo' },
                { value: 'OUTRO', label: 'Outro' },
              ]
              }
            />
            
            <SelectCustom
              label="Tipo de Contrato"
              id="employmentContractType"
              name="employmentContractType"
              value={formData.employmentContractType}
              onChange={handleInputChange}
              options={[
                { value: 'CLT', label: 'CLT' },
                { value: 'PJ', label: 'PJ' },
                { value: 'TEMPORARIO', label: 'Temporário' },
                { value: 'ESTAGIO', label: 'Estágio' },
                { value: 'FREELANCER', label: 'Freelancer' },
                { value: 'CONTRATO_POR_PROJETO', label: 'Contrato Por Projeto' },
                { value: 'OUTRO', label: 'Outro' },
              ]
              }
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

            <div></div>
            <div></div>

            <InputCustom
              label="Prazo de Candidatura"
              type="date"
              placeholder="Marque o prazo de candidatura"
              id="applicationDeadline"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
            />

            <TextareaCustom
              label="Descrição da vaga"
              id="jobDescription"
              name="jobDescription"
              rows={20}
              placeholder="Digite uma descrição a respeito da vaga oferecida"
              value={formData.jobDescription}
              onChange={handleInputChange}
              charmax={1000}
              countchar={formData.jobDescription.length}
            />

            <TextareaCustom
              label="Benefícios"
              id="benefits"
              name="benefits"
              rows={20}
              placeholder="Digite uma descrição a respeito dos benefícios relacionados com a vaga"
              value={formData.benefits}
              onChange={handleInputChange}
              charmax={1000}
              countchar={formData.benefits.length}
              />

            <TextareaCustom
              label="Responsabilidades"
              id="responsibilities"
              name="responsibilities"
              rows={20}
              placeholder="Digite quais serão as responsabilidades vinculadas a vaga"
              value={formData.responsibilities}
              onChange={handleInputChange}
              charmax={1000}
              countchar={formData.responsibilities.length}
            />

            <TextareaCustom
              label="Experiência Requerida"
              id="requiredExperience"
              name="requiredExperience"
              rows={20}
              placeholder="Digite quais experiências são necessárias para a vaga"
              value={formData.requiredExperience}
              onChange={handleInputChange}
              charmax={1000}
              countchar={formData.requiredExperience.length}
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