import React from "react";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import NavBar from "../../components/NavBar";
import Title from "../../components/Title/Title";
import InputCustom from "../../components/InputCustom/InputCustom";
import TextareaCustom from "../../components/TextareaCustom/TextareaCustom";
import SelectCustom from "../../components/SelectCustom/SelectCustom";

// Assets
import "./Profile.css";
import profileImg from "../../images/profile1.jpg";
import { FaEdit } from "react-icons/fa";

// Services
import api from "../../services/api";

const Profile = () => {
  const [userData, setUserData] = useState();
  const token = sessionStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    dateOfBirth: "",
    residenceLocation: "",
    prisonCode: "",
    sentenceRegime: "",
    education: "",
    areasOfInterest: "",
    profissionalExperience: "",
    skillsAndQualifications: "",
    educationalHistory: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(profileImg);

  const fillFormDataFromUser = (userData) => {
    setFormData({
      name: userData.user.name || "",
      email: userData.user.email || "",
      cpf: userData.cpf || "",
      dateOfBirth: userData.dateOfBirth || "",
      residenceLocation: userData.residenceLocation || "",
      prisonCode: userData.prisonCode || "",
      sentenceRegime: userData.sentenceRegime || "",
      educationLevel: userData.educationLevel || "",
      areasOfInterest: userData.areasOfInterest || "",
      profissionalExperience: userData.professionalExperience || "",
      skillsAndQualifications: userData.skillsAndQualifications || "",
      educationalHistory: userData.educationalHistory || "",
    });
  };

  // GET USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users/3/employee");
        setUserData(response.data);

        // Verifica se o usuário existe antes de chamar a função fillFormDataFromUser
        if (
          response.data &&
          response.data.user &&
          response.data.user.name &&
          response.data.user.email &&
          response.data.cpf &&
          response.data.prisonCode &&
          response.data.educationLevel &&
          response.data.dateOfBirth &&
          response.data.residenceLocation &&
          response.data.sentenceRegime &&
          response.data.professionalExperience &&
          response.data.areasOfInterest &&
          response.data.skillsAndQualifications &&
          response.data.educationalHistory
        ) {
          fillFormDataFromUser(response.data);
          // setProfileImage(response.data.user.profilePic)
        }
      } catch (error) {
        console.error("Erro ao obter usuário:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEnableEditing = (event) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const handleDisableEditing = (event) => {
    event.preventDefault();
    setIsEditing(false);
    fillFormDataFromUser(userData);
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    toast.success("Alterações salvas com sucesso!");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Faça algo com o arquivo, como armazená-lo no estado ou enviá-lo para o servidor
    setSelectedFile(file);

    // Converte o arquivo de imagem para uma URL de objeto Blob ou Data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <NavBar />

      <main>
        <section className="p-5">
          <Title
            titulo="PERFIL"
            subtitulo="Detalhes pessoais e profissionais do usuário."
          />

          <div className="image-box">
            <img src={profileImg} alt="imagem de perfil" />
            {isEditing ? (
              <button
                className="edit-button"
                onClick={() => fileInputRef.current.click()}
              >
                {" "}
                <FaEdit />{" "}
              </button>
            ) : null}
          </div>

          {isEditing ? (
            <div className="selecionarImagem">
              <input
                type="file"
                accept="image/*" // Limita a seleção apenas a arquivos de imagem
                onChange={handleFileChange}
                style={{ display: "none" }} // Torna o input invisível
                ref={fileInputRef} // Referência para o input
              />
            </div>
          ) : null}

          <form>
            <div className="campos">
              <InputCustom
                label="Nome Completo"
                id="name"
                name="name"
                value={formData.name}
                type="text"
                disabled={!isEditing}
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
                label="CPF"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                type="text"
                disabled={!isEditing}
                onChange={handleInputChange}
              />

              <InputCustom
                label="Data de Nascimento"
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                disabled={!isEditing}
                onChange={handleInputChange}
              />

              <InputCustom
                label="Local de Residência"
                id="residenceLocation"
                name="residenceLocation"
                value={formData.residenceLocation}
                type="text"
                disabled={!isEditing}
                onChange={handleInputChange}
              />

              <InputCustom
                label="Código de Cadeia"
                id="prisonCode"
                name="prisonCode"
                value={formData.prisonCode}
                type="text"
                disabled={!isEditing}
                onChange={handleInputChange}
              />

              <SelectCustom
                label="Regime de Cumprimento de Pena"
                id="sentenceRegime"
                name="sentenceRegime"
                disabled={!isEditing}
                value={formData.sentenceRegime}
                // onChange={handleInputChange}
                options={[
                  { value: "FECHADO", label: "Fechado" },
                  { value: "SEMIABERTO", label: "Semi Aberto" },
                  { value: "ABERTO", label: "Aberto" },
                  { value: "LIBERADO", label: "Liberado" },
                ]}
                onChange={handleInputChange}
              />

              <SelectCustom
                label="Escolaridade"
                id="educationLevel"
                name="educationLevel"
                disabled={!isEditing}
                value={formData.educationLevel}
                options={[
                  {
                    value: "ENSINO_FUNDAMENTAL_INCOMPLETO",
                    label: "Ensino Fundamental Incompleto",
                  },
                  {
                    value: "ENSINO_FUNDAMENTAL_COMPLETO",
                    label: "Ensino Fundamental Completo",
                  },
                  {
                    value: "ENSINO_MEDIO_INCOMPLETO",
                    label: "Ensino Médio Incompleto",
                  },
                  {
                    value: "ENSINO_MEDIO_COMPLETO",
                    label: "Ensino Médio Completo",
                  },
                  {
                    value: "EDUCACAO_SUPERIOR_INCOMPLETA",
                    label: "Educação Superior Incompleta",
                  },
                  {
                    value: "EDUCACAO_SUPERIOR_COMPLETA",
                    label: "Educação Superior Completa",
                  },
                  {
                    value: "POS_GRADUACAO_INCOMPLETA",
                    label: "Pós Graduação Incompleta",
                  },
                  {
                    value: "POS_GRADUACAO_COMPLETA",
                    label: "Pós Graduação Completa",
                  },
                  {
                    value: "MESTRADO_INCOMPLETO",
                    label: "Mestrado Incompleto",
                  },
                  { value: "MESTRADO_COMPLETO", label: "Mestrado Completo" },
                  {
                    value: "DOUTORADO_INCOMPLETO",
                    label: "Doutorado Incompleto",
                  },
                  { value: "DOUTORADO_COMPLETO", label: "Doutorado Completo" },
                  { value: "OUTRO", label: "Outro" },
                ]}
                onChange={handleInputChange}
              />

              {/* 
                        <div className="interests-container">
                            <h2>Áreas de Interesse/Ocupações</h2>
                            <div className="interest-checkboxes">
                                {
                                    formData.areasOfInterest.map((area, index) => (
                                        <label key={index}>
                                            <input key={index} type="checkbox" name={area} value={area} disabled={!isEditing}
                                                checked />
                                            {area}
                                        </label>
                                    ))
                                }

                                <label>
                                    <input type="checkbox" name="interest" value="design" disabled={!isEditing}
                                    />
                                    Design
                                </label>

                                <label>
                                    <input type="checkbox" name="interest" value="design" disabled={!isEditing}
                                    />
                                    Programming
                                </label>

                                <label>
                                    <input type="checkbox" name="interest" value="marketing" disabled={!isEditing}
                                    />
                                    Marketing
                                </label>

                            </div>
                        </div> */}

              <div className="textarea-box">
                <TextareaCustom
                  label="Experiência Profisisonal"
                  className="textarea-item"
                  id="profissionalExperience"
                  name="profissionalExperience"
                  value={formData.profissionalExperience}
                  rows={10}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />

                <TextareaCustom
                  label="Habilidades e Qualificações"
                  className="textarea-item"
                  id="skillsAndQualifications"
                  name="skillsAndQualifications"
                  value={formData.skillsAndQualifications}
                  rows={10}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />

                <TextareaCustom
                  label="Histórico Educacional"
                  className="textarea-item"
                  id="educationalHistory"
                  name="educationalHistory"
                  value={formData.educationalHistory}
                  rows={10}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                />
              </div>
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
        </section>
      </main>
    </div>
  );
};

export default Profile;
