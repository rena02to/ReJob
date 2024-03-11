import React, { useState } from 'react'

// ASSETS
import TimerIcon from '@mui/icons-material/Timer';
import ApartmentIcon from '@mui/icons-material/Apartment';

import './CustomModal.css'
import { ToastContainer, toast } from 'react-toastify'

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
            // Verifica se o clique foi fora do modal
            closeModal();
        }
    };

    return (
        <div className="flex w-[400px] md:w-[300px] h-[250px] py-[24px] flex-col justify-between items-center border-2 
        rounded border-solid border-[#D2D4D4]
        ">
            <h3 className="text-[#00A3FF] px-[12px] text-center font-bold">{props.courseTitle}</h3>
            <div className="w-full flex list-none px-[12px] gap-[6px] items-center justify-center text-[#7C7C8A] text-[12px]">
                <div className="flex gap-[6px] items-center">
                    <TimerIcon />
                    {props.duration} Horas
                </div>
                <div className="flex gap-[6px] items-center">
                    <ApartmentIcon />
                    {props.platform}
                </div>
            </div>
            <div className="flex pt-[12px] items-center">
                <button onClick={openModal} className="px-[12px] w-[124px] bg-[#00A3FF] text-[#FFF] rounded hover:opacity-85 cursor-pointer">
                    Mais detalhes
                </button>
                {modalOpen && (
                    <div className="modal-background" onClick={handleBackgroundClick}>
                        <div className="modal relative">
                            <button className="close-button absolute right-[24px] cursor-pointer hover:bg-[#00A3FF] hover:text-white" onClick={closeModal}>X</button>
                            <div className=''>
                                <h2 className='text-[#00A3FF]'>{props.courseTitle}</h2>
                                <div className="w-full flex list-none gap-[6px] items-center text-[#7C7C8A] text-[12px]">
                                    <div className="flex gap-[6px] items-center">
                                        <span className='text-[#00A3FF]'>Duração:</span>
                                        <TimerIcon />
                                        {props.duration} Horas
                                    </div>
                                    |
                                    <div className="flex gap-[6px] items-center">
                                        <span className='text-[#00A3FF]'>Plataforma: </span>
                                        <ApartmentIcon />
                                        {props.platform}
                                    </div>
                                </div>

                                <div className=''>
                                    <h3 className='text-[#00A3FF]'>Link do Curso</h3>
                                    <p className='text-justify'>{props.link}</p>
                                </div>

                                <div className=''>
                                    <h3 className='text-[#00A3FF]'>Descrição do Curso</h3>
                                    <p className='text-justify'>{props.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <ToastContainer />
        </div>
    );
}

export default CourseInProgress;