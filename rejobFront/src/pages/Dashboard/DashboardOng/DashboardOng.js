import { useState } from "react";
import NavBar from "../../../components/NavBar";
import Title from "../../../components/Title/Title";
import ProfileCollaborator from "../../../components/ProfileCollaborator/ProfileCollaborator";
import UserService from "../../../services/UserService";
import "./DashboardOng.css";
import "./CustomModal.css";
import InputCustom from "../../../components/InputCustom/InputCustom";
import TextareaCustom from "../../../components/TextareaCustom/TextareaCustom";
import api from "../../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoursesOng from "../../../components/CoursesOng/CoursesOng";

const DashboardOng = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const userData = UserService();
  const [newCourse, setNewCourse] = useState(false);

  const [formData, setFormData] = useState({
    courseTitle: "",
    platform: "",
    link: "",
    description: "",
    duration: "",
    contactPersonId: userData.collaboratorId,
  });

  const cleanForm = () => {
    setFormData({
      courseTitle: "",
      platform: "",
      link: "",
      description: "",
      duration: "",
      contactPersonId: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.courseTitle ||
      !formData.platform ||
      !formData.link ||
      !formData.description ||
      !formData.duration
    ) {
      toast.warn("Por favor, preencha todos os campos obrigatórios.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    // Limite de caracteres
    if (formData.description.length > 1000) {
      toast.warn("O limite de caracteres máximo em DESCRIÇÃO é: 1000", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    const updatedFormData = {
      ...formData,
      contactPersonId: userData?.collaboratorId,
    };

    try {
      const response = await api.post("/courses", updatedFormData);

      toast.success(
        `O Curso: ${formData.courseTitle}, foi ofertado na ReJob com sucesso.`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    } catch (error) {
      console.error("Erro ao fazer a solicitação POST:", error);
    }

    cleanForm();
    setModalOpen(false);
    setNewCourse(true);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const toggleNewCourse = () => {
    setNewCourse(false)
  };

  return (
    <div>
      <NavBar />

      {/* PROFILE */}
      <div className="max-w-[1440px] m-auto px-[42px]">
        <ProfileCollaborator />
      </div>

      {/* VAGAS DA EMPRESA */}
      <div className="max-w-[1440px] m-auto px-[42px] flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Title
            titulo="POSTAGEM DE CURSOS"
            subtitulo="Acompanhe abaixo o andamento de todas as vagas que sua empresa ofertou."
          ></Title>

          <button className="submit" onClick={openModal}>
            OFERTAR NOVO CURSO
          </button>

          {modalOpen && (
            <div className="modal-background" onClick={handleBackgroundClick}>
              <div className="modal relative h-[800px] mt-16">
                <button
                  className="close-button absolute right-[24px] cursor-pointer hover:bg-[#00A3FF] hover:text-white"
                  onClick={closeModal}
                >
                  X
                </button>
                <div className="flex flex-col gap-[12px] justify-center items-center p-[24px]">
                  <h2 className="text-[#00A3FF]">OFERTAR NOVO CURSO</h2>
                  <div className="grid grid-cols-2 gap-[24px] items-center">
                    <InputCustom
                      label="Título do Curso"
                      placeholder="Digite o título do curso"
                      id="courseTitle"
                      name="courseTitle"
                      value={formData.courseTitle}
                      onChange={handleInputChange}
                      type="text"
                    />

                    <InputCustom
                      label="Plataforma"
                      placeholder="Digite o nome da plataforma do curso"
                      id="platform"
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                      type="text"
                    />

                    <InputCustom
                      label="Link do Curso"
                      placeholder="Coloque o link do curso"
                      id="link"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      type="text"
                    />

                    <InputCustom
                      label="Duração"
                      placeholder="Coloque a duração do curso (horas)"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      type="number"
                    />

                    <div className="col-span-2 items-center justify-center">
                      <TextareaCustom
                        label="Descrição do Curso"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={20}
                        placeholder="Digite uma descrição a respeito do curso"
                        charmax={1000}
                      />
                      <button
                        type="submit"
                        className="save cursor-pointer hover:opacity-85 w-full mt-[24px]"
                        onClick={handleFormSubmit}
                      >
                        CADASTRAR NOVO CURSO
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex pt-[72px]">
          <div className="w-full">
            <CoursesOng
              id={userData?.collaboratorId}
              url={"courses/course-list-by-collaborator"}
              newCourse={newCourse}
              toggleNewCourse={toggleNewCourse}
            />
          </div>
        </div>
      </div>

      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default DashboardOng;
