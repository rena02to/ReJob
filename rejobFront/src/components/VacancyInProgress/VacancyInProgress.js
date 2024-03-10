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

const VacancyInProgress = (props) => {
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

        closeModal();

        props.finalizeVacancy();
    };

    return (
        <div
            className="flex w-[400px] md:w-[300px] h-[250px] py-[24px] flex-col justify-between items-center border-2 
        rounded border-solid border-[#D2D4D4]
        "
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
                <button
                    onClick={props.recommended ? recommendedVacancy : openModal}
                    className="px-[12px] w-[124px] bg-[#00A3FF] text-[#FFF] rounded hover:opacity-85 cursor-pointer"
                >
                    Mais detalhes
                </button>
                {modalOpen && (
                    <div className="modal-background" onClick={handleBackgroundClick}>
                        <div className="modal relative">
                            <button
                                className="close-button absolute right-[24px] cursor-pointer hover:bg-[#00A3FF] hover:text-white"
                                onClick={closeModal}
                            >
                                X
                            </button>
                            <div className="">
                                <h2 className="text-[#00A3FF]">{props.vaga?.jobTitle}</h2>
                                <button>{props.vaga.categories}</button>
                                <p>
                                    {props.vaga?.jobType} - {props.vaga?.requirements} - R${" "}
                                    {props.vaga?.salaryRange?.salaryRangeMin}~
                                    {props.vaga?.salaryRange?.salaryRangeMax}
                                </p>

                                <div className="">
                                    <h3 className="text-[#00A3FF]">Descrição da Vaga</h3>
                                    <p className="text-justify">{props.vaga?.jobDescription}</p>
                                </div>

                                <h3 className="text-[#00A3FF]">Experiência</h3>
                                <p className="text-justify">{props.vaga?.requiredExperience}</p>

                                <h3 className="text-[#00A3FF]">Responsabilidades</h3>
                                <p className="text-justify">{props.vaga?.responsibilities}</p>

                                <h3 className="text-[#00A3FF]">Localização</h3>
                                <p className="text-justify">
                                    {props.vaga?.companyLocation?.city},{" "}
                                    {props.vaga?.companyLocation?.state},{" "}
                                    {props.vaga?.companyLocation?.address}
                                </p>
                            </div>
                            <hr></hr>

                            {user.user.role === "COMPANY" ? (
                                <div className='flex justify-end pt-[12px]'>
                                    <button onClick={openFinalize} className='text-[18px] cursor-pointer border-none hover:bg-opacity-85 bg-red-600 text-white'>Finalizar Vaga</button>
                                    {modalOpen && finalizeVacancy && (
                                        <div className="modal-background" onClick={handleBackgroundClick}>
                                            <div className="modal relative">
                                                <p className='font-bold text-red-600'>Tem certeza que deseja finalizar esta vaga?</p>
                                                <div className='flex justify-end pt-[12px]'>
                                                    <button onClick={closeFinalize} className='text-[18px] hover:bg-opacity-85 border-none cursor-pointer bg-gray-400 text-white'>Voltar</button>
                                                    <button onClick={handleFinalizeVacancy} className='text-[18px] hover:bg-opacity-85 border-none cursor-pointer bg-red-600 text-white'>Finalizar</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) :

                                <div className="flex justify-between pt-[12px]">
                                    <div className="max-w-[400px]">
                                        <b>Feedback</b>:{" "}
                                        {props.vaga?.feedback
                                            ? props.vaga?.feedback
                                            : "Nenhum feedback foi dado pela empresa até o momento."}
                                    </div>
                                    <div>
                                        <b>Status</b>:
                                        {props.vaga?.status === "IN_PROGRESS" ? (
                                            <span className="text-yellow-500"> Em Progresso</span>
                                        ) : props.vaga?.status === "ACCEPTED" ? (
                                            <span className="text-green-500"> Aceito</span>
                                        ) : props.vaga?.status === "REJECTED" ? (
                                            <span className="text-red-500"> Rejeitado</span>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default VacancyInProgress;
