import React from "react";

const CourseInformationModal = ({
  isOpen,
  closeModal,
  handleBackgroundClick,
  height,
  width,
  course,
}) => {
  return (
    <>
      {isOpen && (
        <div className="modal-background" onClick={handleBackgroundClick}>
          <div className="modal relative mt-16" style={{ width, height }}>
            <button
              className="close-button absolute right-[24px] cursor-pointer hover:bg-[#00A3FF] hover:text-white"
              onClick={closeModal}
            >
              X
            </button>
            <div className="flex flex-col gap-[32px]">
              <div>
                <h2 className="text-[#00A3FF]">{course?.courseTitle}</h2>
                <div className="w-full flex list-none gap-[6px] items-center text-[#7C7C8A] text-[12px]">
                  <div className="flex gap-[6px] items-center">
                    <span className="text-[#00A3FF]">Duração:</span>
                    {course?.duration} Horas
                  </div>
                  |
                  <div className="flex gap-[6px] items-center">
                    <span className="text-[#00A3FF]">Plataforma: </span>
                    {course?.platform}
                  </div>
                </div>
              </div>

              <div className="">
                <h3 className="text-[#00A3FF]">Link do Curso</h3>
                <a href={course?.link} target="_blank" rel="noopener noreferrer" className="text-justify underline text-[#00A3FF]">{course?.link}</a>
              </div>

              <div className="">
                <h3 className="text-[#00A3FF]">Descrição do Curso</h3>
                <p className="text-justify">{course?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseInformationModal;
