import { useState } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import NavBar from "../../../components/NavBar";
import Title from "../../../components/Title/Title";
import VacancysCompany from "../../../components/VacancysCompany/VacancysCompany";
import ProfileCompany from "../../../components/ProfileCompany/ProfileCompany";
import CompanyEmployees from "../../../components/Tables/CompanyEmployees/CompanyEmployees";
import UserService from "../../../services/UserService";

const DashboardCompany = () => {
  const [toggle, setToggle] = useState(1);
  const userData = UserService();

  const updateToggle = (id) => {
    setToggle(id);
  };

  return (
    <div>
      <NavBar />

      {/* PROFILE */}
      <div className="max-w-[1440px] m-auto px-[42px]">
        <ProfileCompany />
      </div>

      {/* VAGAS DA EMPRESA */}
      <div className="max-w-[1440px] m-auto px-[42px] flex flex-col">
        <div className="flex justify-between items-center">
          <Title
            titulo="POSTAGEM DE VAGAS"
            subtitulo="Acompanhe abaixo o andamento de todas as vagas que sua empresa ofertou."
          ></Title>
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
            <VacancysCompany
              id={userData?.id}
              toggle={toggle}
              url={"jobs/job-list"}
            />
          </div>
        </div>
      </div>

      {/* COLABORADORES DA EMPRESA  */}
      <div className="max-w-[1440px] m-auto px-[42px] flex flex-col mb-[175px]">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Title
            titulo="COLABORADORES DA EMPRESA"
            subtitulo="Acompanhe abaixo a lista de colaboradores vinculados a empresa."
          ></Title>

          <Link
            to="/cadastro/colaborador"
            target="_blank"
            className="no-underline"
          >
            <button className="p-[12px] mb-[24px] w-[227px] bg-[#00A3FF] text-[#FFF] rounded hover:opacity-85 cursor-pointer">
              CADASTRAR COLABORADOR
            </button>
          </Link>
        </div>
        <CompanyEmployees />
      </div>
    </div>
  );
};

export default DashboardCompany;
