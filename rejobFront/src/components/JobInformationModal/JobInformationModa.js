import React from "react";

const JobInformationModal = ({
  isOpen,
  closeModal,
  handleBackgroundClick,
  height,
  width,
  job,
}) => {
  return (
    <>
      {isOpen && (
        <div className="modal-background" onClick={handleBackgroundClick}>
          <div className="modal relative  mt-16" style={{ width, height }}>
            <button
              className="close-button absolute right-[24px] cursor-pointer hover:bg-[#00A3FF] hover:text-white"
              onClick={closeModal}
            >
              X
            </button>
            <div className="">
              <h2 className="text-[#00A3FF]">{job?.jobTitle}</h2>
              <button>{job?.categories}</button>
              <p>
                R$ {job?.salaryRange?.salaryRangeMin}~
                {job?.salaryRange?.salaryRangeMax}
              </p>

              <div className="">
                <h3 className="text-[#00A3FF]">Descrição da Vaga</h3>
                <p className="text-justify">{job?.jobDescription}</p>
              </div>

              <h3 className="text-[#00A3FF]">Experiência</h3>
              <p className="text-justify">{job?.requiredExperience}</p>

              <h3 className="text-[#00A3FF]">Responsabilidades</h3>
              <p className="text-justify">{job?.responsibilities}</p>

              <h3 className="text-[#00A3FF]">Localização</h3>
              <p className="text-justify">
                {job?.companyLocation?.city}, {job?.companyLocation?.state},{" "}
                {job?.companyLocation?.address}
              </p>
            </div>
            <hr></hr>
            <div className="flex justify-between items-center pt-[12px]">
              <div className="max-w-[300px]">
                <b>Feedback</b>:{" "}
                {job?.feedback
                  ? job?.feedback
                  : "Nenhum feedback foi dado pela empresa até o momento."}
              </div>
              <div>
                <b>Status</b>:{" "}
                {job?.jobStatus === "IN_PROGRESS" ? (
                  <span className="text-yellow-500"> Em Progresso</span>
                ) : job?.jobStatus === "ACCEPTED" ? (
                  <span className="text-green-500"> Aceito</span>
                ) : job?.jobStatus === "REJECTED" ? (
                  <span className="text-red-500"> Rejeitado</span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobInformationModal;
