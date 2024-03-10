import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Title from "../../components/Title/Title";
import InputCustom from "../../components/InputCustom/InputCustom";
import SelectCustom from "../../components/SelectCustom/SelectCustom";

// Assets
import "./Profile.css";
import profileImg from "../../images/profile1.jpg";

// Services
import api from "../../services/api";
import UserService from "../../services/UserService";

const ProfileCollaborator = () => {
  const [profileImage, setProfileImage] = useState(profileImg);
  const [companies, setCompanies] = useState([]);
  const [states, setStates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const userData = UserService();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    collaboratorType: "",
    companyId: "",
    jobTitle: "",
    password: "",
  });

  const options = [
    { value: "PRIVATE_ENTERPRISE", label: "Empresa" },
    { value: "ONG", label: "ONG" },
  ];

  // GET STATES
  useEffect(() => {
    const carregarStates = async () => {
      try {
        const data = require("../../utils/states.json");
        const response = await api.get("/companies");
        setCompanies(response.data);
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
        name: userData.user?.name,
        email: userData.user?.email,
        cpf: userData.user?.cpf,
        collaboratorType: userData?.collaboratorType,
        companyId: userData?.companyId,
        jobTitle: userData.jobTitle,
        password: userData.user?.password,
      });
    }
  }, [userData]);

  // if (!userData) {
  //   return <div>Carregando...</div>;
  // }

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
    if (name === "phone") {
      formatPhone(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      !formData.cpf ||
      !formData.name ||
      !formData.email ||
      !formData.collaboratorType ||
      !formData.jobTitle ||
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

    try {
      await api.put(`/users/${userData.id}/collaborator`, formData);
      toast.success("Os dados do colaborador foram atualizados com sucesso.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.error("Erro ao fazer a solicitação POST:", error);
    }

    handleDisableEditing(event);
  };

  return (
    <div>
      <Title
        titulo="PERFIL"
        subtitulo="Detalhes pessoais e profissionais do usuário."
      />

      <div className="image-box">
        <img src={profileImg} />
      </div>

      {isEditing ? (
        <div className="selecionarImagem">
          <input type="file" accept="image/*" style={{ display: "none" }} />
        </div>
      ) : null}

      <form>
        <div className="campos md:!grid-cols-3">
          <InputCustom
            label="Nome Completo"
            id="name"
            name="name"
            value={formData.name}
            type="text"
            disabled={!isEditing}
            onChange={handleInputChange}
          />

          <SelectCustom
            label="Colaborador vinculado a uma..."
            id="collaboratorType"
            name="collaboratorType"
            value={formData.collaboratorType}
            onChange={handleInputChange}
            disabled={!isEditing}
            options={options}
          />

          <SelectCustom
            label="Empresa"
            id="companyId"
            name="companyId"
            value={formData.companyId}
            onChange={handleInputChange}
            disabled={!isEditing}
            options={companies.map((company) => {
              return { value: company.id, label: company.name };
            })}
          />

          <InputCustom
            label="Cargo ou Função"
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
          />

          <InputCustom
            label="Endereço de E-mail"
            id="email"
            name="email"
            value={formData.email}
            type="text"
            disabled={!isEditing}
            onChange={handleInputChange}
          />

          <InputCustom
            label="Senha"
            id="password"
            name="password"
            autoComplete="password"
            value={formData.password}
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
              <button type="submit" className="save">
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

export default ProfileCollaborator;
