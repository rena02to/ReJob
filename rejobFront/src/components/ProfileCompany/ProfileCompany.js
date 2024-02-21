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
        password: "",
        companyType: ""
    });

    useEffect(() => {
        const carregarDadosDoUsuario = async () => {
            try {
                setFormData({
                    ...userData // Atualize o estado do formulário com os dados do usuário
                });
            } catch (error) {
                console.error("Erro ao salvar dados do usuário no form:", error);
            }
        };

        carregarDadosDoUsuario(); // Chame a função para carregar os dados do usuário
    }, []);

    if (!userData) {
        return <div>Carregando...</div>
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
        console.log('entrou');
        if (name === "state" || name === "city" || name === "address") {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    }

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
                        value={formData.cnpj}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />

                    <InputCustom
                        label="Tipo de Empresa"
                        id="companyType"
                        name="companyType"
                        value={formData.companyType}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />

                    <InputCustom
                        label="Número de Funcionários"
                        id="numberOfEmployees"
                        name="numberOfEmployees"
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
                        value={formData.phone}
                        type="text"
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />

                    <InputCustom
                        label="Estado"
                        id="email"
                        name="email"
                        // value={formData.headquarters.state}
                        type="text"
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />

                    <InputCustom
                        label="Cidade"
                        id="email"
                        name="email"
                        // value={formData.headquarters.city}
                        type="text"
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />

                    <InputCustom
                        label="Endereço"
                        id="email"
                        name="email"
                        // value={formData.headquarters.address}
                        type="text"
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />

                    <TextareaCustom
                        label="Descrição Institucional"
                        className="textarea-item"
                        id="profissionalExperience"
                        name="profissionalExperience"
                        value={formData.institutionalDescription}
                        rows={10}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />

                    <InputCustom
                        label="E-mail"
                        id="email"
                        name="email"
                        value={formData.user.email}
                        type="text"
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />

                    <InputCustom
                        label="Senha"
                        id="password"
                        name="password"
                        type="password"
                        value="**********"
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />

                </div>

                <div className="botoes">
                    {
                        isEditing ? (
                            <div>
                                <button onClick={handleDisableEditing} className="back">CANCELAR</button>
                                <button onClick={handleSubmit} type="submit" className="save">SALVAR INFORMAÇÕES</button>
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