import React, { useState, useEffect } from "react";
import SelectCustom from "../../components/SelectCustom/SelectCustom";
import TextareaCustom from "../../components/TextareaCustom/TextareaCustom";
import { educationLevelMapper } from "../../utils/utils";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CandidateModal = ({ isOpen, onClose, candidate, width, height, jobId }) => {
  const [formData, setFormData] = useState({
    status: "",
    feedback: "",
  });

  useEffect(() => {
    if (candidate) {
      fetchData();
    }
  }, [candidate]);

  const fetchData = async () => {
    try {
      const response = await api.get(`/jobApplications/${candidate.id}/${jobId}`)
      const data = response.data 

      setFormData({
        status: data.status,
        feedback: data.feedback,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = [
    { value: "IN_PROGRESS", label: "Em Progresso" },
    { value: "ACCEPTED", label: "Aceito" },
    { value: "REJECTED", label: "Rejeitado" }
];


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = formData.status.trim() !== "" && formData.feedback.trim() !== "";

  const handleSubmit = async () => {

    try {
      await api.put(`/jobApplications/${candidate.id}/${jobId}`, formData)
      toast.success("A aplicação foi atualizada!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-background" onClick={onClose}>
          <div
            className="modal relative"
            style={{ width, height }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button absolute right-[24px] cursor-pointer hover:bg-[#00A3FF] hover:text-white"
              onClick={onClose}
            >
              X
            </button>
            <div className="">
              <h2 className="text-[#00A3FF]">{candidate?.user?.name}</h2>
              <p>Email: {candidate?.user?.email}</p>
              <p>Telefone: {candidate?.user?.phoneNumber}</p>
              <p>CPF: {candidate?.cpf}</p>
              <p>Prisão: {candidate?.prisonCode}</p>
              <p>
                Nível de Educação:{" "}
                {educationLevelMapper(candidate?.educationLevel)}
              </p>
              <p>Data de Nascimento: {candidate?.dateOfBirth}</p>
              <p>
                Local de Residência: {candidate?.residenceLocation?.city},{" "}
                {candidate?.residenceLocation?.state},{" "}
                {candidate?.residenceLocation?.address}
              </p>
              <p>Regime de Sentença: {candidate?.sentenceRegime}</p>
            </div>

            {/* Seção de Experiência Profissional */}
            {candidate?.professionalExperience && (
              <div className="">
                <h3 className="text-[#00A3FF]">Experiência Profissional</h3>
                <p>{candidate.professionalExperience}</p>
              </div>
            )}

            {/* Seção de Áreas de Interesse */}
            {candidate?.areasOfInterest && (
              <div className="">
                <h3 className="text-[#00A3FF]">Áreas de Interesse</h3>
                <p>{candidate.areasOfInterest}</p>
              </div>
            )}

            {/* Seção de Habilidades e Qualificações */}
            {candidate?.skillsAndQualifications && (
              <div className="">
                <h3 className="text-[#00A3FF]">Habilidades e Qualificações</h3>
                <p>{candidate.skillsAndQualifications}</p>
              </div>
            )}

            {/* Seção de Histórico Educacional */}
            {candidate?.educationalHistory && (
              <div className="">
                <h3 className="text-[#00A3FF]">Histórico Educacional</h3>
                <p>{candidate.educationalHistory}</p>
              </div>
            )}

            <SelectCustom
              label="Status"
              id="status"
              name="status"
              value={formData.status}
              options={options}
              onChange={handleInputChange}
            />
            <br></br>
            <TextareaCustom
              label="Feedback"
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
              rows={20}
              placeholder="Deixe aqui um feedback para o candidato da vaga"
              charmax={1000}
              countchar={formData.feedback.length}
              maxWidth={"100%"}
            />
          <button onClick={handleSubmit} disabled={!isFormValid}>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CandidateModal;
