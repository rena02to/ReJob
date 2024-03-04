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

const ProfileRemand = () => {
    const [states, setStates] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const userData = UserService();
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        cpf: "",
        prisonCode: "",
        educationLevel: "",
        dateOfBirth: "",
        residenceLocation: {
            state: "",
            city: "",
            address: "",
        },
        sentenceRegime: "",
        professionalExperience: "",
        areasOfInterest: "",
        skillsAndQualifications: "",
        educationalHistory: ""
    });

    // GET STATES
    useEffect(() => {
        const carregarStates = async () => {
            try {
                // Importar diretamente o arquivo JSON
                const data = require('../../utils/states.json');
                setStates(data.estados);
            } catch (error) {
                console.error('Erro ao carregar Estados:', error);
            }
        };

        carregarStates();
    }, [setStates]);

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.user.name,
                phoneNumber: userData.user.phoneNumber,
                email: userData.user.email,
                cpf: userData.cpf,
                prisonCode: userData.prisonCode,
                educationLevel: userData.educationlevel,
                dateOfBirth: userData.dateOfBirth,
                residenceLocation: {
                    state: userData.residenceLocation.state,
                    city: userData.residenceLocation.city,
                    address: userData.residenceLocation.address,
                },
                sentenceRegime: userData.sentenceRegime,
                professionalExperience: userData.professionalExperience,
                areasOfInterest: userData.areasOfInterest,
                skillsAndQualifications: userData.skillsAndQualifications,
                educationalHistory: userData.educationalHistory,
            });
        }
    }, [userData]);

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
        if (name === "cnpj") {
            formatCnpj(value);
        } else if (name === "phone") {
            formatPhone(value);
        } else if (name === "state" || name === "city" || name === "address") {
            setFormData((formData) => ({
                ...formData,
                residenceLocation: {
                    ...formData.residenceLocation,
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
    }

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
            !formData.name ||
            !formData.phoneNumber ||
            !formData.email ||
            !formData.cpf ||
            !formData.prisonCode ||
            !formData.educationLevel ||
            !formData.dateOfBirth ||
            !formData.residenceLocation.state ||
            !formData.residenceLocation.city ||
            !formData.residenceLocation.address ||
            !formData.sentenceRegime ||
            !formData.professionalExperience ||
            !formData.areasOfInterest ||
            !formData.skillsAndQualifications ||
            !formData.educationalHistory
        ) {
            toast.warn("Por favor, preencha todos os campos obrigatórios.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return;
        }

        // Verificacao email
        if (!isValidEmail(formData.email)) {
            toast.warn("Por favor, verifique o seu e-mail e tente novamente!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return;
        }

        // Limite de caracteres
        if (formData.professionalExperience.length > 1000) {
            toast.warn("O limite de caracteres máximo em DESCRIÇÃO é: 1000", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return;
        }

        if (formData.skillsAndQualifications.length > 1000) {
            toast.warn("O limite de caracteres máximo em DESCRIÇÃO é: 1000", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return;
        }

        if (formData.educationalHistory.length > 1000) {
            toast.warn("O limite de caracteres máximo em DESCRIÇÃO é: 1000", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return;
        }


        // try {
        //     await api.put(`/companies/${userData.id}`, formData);
        //     toast.success("Os dados da empresa foram editados com sucesso.", {
        //         position: toast.POSITION.BOTTOM_RIGHT,
        //     });
        // } catch (error) {
        //     console.error("Erro ao fazer a solicitação POST:", error);
        // }

        handleDisableEditing(event);
    }

    return (
        <div>
            <Title
                titulo="PERFIL"
                subtitulo="Detalhes pessoais e profissionais do usuário."
            />

            <form>
                <div className="campos">
                    <InputCustom
                        label="Nome Completo"
                        id="name"
                        name="name"
                        value={formData.name}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        placeholder="Digite o Nome completo"
                        type="text"
                    />

                    <InputCustom
                        label="Telefone"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="(XX) XXXX-XXXX"
                        type="text"
                    />

                    <InputCustom
                        label="Endereço de E-mail"
                        placeholder="Digite o E-mail"
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        autoComplete="username"
                    />

                    <InputCustom
                        label="CPF"
                        id="cpf"
                        name="cpf"
                        disabled={!isEditing}
                        value={formData.cpf || ""}
                        onChange={handleInputChange}
                        type="text"
                    />

                    <InputCustom
                        label="Código de Prisão"
                        id="prisonCode"
                        name="prisonCode"
                        disabled={!isEditing}
                        value={formData.prisonCode}
                        onChange={handleInputChange}
                        placeholder="Digite o Código de Prisão"
                        type="text"
                    />

                    <SelectCustom
                        label="Escolaridade"
                        id="educationLevel"
                        name="educationLevel"
                        disabled={!isEditing}
                        value={formData.educationLevel}
                        onChange={handleInputChange}
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
                            { value: "MESTRADO_INCOMPLETO", label: "Mestrado Incompleto" },
                            { value: "MESTRADO_COMPLETO", label: "Mestrado Completo" },
                            {
                                value: "DOUTORADO_INCOMPLETO",
                                label: "Doutorado Incompleto",
                            },
                            { value: "DOUTORADO_COMPLETO", label: "Doutorado Completo" },
                            { value: "OUTRO", label: "Outro" },
                        ]}
                    />

                    <InputCustom
                        label="Data de Aniversário"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        disabled={!isEditing}
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        placeholder="Digite o Data de Aniversário"
                        type="date"
                    />

                    <SelectCustom
                        label="Estado"
                        id="state"
                        name="state"
                        value={formData.residenceLocation.state}
                        disabled={!isEditing}
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
                        value={formData.residenceLocation.city}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        options={
                            states
                                .find(
                                    (state) => state.sigla === formData.residenceLocation.state
                                )
                                ?.cidades.map((city) => ({
                                    value: city,
                                    label: city,
                                })) || []
                        }
                    />

                    <InputCustom
                        label="Endereço"
                        placeholder="Digite a endereço da empresa"
                        type="text"
                        id="address"
                        disabled={!isEditing}
                        name="address"
                        value={formData.residenceLocation.address}
                        onChange={handleInputChange}
                    />

                    <SelectCustom
                        label="Regime de Cumprimento de Pena"
                        id="sentenceRegime"
                        name="sentenceRegime"
                        disabled={!isEditing}
                        value={formData.sentenceRegime}
                        onChange={handleInputChange}
                        options={[
                            { value: "FECHADO", label: "Fechado" },
                            { value: "SEMIABERTO", label: "Semi Aberto" },
                            { value: "ABERTO", label: "Aberto" },
                            { value: "LIBERADO", label: "Liberado" },
                        ]}
                    />

                    <InputCustom
                        label="Áreas de Interesse"
                        id="areasOfInterest"
                        name="areasOfInterest"
                        disabled={!isEditing}
                        value={formData.areasOfInterest}
                        onChange={handleInputChange}
                        placeholder="Digite as suas Áreas de Interesse"
                        type="text"
                    />

                    <TextareaCustom
                        label="Experiência Profissional"
                        id="professionalExperience"
                        name="professionalExperience"
                        value={formData.professionalExperience}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        rows={20}
                        placeholder="Digite uma descrição sobre sua Experiência Profissional"
                        charmax={1000}
                        countchar={formData.professionalExperience.length}
                    />

                    <TextareaCustom
                        label="Habilidades e Qualificações"
                        id="skillsAndQualifications"
                        name="skillsAndQualifications"
                        value={formData.skillsAndQualifications}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        rows={20}
                        placeholder="Digite uma descrição sobre suas Habilidades e Qualificações"
                        charmax={1000}
                        countchar={formData.skillsAndQualifications.length}
                    />

                    <TextareaCustom
                        label="Histórico Educacional"
                        id="educationalHistory"
                        name="educationalHistory"
                        value={formData.educationalHistory}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                        rows={20}
                        placeholder="Digite uma descrição sobre seu Histórico Educacional"
                        charmax={1000}
                        countchar={formData.educationalHistory.length}
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
            <ToastContainer />
        </div>
    );
}

export default ProfileRemand;