import React, { useRef, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import InputCustom from "../../components/InputCustom/InputCustom";
import profileImg from "../../images/profile1.jpg";
import { FaEdit } from "react-icons/fa";
import Title from "../../components/Title/Title";
import SelectCustom from "../../components/SelectCustom/SelectCustom";
import Tabs from "../../components/Tabs/Tabs";
import Tab from "../../components/Tabs/Tab";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const CollaboratorDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    collaboratorType: "",
    companyId: "",
    jobTitle: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(profileImg);
  const [states, setStates] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [currentUser, setcurrentUser] = useState({});
  const navigate = useNavigate();

  const options = [
    { value: "PRIVATE_ENTERPRISE", label: "Empresa" },
    { value: "ONG", label: "ONG" },
  ];

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
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const createNewJob = () => {
    navigate("/nova-vaga");
  };

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await api.get("/companies");
        const user = await api.get("/users/me");
        console.log(user);
        setCompanies(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    getCompanies();
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <section className="p-5">
          <Title
            titulo="PERFIL"
            subtitulo="Detalhes profissionais do colaborador."
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
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
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
        </section>
        <section className="flex flex-col gap-2">
          <div className="flex flex-wrap justify-between items-end">
            <div className="w-full md:w-1/2">
              <Title
                titulo="POSTAGEM DE VAGAS"
                subtitulo="Acompanhe abaixo o andamento de todas as vagas que sua empresa ofertou."
              />
            </div>
            <div className="botoes w-full md:w-1/2">
              <button className="save" onClick={() => createNewJob()}>
                OFERTAR NOVA VAGA
              </button>
            </div>
          </div>
          <InputCustom
            placeholder="Digite o nome da vaga ou empresa"
            type="text"
            id="filter"
            name="filter"
            width="100%"
          />

          <div className="flex  w-full">
            <Tabs>
              <Tab label="Em andamento">
                <p>Nada para ver aqui!</p>
              </Tab>
              <Tab label="Finalizadas">
                <p>Nada para ver aqui!</p>
              </Tab>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer></Footer>;
    </>
  );
};

export default CollaboratorDashboard;
