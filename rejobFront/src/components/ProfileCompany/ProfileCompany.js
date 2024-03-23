import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Title from "../../components/Title/Title";
import InputCustom from "../../components/InputCustom/InputCustom";
import TextareaCustom from "../../components/TextareaCustom/TextareaCustom";
import SelectCustom from "../../components/SelectCustom/SelectCustom";

// Assets
import "./Profile.css";
import profileImg from "../../images/profile1.jpg";

// Services
import api from "../../services/api";
import UserService from "../../services/UserService";

const ProfileCompany = () => {
  const [profileImage, setProfileImage] = useState(profileImg);
  const [states, setStates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const userData = UserService();
  const [formData, setFormData] = useState({
    cnpj: "",
    name: "",
    businessActivity: "",
    numberOfEmployees: "",
    headquarters: {
      state: "",
      city: "",
      address: "",
    },
    phone: "",
    institutionalDescription: "",
    email: "",
    password: "",
    companyType: "",
  });

  // GET STATES
  useEffect(() => {
    const carregarStates = async () => {
      try {
        // Importar diretamente o arquivo JSON
        const data = require("../../utils/states.json");
        setStates(data.estados);
      } catch (error) {
        console.error("Erro ao carregar Estados:", error);
      }
    };

    carregarStates();
  }, [setStates]);

  useEffect(() => {
    if (userData) {
      setFormData({
        cnpj: userData.cnpj,
        name: userData.name,
        businessActivity: userData.businessActivity,
        numberOfEmployees: userData.numberOfEmployees,
        headquarters: {
          state: userData.headquarters.state,
          city: userData.headquarters.city,
          address: userData.headquarters.address,
        },
        phone: userData.phone,
        institutionalDescription: userData.institutionalDescription,
        companyType: userData.companyType,
        email: userData.email,
      });
    }
  }, [userData]);

  if (!userData) {
    return <div>Carregando...</div>;
  }

  const handleEnableEditing = (event) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const handleDisableEditing = (event) => {
    event.preventDefault();
    setIsEditing(false);
  };

  // Atualizar valores dos inputs, selects e textareas nas variáveis
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "cnpj") {
      formatCnpj(value);
    } else if (name === "phone") {
      formatPhone(value);
    } else if (name === "state" || name === "city" || name === "address") {
      setFormData((formData) => ({
        ...formData,
        headquarters: {
          ...formData.headquarters,
          [name]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const formatCnpj = (cnpj) => {
    // Remove caracteres não numéricos
    const onlyNumbers = cnpj.replace(/[^\d]/g, "");

    // Limita o tamanho máximo do CNPJ
    const formattedCnpj = onlyNumbers.slice(0, 14);

    // Adiciona pontos, barra e traço conforme o formato do CNPJ
    const displayCnpj = formattedCnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );

    // Atualiza o estado com o CNPJ formatado
    setFormData({ ...formData, cnpj: formattedCnpj, displayCnpj });
  };

  const isValidEmail = (email) => {
    // Expressão regular para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatPhone = (phone) => {
    // Remove caracteres não numéricos
    const onlyNumbers = phone.replace(/[^\d]/g, "");

    // Limita o tamanho máximo do número de telefone
    const formattedPhone = onlyNumbers.slice(0, 11);

    // Adiciona parênteses, espaço e traço conforme o formato do telefone
    const displayPhone = formattedPhone.replace(
      /^(\d{2})(\d{4,5})(\d{4})$/,
      "($1) $2-$3"
    );

    // Atualiza o estado com o telefone formatado
    setFormData({ ...formData, phone: formattedPhone, displayPhone });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificação de campos vazios
    if (
      !formData.cnpj ||
      !formData.name ||
      !formData.email ||
      !formData.businessActivity ||
      !formData.headquarters.state ||
      !formData.headquarters.city ||
      !formData.companyType ||
      !formData.headquarters.address ||
      !formData.institutionalDescription ||
      !formData.numberOfEmployees ||
      !formData.phone
    ) {
      toast.warn("Por favor, preencha todos os campos obrigatórios.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    // Verificacao email
    if (!isValidEmail(formData.email)) {
      toast.warn("Por favor, verifique o seu e-mail e tente novamente!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    // Limite de caracteres
    if (formData.institutionalDescription.length > 1000) {
      toast.warn("O limite de caracteres máximo em DESCRIÇÃO é: 1000", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    try {
      await api.put(`/companies/${userData.id}`, formData);
      toast.success("Os dados da empresa foram atualizados com sucesso.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      toast.error("Não foi possível atualizar os dados da empresa.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    handleDisableEditing(event);
  };

  return (
    <div>
      <Title
        titulo="PERFIL"
        subtitulo="Detalhes pessoais e profissionais do usuário."
      />

      {/* <div className="image-box">
                <img src={profileImg} />
            </div>

            {
                isEditing ? (
                    <div className="selecionarImagem">
                        <input
                            type="file"
                            accept="image/*" // Limita a seleção apenas a arquivos de imagem
                            style={{ display: 'none' }} // Torna o input invisível
                        />
                    </div>
                ) : null
            } */}

      <form>
        <div className="campos">
          <InputCustom
            label="Nome da Empresa"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            disabled={!isEditing}
            onChange={handleInputChange}
          />

          <InputCustom
            label="CNPJ"
            id="cnpj"
            name="cnpj"
            value={formData.cnpj || ""}
            disabled={!isEditing}
            onChange={handleInputChange}
          />

          <SelectCustom
            disabled={!isEditing}
            label="Tipo de Empresa"
            id="companyType"
            name="companyType"
            value={formData.companyType}
            onChange={handleInputChange}
            options={[
              { value: "PRIVATE_ENTERPRISE", label: "Empresa Comercial" },
              { value: "ONG", label: "ONG" },
            ]}
          />

          <InputCustom
            label="Número de Funcionários"
            id="numberOfEmployees"
            name="numberOfEmployees"
            type="number"
            value={formData.numberOfEmployees}
            disabled={!isEditing}
            onChange={handleInputChange}
          />

          <InputCustom
            label="Ramo de Atividade"
            id="businessActivity"
            name="businessActivity"
            value={formData.businessActivity}
            type="text"
            disabled={!isEditing}
            onChange={handleInputChange}
          />

          <InputCustom
            label="Telefone"
            id="phone"
            name="phone"
            disabled={!isEditing}
            value={formData.phone || ""}
            onChange={handleInputChange}
            type="text"
          />

          <SelectCustom
            label="Estado"
            id="state"
            name="state"
            disabled={!isEditing}
            value={formData.headquarters.state}
            onChange={handleInputChange}
            options={states.map((state) => ({
              value: state.sigla,
              label: state.nome,
            }))}
          />

          <SelectCustom
            label="Cidade"
            id="city"
            name="city"
            disabled={!isEditing}
            value={formData.headquarters.city}
            onChange={handleInputChange}
            options={
              states
                .find((state) => state.sigla === formData.headquarters.state)
                ?.cidades.map((city) => ({
                  value: city,
                  label: city,
                })) || []
            }
          />

          <InputCustom
            label="Endereço"
            id="address"
            name="address"
            value={formData.headquarters.address}
            type="text"
            disabled={!isEditing}
            onChange={handleInputChange}
          />

          <InputCustom
            label="E-mail"
            id="email"
            name="email"
            value={formData.email}
            type="text"
            disabled={!isEditing}
            onChange={handleInputChange}
          />

          <TextareaCustom
            label="Descrição Institucional"
            className="textarea-item"
            id="institutionalDescription"
            name="institutionalDescription"
            value={formData.institutionalDescription}
            rows={10}
            charmax={1000}
            countchar={formData.institutionalDescription.length}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </div>

        <div className="botoes">
          {isEditing ? (
            <div>
              <button onClick={handleDisableEditing} className="back">
                CANCELAR
              </button>
              <button onClick={handleSubmit} type="submit" className="save">
                SALVAR INFORMAÇÕES
              </button>
            </div>
          ) : (
            <button onClick={handleEnableEditing} className="save">
              HABILITAR EDIÇÃO
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProfileCompany;
