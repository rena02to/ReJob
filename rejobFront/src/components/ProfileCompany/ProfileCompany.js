import React from "react";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import NavBar from "../../components/NavBar";
import Title from "../../components/Title/Title";
import InputCustom from "../../components/InputCustom/InputCustom";
import TextareaCustom from "../../components/TextareaCustom/TextareaCustom";
import SelectCustom from "../../components/SelectCustom/SelectCustom";

// Assets
import './Profile.css'
import profileImg from '../../images/profile1.jpg'
import defaultImg from '../../images/default.png'
import { FaEdit } from "react-icons/fa";

// Services
import api from "../../services/api";
import UserService from "../../services/UserService";

const ProfileCompany = () => {
    const [profileImage, setProfileImage] = useState(profileImg);
    const [isEditing, setIsEditing] = useState(false);
    const userData = UserService();
    const [companyData, setCompanyData] = useState();
    const [formData, setFormData] = useState({
        cnpj: "",
        name: "",
        businessActivity: "",
        numberOfEmployees: "",
        headquarters: {
            state: "",
            city: "",
            address: ""
        },
        phone: "",
        institutionalDescription: "",
        email: "",
        companyType: ""
    });

    if (!userData) {
        return <div>Carregando...</div>
    }
    console.log(userData)

    const handleEnableEditing = (event) => {
        event.preventDefault();
        setIsEditing(true);
    };

    const handleDisableEditing = (event) => {
        event.preventDefault();
        setIsEditing(false);
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
                        value={userData.name}
                        type="text"
                        disabled={!isEditing}
                    />

                    <InputCustom
                        label="CNPJ"
                        id="cnpj"
                        name="cnpj"
                        value={userData.cnpj}
                        disabled={!isEditing}
                    />

                    <InputCustom
                        label="Tipo de Empresa"
                        id="companyType"
                        name="companyType"
                        value={userData.companyType}
                        disabled={!isEditing}
                    />

                    <InputCustom
                        label="Número de Funcionários"
                        id="numberOfEmployees"
                        name="numberOfEmployees"
                        value={userData.numberOfEmployees}
                        disabled={!isEditing}
                    />

                    <InputCustom
                        label="Ramo de Atividade"
                        id="businessActivity"
                        name="businessActivity"
                        value={userData.businessActivity}
                        type="text"
                        disabled={!isEditing}
                    />

                    <InputCustom
                        label="Telefone"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        type="text"
                        disabled={!isEditing}
                    />

                    <InputCustom
                        label="Estado"
                        id="email"
                        name="email"
                        value={userData.headquarters.state}
                        type="text"
                        disabled={!isEditing}
                    />

                    <InputCustom
                        label="Cidade"
                        id="email"
                        name="email"
                        value={userData.headquarters.city}
                        type="text"
                        disabled={!isEditing}
                    />

                    <InputCustom
                        label="Endereço"
                        id="email"
                        name="email"
                        value={userData.headquarters.address}
                        type="text"
                        disabled={!isEditing}
                    />

                    <TextareaCustom
                        label="Descrição Institucional"
                        className="textarea-item"
                        id="profissionalExperience"
                        name="profissionalExperience"
                        value={userData.institutionalDescription}
                        rows={10}
                        disabled={!isEditing}
                    />

                    <InputCustom
                        label="E-mail"
                        id="email"
                        name="email"
                        value={userData.user.email}
                        type="text"
                        disabled={!isEditing}
                    />

                    <InputCustom
                        label="Senha"
                        id="password"
                        name="password"
                        type="password"
                        value="**********"
                        disabled={!isEditing}
                    />

                </div>

                <div className="botoes">
                    {
                        isEditing ? (
                            <div>
                                <button onClick={handleDisableEditing} className="back">CANCELAR</button>
                                <button type="submit" className="save">SALVAR INFORMAÇÕES</button>
                            </div>
                        ) : (
                            <button onClick={handleEnableEditing} className="save">HABILITAR EDIÇÃO</button>
                        )
                    }
                </div>
            </form>
        </div>
    );
}

export default ProfileCompany;