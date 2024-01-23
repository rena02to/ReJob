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
import profileImg from '../../images/profile.jpg'
import { FaEdit } from "react-icons/fa";

const Profile = () => {
    const [formData, setFormData] = useState({
        name: "Maria Silva de Lima",
        email: "msl@example.com",
        cpf: "123.456.789-00",
        dateOfBirth: "2000-01-21",
        placeOfResidence: "Cityville, State",
        chainCode: "ABC123",
        sentenceServingRegime: "Probation",
        education: "Bachelor's Degree in Computer Science",
        areasOfInterest: ["Software Development", "Artificial Intelligence"],
        profissionalExperience: "Software Engineer at TechCorp",
        skillsAndQualifications: "Java, Python, Machine Learning",
        educationalHistory: "University of Tech, Graduated in 2012"
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState(profileImg);

    const handleEnableEditing = (event) => {
        event.preventDefault();
        setIsEditing(true);
    };

    const handleDisableEditing = (event) => {
        event.preventDefault();
        setIsEditing(false);
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
                <Title
                    titulo="PERFIL"
                    subtitulo="Detalhes pessoais e profissionais do usuário."
                />

                <div className="image-box">
                    <img src={profileImage} />
                    {
                        isEditing ? (
                            <button className="edit-button" onClick={() => fileInputRef.current.click()}> <FaEdit /> </button>
                        ) : null
                    }
                </div>

                {
                    isEditing ? (
                        <div className="selecionarImagem">
                            <input
                                type="file"
                                accept="image/*" // Limita a seleção apenas a arquivos de imagem
                                onChange={handleFileChange}
                                style={{ display: 'none' }} // Torna o input invisível
                                ref={fileInputRef} // Referência para o input
                            />
                        </div>
                    ) : null
                }

                <form>
                    <div className="campos">
                        <InputCustom
                            label="Nome Completo"
                            id="name"
                            name="name"
                            value={formData.name}
                            type="text"
                            disabled={!isEditing}
                        />

                        <InputCustom
                            label="Endereço de E-mail"
                            id="email"
                            name="email"
                            value={formData.email}
                            type="text"
                            disabled={!isEditing}

                        />

                        <InputCustom
                            label="CPF"
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            type="text"
                            disabled={!isEditing}

                        />

                        <InputCustom
                            label="Data de Nascimento"
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            disabled={!isEditing}

                        />

                        <InputCustom
                            label="Local de Residência"
                            id="placeOfResidence"
                            name="placeOfResidence"
                            value={formData.placeOfResidence}
                            type="text"
                            disabled={!isEditing}

                        />

                        <InputCustom
                            label="Código de Cadeia"
                            id="chainCode"
                            name="chainCode"
                            value={formData.chainCode}
                            type="text"
                            disabled={!isEditing}

                        />

                        <InputCustom
                            label="Regime de Cumprimento de Pena"
                            id="sentenceServingRegime"
                            name="sentenceServingRegime"
                            value={formData.sentenceServingRegime}
                            type="text"
                            disabled={!isEditing}

                        />

                        <InputCustom
                            label="Escolaridade"
                            id="education"
                            name="education"
                            value={formData.education}
                            type="text"
                            disabled={!isEditing}

                        />


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
                        </div>

                        <div className="textarea-box">
                            <TextareaCustom
                                label="Experiência Profisisonal"
                                className="textarea-item"
                                id="profissionalExperience"
                                name="profissionalExperience"
                                value={formData.profissionalExperience}
                                rows={10}
                                disabled={!isEditing}

                            />

                            <TextareaCustom
                                label="Habilidades e Qualificações"
                                className="textarea-item"
                                id="skillsAndQualifications"
                                name="skillsAndQualifications"
                                value={formData.skillsAndQualifications}
                                rows={10}
                                disabled={!isEditing}

                            />

                            <TextareaCustom
                                label="Histórico Educacional"
                                className="textarea-item"
                                id="educationalHistory"
                                name="educationalHistory"
                                value={formData.educationalHistory}
                                rows={10}
                                disabled={!isEditing}

                            />
                        </div>
                    </div>

                    <div className="botoes">
                        {
                            isEditing ? (
                                <div>
                                    <button onClick={handleDisableEditing} className="back">CANCELAR</button>
                                    <button type="submit" className="save">SOLICITAR EDIÇÃO PARA O COLABORADOR</button>
                                </div>
                            ) : (
                                <button onClick={handleEnableEditing} className="save">HABILITAR EDIÇÃO</button>
                            )
                        }
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Profile;