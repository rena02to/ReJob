import { useState, useEffect } from 'react';

// COMPONENTS
import NavBar from "../../../components/NavBar";
import Title from "../../../components/Title/Title";
import VacancysRemand from '../../../components/VacancysRemand/VacancysRemand';
import VacancysRecommended from '../../../components/VacancysRecommended/VacancysRecommended';

// API
import ProfileRemand from '../../../components/ProfileRemand/ProfileRemand';
import UserService from '../../../services/UserService';

const DashboardRemand = () => {
    const [toggle, setToggle] = useState(1);
    const userData = UserService();
    const [paginaAtual, setPaginaAtual] = useState(1);

    if (!userData) {
        return null;
    }

    const updateToggle = (id) => {
        setToggle(id)
    }

    return (
        <div>
            <NavBar />

            {/* PROFILE */}
            <div className='max-w-[1440px] m-auto px-[42px]'>
                <ProfileRemand />
            </div>

            {/* SUAS CANDIDATURAS */}
            <div className="max-w-[1440px] m-auto px-[42px] flex flex-col">
                <div className="flex justify-between items-center">
                    <Title
                        titulo="SUAS CANDIDATURAS"
                        subtitulo="Acompanhe abaixo o andamento de todas as vagas que você esta inscrito.">
                    </Title>
                </div>

                <div className="w-full flex pt-[24px]">
                    <div className="w-full">
                        <div className="flex gap-[12px] text-[18px]">
                            <div onClick={() => updateToggle(1)} className={toggle === 1 ? "cursor-pointer text-[#00A3FF] hover:opacity-70" : "cursor-pointer text-[#7C7C8A] hover:opacity-70"}>Abertas</div>
                            <div className='text-[#7C7C8A]'>|</div>
                            <div onClick={() => updateToggle(2)} className={toggle === 1 ? "cursor-pointer text-[#7C7C8A] hover:opacity-70" : "cursor-pointer text-[#00A3FF] hover:opacity-70"}>Finalizadas</div>
                        </div>
                        {
                            toggle === 1 ?
                                <div className="mt-[6px] w-full rounded bg-[#D2D4D4]">
                                    <div className="relative z-10 w-[78px] border-3 rounded border-[#00A3FF] border-solid "></div>
                                </div>
                                :
                                <div className="z-0 mt-[6px] w-full rounded bg-[#D2D4D4]">
                                    <div className="relative z-10 left-[86px] w-[124px] border-3 rounded border-[#00A3FF] border-solid "></div>
                                </div>
                        }
                        <VacancysRemand
                            id={userData?.id}
                            toggle={toggle}
                            url={`jobApplications/my-applications`}
                        />

                    </div>
                </div>

            </div>

            {/* VAGAS RECOMENDADAS  */}
            <div className="max-w-[1440px] m-auto px-[42px] flex flex-col">
                <div className="flex justify-between items-center">
                    <Title
                        titulo="VAGAS RECOMENDADAS PARA VOCÊ"
                        subtitulo="Acompanhe abaixo algumas vacas recomendadas para você de acordo com seu perfil.">
                    </Title>
                </div>

                <div className="w-full flex pt-[6px]">
                    <div className="w-full">
                        <VacancysRecommended
                            id={userData?.id}
                            toggle={toggle}
                            url={`jobs/recommendation`}
                        />

                    </div>
                </div>

            </div>

        </div>
    );
}

export default DashboardRemand;