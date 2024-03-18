import React, { useState } from "react";

// ASSETS
import locationIcon from "../../images/locationIcon.jpg";
import contractIcon from "../../images/contractIcon.jpg";
import nivelIcon from "../../images/nivelIcon.jpg";
import "./CustomModal.css";
import { ToastContainer, toast } from "react-toastify";
import api from "../../services/api";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import JobInformationModal from "../JobInformationModal/JobInformationModa";

const VacancyInProgress = (props) => {
  const typeUser = useSelector(state => state?.typeUser?.typeUser);
  const [modalOpen, setModalOpen] = useState(false);
  const [finalizeVacancy, setFinalizeVacancy] = useState(false);
  const user = UserService();
  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const viewApplications = () => {
    if (props.vaga) navigate(`/candidaturas/${props.vaga?.id}`);
  };

  const openFinalize = () => {
    setFinalizeVacancy(true);
  };

  const closeFinalize = () => {
    setFinalizeVacancy(false);
  };

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const recommendedVacancy = () => {
    navigate(`/vagas/${props.vaga?.id}`);
  };

  const handleFinalizeVacancy = async (event) => {
    const vacancyId = props.vaga?.id;
    const { createdAt, updatedAt, id, contactPerson, ...jobData } = props.vaga;

    jobData.jobStatus = "CLOSED";
    jobData.contactPersonId = user?.user.id;

    try {
      await api.put(`/jobs/${vacancyId}`, jobData);

      toast.success(`A vaga '${props.vaga?.jobTitle}' foi FINALIZADA.`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.error("Erro ao fazer a solicitação PUT:", error);
    }

    props.finalizeVacancy();
  };

  const giveup = async () => {
    try{
      await api.delete(`/jobApplications/${props.vaga.id}`);
      toast.success(`Você desistiu da vaga com sucesso!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }catch(error){
      console.log("Erro ao excluir candidatura: ", error);
    }
  }

  return (
    <div
      className="flex w-[400px] md:w-[300px] h-[250px] py-[24px] flex-col justify-between items-center border-2 
        rounded border-solid border-[#D2D4D4] hover:bg-gray-200 transition duration-300"
    >
      <h3 className="text-[#00A3FF] px-[12px] text-center font-bold">
        {props.tituloDaVaga}
      </h3>
      <div className="w-full flex flex-col list-none px-[12px] gap-[6px] items-center justify-center text-[#7C7C8A] text-[12px]">
        <div className="flex gap-[6px] items-center">
          <img src={locationIcon} />
          {props.localizacao}
        </div>
        <div className="flex gap-[6px] items-center">
          <img src={nivelIcon} />
          {props.nivel}
        </div>
        <div className="flex gap-[6px] items-center">
          <img src={contractIcon} />
          {props.contrato}
        </div>
      </div>
      <div className="flex pt-[12px] items-center">
        {typeUser === "COLLABORATOR" || typeUser === "COMPANY" ? (
          <button
            onClick={viewApplications}
            className="px-[12px] w-[124px] bg-[#00A3FF] text-[#FFF] rounded hover:opacity-85 cursor-pointer"
          >
            CANDIDATOS
          </button>
        ) : null}
        <button
          onClick={props.recommended ? recommendedVacancy : openModal}
          className="px-[12px] w-[124px] bg-[#00A3FF] text-[#FFF] rounded hover:opacity-85 cursor-pointer"
        >
          MAIS DETALHES
        </button>
        <button
          onClick={giveup}
          className="px-[12px] w-[124px] bg-[red] text-[#FFF] rounded border border-red-500 hover:opacity-85 cursor-pointer"
        >
          DESISTIR
        </button>
        <JobInformationModal
          isOpen={modalOpen}
          closeModal={closeModal}
          job={props.vaga}
          height={"600px"}
        ></JobInformationModal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VacancyInProgress;
