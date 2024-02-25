import { useState, useEffect } from "react";

// COMPONENTS
import NavBar from "../../../components/NavBar";
import Title from "../../../components/Title/Title";
import InputCustom from "../../../components/InputCustom/InputCustom";
import VacancyCompany from "../../../components/VacancyInProgress/VacancyInProgress";

// ASSETS
import backIcon from "../../../images/backIcon.png";
import rightIcon from "../../../images/rightIcon.png";
import SelectCustom from "../../../components/SelectCustom/SelectCustom";
import VacancysCompany from "../../../components/VacancysCompany/VacancysCompany";
import PaginationRounded from "../../PaginationRounded/PaginationRounded";

// API
import api from "../../../services/api";
import UserService from "../../../services/UserService";
import ProfileCompany from "../../../components/ProfileCompany/ProfileCompany";
import CompanyEmployees from "../../../components/Tables/CompanyEmployees/CompanyEmployees";
import ProfileCollaborator from "../../../components/ProfileCollaborator/ProfileCollaborator";

const DashboardCollaborator = () => {
  const [toggle, setToggle] = useState(1);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    companyLocation: {
      city: "",
      state: "",
      address: "",
    },
  });

  // GET STATES
  useEffect(() => {
    const carregarStates = async () => {
      try {
        const data = require("./states.json");
        setStates(data.estados);
      } catch (error) {
        console.error("Erro ao carregar Estados:", error);
      }
    };

    carregarStates();
  }, [setStates]);

  const updateToggle = (id) => {
    setToggle(id);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("salaryRange")) {
      setFormData((formData) => ({
        ...formData,
        salaryRange: {
          ...formData.salaryRange,
          [name]: parseFloat(value),
        },
      }));
    } else if (name === "state" || name === "city" || name === "address") {
      setFormData((formData) => ({
        ...formData,
        companyLocation: {
          ...formData.companyLocation,
          [name]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div>
      <NavBar />

      {/* PROFILE */}
      <div className="max-w-[1440px] m-auto px-[42px]">
        <ProfileCollaborator />
      </div>

      {/* VAGAS DA EMPRESA */}
      <div className="max-w-[1440px] h-screen m-auto px-[42px] flex flex-col">
        <div className="flex justify-between items-center">
          <Title
            titulo="POSTAGEM DE VAGAS"
            subtitulo="Acompanhe abaixo o andamento de todas as vagas que sua empresa ofertou."
          ></Title>
        </div>

        <input
          className="w-full py-[12px] px-[16px]"
          placeholder="Pesquise uma vaga específica aqui..."
        ></input>

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
                <div className="relative z-10 w-[124px] border-3 rounded border-[#00A3FF] border-solid "></div>
              </div>
            ) : (
              <div className="z-0 mt-[6px] w-full rounded bg-[#D2D4D4]">
                <div className="relative z-10 left-[132px] w-[124px] border-3 rounded border-[#00A3FF] border-solid "></div>
              </div>
            )}
            <VacancysCompany toggle={toggle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCollaborator;