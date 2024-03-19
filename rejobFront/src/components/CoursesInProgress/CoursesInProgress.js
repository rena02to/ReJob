import React, { useState } from "react";

// ASSETS
import TimerIcon from "@mui/icons-material/Timer";
import ApartmentIcon from "@mui/icons-material/Apartment";

import "./CustomModal.css";
import { ToastContainer } from "react-toastify";
import CourseInformationModal from "../CourseInformationModal/CourseInformationModal";

const CourseInProgress = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <div
      className="flex w-[400px] md:w-[300px] h-[250px] py-[24px] flex-col justify-between items-center border-2 
        rounded border-solid border-[#D2D4D4]
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

        <CourseInformationModal
          isOpen={modalOpen}
          closeModal={closeModal}
          course={props.course}
          height={"600px"}
        ></CourseInformationModal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CourseInProgress;
