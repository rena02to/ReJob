import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import Title from "../../../components/Title/Title";
import Vacancys from "../../../components/VacancysCompany/VacancysCompany";
import ProfileCollaborator from "../../../components/ProfileCollaborator/ProfileCollaborator";
import UserService from "../../../services/UserService";
import "./DashboardCollaborator.css";

const DashboardCollaborator = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(1);
  const userData = UserService();

  const updateToggle = (id) => {
    setToggle(id);
  };

  const createNewJob = () => {
    navigate("/nova-vaga");
  };

  return (
    <div>
      <NavBar />

      {/* PROFILE */}
      <div className="max-w-[1440px] m-auto px-[42px]">
        <ProfileCollaborator />
      </div>

      {/* VAGAS DA EMPRESA */}
      <div className="max-w-[1440px] m-auto px-[42px] flex flex-col gap-[48px] md:gap-[12px]">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Title
            titulo="POSTAGEM DE VAGAS"
            subtitulo="Acompanhe abaixo o andamento de todas as vagas que estão sob sua responsabilidade."
          ></Title>

          <button className="submit" onClick={() => createNewJob()}>
            OFERTAR NOVA VAGA
          </button>
        </div>

        <div className="w-full flex pt-[24px]">
          <div className="w-full">
            <div className="flex gap-[12px] text-[18px]">
              <div
                onClick={() => updateToggle(1)}
                className={
                  toggle === 1
                    ? "cursor-pointer text-[#00A3FF] hover:opacity-70"
                    : "cursor-pointer text-[#7C7C8A] hover:opacity-70"
                }
              >
                Abertas
              </div>
              <div className="text-[#7C7C8A]">|</div>
              <div
                onClick={() => updateToggle(2)}
                className={
                  toggle === 1
                    ? "cursor-pointer text-[#7C7C8A] hover:opacity-70"
                    : "cursor-pointer text-[#00A3FF] hover:opacity-70"
                }
              >
                Finalizadas
              </div>
            </div>
            {toggle === 1 ? (
              <div className="mt-[6px] w-full rounded bg-[#D2D4D4]">
                <div className="relative z-10 w-[78px] border-3 rounded border-[#00A3FF] border-solid "></div>
              </div>
            ) : (
              <div className="z-0 mt-[6px] w-full rounded bg-[#D2D4D4]">
                <div className="relative z-10 left-[86px] w-[124px] border-3 rounded border-[#00A3FF] border-solid "></div>
              </div>
            )}
            <Vacancys
              id={userData?.collaboratorId}
              toggle={toggle}
              url={"jobs/job-by-collaborator"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCollaborator;