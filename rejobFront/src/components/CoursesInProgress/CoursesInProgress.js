import React, { useState } from "react";

// ASSETS
import TimerIcon from "@mui/icons-material/Timer";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DeleteIcon from '@mui/icons-material/Delete';

import "./CustomModal.css";
import { ToastContainer, toast } from "react-toastify";
import CourseInformationModal from "../CourseInformationModal/CourseInformationModal";
import api from "../../services/api";

const CourseInProgress = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteOpen(false);
  };

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
      closeDeleteModal();
    }
  };

  const deleteCourse = async () => {
    const nameCourse = props.course?.courseTitle;
    const idCourse = props.course?.id;

    try {
      const response = await api.delete(`courses/${idCourse}`);

      console.log(response.status);

      if (response.status === 204) {
        props.handleDeletedCourse();
        closeDeleteModal();
        toast.success(`O curso '${nameCourse}' foi DELETADO.`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return;

      }

    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div
      className="flex w-[400px] md:w-[300px] h-[250px] py-[24px] flex-col justify-between items-center border-2 
    rounded border-solid border-[#D2D4D4] relative
    "
    >
      <h3 className="text-[#00A3FF] px-[12px] text-center font-bold">
        {props.course.courseTitle}
      </h3>
      <div className="w-full flex list-none px-[12px] gap-[6px] items-center justify-center text-[#7C7C8A] text-[12px]">
        <div className="flex gap-[6px] items-center">
          <TimerIcon />
          {props.course.duration} Horas
        </div>
        <div className="flex gap-[6px] items-center">
          <ApartmentIcon />
          {props.course.platform}
        </div>
      </div>
      <div className="flex pt-[12px] items-center">
        <button
          onClick={openModal}
          className="px-[12px] w-[124px] bg-[#00A3FF] text-[#FFF] rounded hover:opacity-85 cursor-pointer"
        >
          Mais detalhes
        </button>

        <button
          onClick={openDeleteModal}
          className="p-[6px] flex justify-center items-center absolute right-[12px] top-[12px] bg-red-500 border-none shadow text-[#FFF] rounded-full hover:opacity-85 cursor-pointer"
        >
          <DeleteIcon />
        </button>

        <CourseInformationModal
          isOpen={modalOpen}
          closeModal={closeModal}
          course={props.course}
          height={"600px"}
        ></CourseInformationModal>

        {deleteOpen && (
          <div className="modal-background" onClick={handleBackgroundClick}>
            <div className="modal relative mt-16 max-w-[800px]">
              <button
                className="close-button absolute right-[24px] cursor-pointer hover:bg-[#00A3FF] hover:text-white"
                onClick={closeDeleteModal}
              >
                X
              </button>
              <div className="flex flex-col justify-center items-center gap-[32px]">
                <p className="text-[18px]">Tem certeza que deseja deletar este curso?</p>
                <h1 className="text-[#00a3ff] text-center">{props.course?.courseTitle}</h1>
                <div className="flex gap-[12px] justify-center items-center">
                  <button className="w-[200px] cursor-pointer hover:opacity-85 p-[12px] border-none bg-slate-400 text-white" onClick={closeDeleteModal}>VOLTAR</button>
                  <button className="w-[200px] cursor-pointer hover:opacity-85 p-[12px] border-none bg-red-500 text-white" onClick={deleteCourse}>DELETAR</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseInProgress;
