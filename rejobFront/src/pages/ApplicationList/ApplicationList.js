import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ApplicationListTable from "../../components/Tables/ApplicationList/ApplicationListTable";
import Title from "../../components/Title/Title";
import api from "../../services/api";
import SearchIcon from "@mui/icons-material/Search";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplicationList = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [job, setJob] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await api.get(`/jobs/${id}`);
          setJob(response.data);
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  const handleFinalizeVacancy = async () => {
    const { createdAt, updatedAt, id, contactPerson, ...jobData } = job;

    try {
      if (id) {
        await api.patch(`/jobs/${id}`, { status: "CLOSED" });
        toast.success(`A vaga '${job.jobTitle}' foi FINALIZADA.`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação PUT:", error);
      toast.error("Ocorreu um erro ao finalizar vaga.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="max-w-[1440px] m-auto px-[42px]">
        <div className="flex justify-between items-center">
          <Title
            titulo={`CANDIDATOS DA VAGA: ${job?.jobTitle}`}
            subtitulo="Acompanhe abaixo todos os candidatos que estão participando do processo seletivo desta vaga:"
          ></Title>
        </div>
        <div className="relative py-8 ">
          <input
            className="absolute top-[-12px] h-[42px] w-full"
            type="text"
            placeholder="Pesquise qualquer informação de vaga aqui"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <SearchIcon
            onClick={(e) => setSearchTerm(e.target.value)}
            style={{ color: "#00a3ff" }}
            className="absolute hover:scale-110 hover:-translate-y-1 transition duration-300 ease-in-out delay-150 top-[-3px] right-[24px] h-[42px] w-full hover:bg-slate-100 hover: cursor-pointer rounded-full"
          />
        </div>
        <ApplicationListTable id={id} />
        <div className="botoes">
          <button className="back" onClick={() => navigate(-1)}>
            VOLTAR
          </button>
          <button onClick={handleFinalizeVacancy} className="save !bg-red-500">
            ENCERRAR A VAGA
          </button>
        </div>
      </div>
      <ToastContainer />
      <Footer></Footer>
    </div>
  );
};
export default ApplicationList;
