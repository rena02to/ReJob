import { useState, useEffect } from "react";

import VacancyFinished from "../VacancyFinished/VacancyFinished";
import VacancyInProgress from "../VacancyInProgress/VacancyInProgress";

import api from "../../services/api";

import PaginationRounded from "../../pages/PaginationRounded/PaginationRounded";
import SearchIcon from "@mui/icons-material/Search";
import { educationLevelMapper } from "../../utils/utils";

const VacancysRemand = (props) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [vagasAbertasExibidas, setVagasAbertasExibidas] = useState([]);
  const [vagasFechadasExibidas, setVagasFechadasExibidas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [vacancies, setVacancies] = useState([]);
  const [vacanciesOpen, setVacanciesOpen] = useState([]);
  const [vacanciesClosed, setVacanciesClosed] = useState([]);
  const [states, setStates] = useState([]);
  const id = props.id;
  const [finalizated, setFinalizated] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await api.get(`${props.url}/${id}`);
          const allVacancies = response.data;
          const activeVacancies = allVacancies.filter(
            (vacancy) => vacancy.status === "IN_PROGRESS"
          );
          const closedVacancies = allVacancies.filter(
            (vacancy) =>
              vacancy.status === "ACCEPTED" || vacancy.status === "REJECTED"
          );

          setVacancies(allVacancies);
          setVacanciesOpen(activeVacancies);
          setVacanciesClosed(closedVacancies);
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  // GET STATES
  useEffect(() => {
    const carregarStates = async () => {
      try {
        // Importar diretamente o arquivo JSON
        const data = require("../../utils/states.json");
        setStates(data.estados);
      } catch (error) {
        console.error("Erro ao carregar Estados:", error);
      }
    };

    carregarStates();
  }, [setStates]);

  useEffect(() => {
    setVagasAbertasExibidas(calcularVagasAbertasExibidas());
  }, [paginaAtual, vacanciesOpen]);

  useEffect(() => {
    setVagasAbertasExibidas(calcularVagasAbertasExibidas());
  }, [searchTerm]);

  useEffect(() => {
    if (props.toggle === 2) {
      setPaginaAtual(1);
    }
  }, [props.toggle]);

  useEffect(() => {
    if (searchTerm === undefined) {
      setSearchTerm("");
    }
  }, [searchTerm]);

  useEffect(() => {
    setVagasFechadasExibidas(calcularVagasFechadasExibidas());
  }, [paginaAtual, vacanciesClosed]);

  useEffect(() => {
    setVagasFechadasExibidas(calcularVagasFechadasExibidas());
  }, [searchTerm]);

  const calcularVagasAbertasExibidas = () => {
    const vagasFiltradas = vacanciesOpen.filter((vaga) => {
      const searchString = `${vaga.job.jobTitle} ${vaga.job.companyName} ${
        vaga.job.companyLocation.city
      } ${vaga.job.companyLocation.state} ${educationLevelMapper(
        vaga.job.educationLevel
      )} ${vaga.job.employmentContractType}`;
      return searchString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const vagasPorPagina = 6;
    const indiceInicial = (paginaAtual - 1) * vagasPorPagina;
    const indiceFinal = indiceInicial + vagasPorPagina;

    return vagasFiltradas.slice(indiceInicial, indiceFinal);
  };

  const calcularVagasFechadasExibidas = () => {
    const vagasFiltradas = vacanciesClosed.filter((vaga) => {
      const searchString = `${vaga.job.jobTitle} ${vaga.job.companyName} ${
        vaga.job.companyLocation.city
      } ${vaga.job.companyLocation.state} ${educationLevelMapper(
        vaga.job.educationLevel
      )} ${vaga.job.employmentContractType}`;
      return searchString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const vagasPorPagina = 6;
    const indiceInicial = (paginaAtual - 1) * vagasPorPagina;
    const indiceFinal = indiceInicial + vagasPorPagina;

    return vagasFiltradas.slice(indiceInicial, indiceFinal);
  };

  // FUNÇÃO PARA ATUALIZAR AS VAGAS QUANDO ALGUMA VAGA FOR FINALIZADA
  const fetchData = async () => {
    try {
      const response = await api.get(`${props.url}/${id}`);
      const allVacancies = response.data;

      const activeVacancies = allVacancies.filter(
        (vacancy) => vacancy.status === "IN_PROGRESS"
      );
      const closedVacancies = allVacancies.filter(
        (vacancy) =>
          vacancy.status === "ACCEPTED" || vacancy.status === "REJECTED"
      );

      setVacancies(allVacancies);
      setVacanciesOpen(activeVacancies);
      setVacanciesClosed(closedVacancies);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleFinalizeVacancy = async () => {
    fetchData();
  };

  const handleChangePagina = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  return (
    <div>
      <div className="relative">
        <input
          className="absolute top-[-92px] h-[42px] w-full"
          type="text"
          placeholder="Pesquise qualquer informação de vaga aqui"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <SearchIcon
          onClick={(e) => setSearchTerm(e.target.value)}
          style={{ color: "#00a3ff" }}
          className="absolute hover:scale-110 hover:-translate-y-1 transition duration-300 ease-in-out delay-150 top-[-82px] right-[24px] h-[42px] w-full hover:bg-slate-100 hover: cursor-pointer rounded-full"
        />
      </div>
      <div className="flex flex-wrap md:grid-cols-4 gap-[12px] pt-[12px] px-[12px]">
        {vagasAbertasExibidas.map((vacancy, index) => {
          if (props.toggle === 1 && vacancy.status === "IN_PROGRESS") {
            const {
              jobTitle,
              companyName,
              companyLocation,
              educationLevel,
              employmentContractType,
            } = vacancy.job || {};
            const localizacao = `${companyLocation?.address}, ${companyLocation?.city}, ${companyLocation?.state}`;
            return (
              <VacancyInProgress
                key={index}
                tituloDaVaga={jobTitle}
                empresa={companyName}
                localizacao={localizacao}
                nivel={educationLevelMapper(educationLevel)}
                contrato={employmentContractType}
                vaga={vacancy.job}
                finalizeVacancy={handleFinalizeVacancy}
              />
            );
          }
        })}

        {vagasFechadasExibidas.map((vacancy, index) => {
          if (
            props.toggle === 2 &&
            (vacancy.status === "ACCEPTED" || vacancy.status === "REJECTED")
          ) {
            const {
              jobTitle,
              companyName,
              companyLocation,
              educationLevel,
              employmentContractType,
            } = vacancy.job || {};
            const localizacao = `${companyLocation?.address}, ${companyLocation?.city}, ${companyLocation?.state}`;
            return (
              <VacancyFinished
                key={index}
                tituloDaVaga={jobTitle}
                empresa={companyName}
                localizacao={localizacao}
                nivel={educationLevelMapper(educationLevel)}
                contrato={employmentContractType}
                statusRemand={vacancy.status}
              />
            );
          }
        })}
      </div>

      {props.toggle === 1 ? (
        <PaginationRounded
          totalVagas={vacanciesOpen.length}
          paginaAtual={paginaAtual}
          onChangePagina={handleChangePagina}
        />
      ) : (
        <PaginationRounded
          totalVagas={vacanciesClosed.length}
          paginaAtual={paginaAtual}
          onChangePagina={handleChangePagina}
        />
      )}
    </div>
  );
};

export default VacancysRemand;
