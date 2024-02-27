import { useState, useEffect } from "react";

import VacancyFinished from "../VacancyFinished/VacancyFinished";
import VacancyInProgress from "../VacancyInProgress/VacancyInProgress";

import api from "../../services/api";

import PaginationRounded from "../../pages/PaginationRounded/PaginationRounded";
import SearchIcon from '@mui/icons-material/Search';

const VacancysCompany = (props) => {
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
            (vacancy) => vacancy.jobStatus === "ACTIVE"
          );
          const closedVacancies = allVacancies.filter(
            (vacancy) => vacancy.jobStatus === "CLOSED"
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
        const data = require("./states.json");
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
      const searchString = `${vaga.jobTitle} ${vaga.companyName} ${vaga.companyLocation.city
        } ${vaga.companyLocation.state} ${formatedEducationLevel(
          vaga.educationLevel
        )} ${vaga.employmentContractType}`;
      return searchString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const vagasPorPagina = 6;
    const indiceInicial = (paginaAtual - 1) * vagasPorPagina;
    const indiceFinal = indiceInicial + vagasPorPagina;

    return vagasFiltradas.slice(indiceInicial, indiceFinal);
  };

  const calcularVagasFechadasExibidas = () => {
    const vagasFiltradas = vacanciesClosed.filter((vaga) => {
      const searchString = `${vaga.jobTitle} ${vaga.companyName} ${vaga.companyLocation.city
        } ${vaga.companyLocation.state} ${formatedEducationLevel(
          vaga.educationLevel
        )} ${vaga.employmentContractType}`;
      return searchString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const vagasPorPagina = 6;
    const indiceInicial = (paginaAtual - 1) * vagasPorPagina;
    const indiceFinal = indiceInicial + vagasPorPagina;

    return vagasFiltradas.slice(indiceInicial, indiceFinal);
  };

  const formatedEducationLevel = (educationLevel) => {
    switch (educationLevel) {
      case "ENSINO_FUNDAMENTAL_COMPLETO":
        return "Ensino Fundamental Completo";
      case "ENSINO_FUNDAMENTAL_INCOMPLETO":
        return "Ensino Fundamental Incompleto";
      case "ENSINO_MEDIO_COMPLETO":
        return "Ensino Médio Completo";
      case "ENSINO_MEDIO_INCOMPLETO":
        return "Ensino Médio Incomplento";
      case "EDUCACAO_SUPERIOR_COMPLETA":
        return "Ensino Superior Completo";
      case "EDUCACAO_SUPERIOR_INCOMPLETA":
        return "Ensino Superior Inompleto";
      case "POS_GRADUACAO_COMPLETA":
        return "Pos Graduação Completa";
      case "POS_GRADUACAO_INCOMPLETA":
        return "Pos Graduação Incompleta";
      case "MESTRADO_COMPLETO":
        return "Mestrado Completo";
      case "MESTRADO_INCOMPLETO":
        return "Mestrado Incompleto";
      case "DOUTORADO_COMPLETO":
        return "Doutorado Completo";
      case "DOUTORADO_INCOMPLETO":
        return "Doutorado Incompleto";
      case "OUTRO":
        return "Outro";
    }
  };

  // FUNÇÃO PARA ATUALIZAR AS VAGAS QUANDO ALGUMA VAGA FOR FINALIZADA
  const fetchData = async () => {
    try {
      const response = await api.get(`${props.url}/${id}`);
      const allVacancies = response.data;

      const activeVacancies = allVacancies.filter(
        (vacancy) => vacancy.jobStatus === "ACTIVE"
      );
      const closedVacancies = allVacancies.filter(
        (vacancy) => vacancy.jobStatus === "CLOSED"
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

        <SearchIcon onClick={(e) => setSearchTerm(e.target.value)} style={{color: "#00a3ff"}} className="absolute hover:scale-110 hover:-translate-y-1 transition duration-300 ease-in-out delay-150 top-[-82px] right-[24px] h-[42px] w-full hover:bg-slate-100 hover: cursor-pointer rounded-full" />

      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[12px] pt-[12px] px-[12px]">
        {vagasAbertasExibidas.map((vacancy, index) => {
          if (
            props.toggle === 1 &&
            (vacancy.jobStatus === "ACTIVE" ||
              vacancy.jobStatus === "IN_PROGRESS")
          ) {
            return (
              <VacancyInProgress
                key={index}
                tituloDaVaga={vacancy.jobTitle}
                empresa={vacancy.companyName}
                localizacao={`${vacancy.companyLocation.city}, ${vacancy.companyLocation.city}, ${vacancy.companyLocation.state}`}
                nivel={formatedEducationLevel(vacancy.educationLevel)}
                contrato={vacancy.employmentContractType}
                vaga={vacancy}
                finalizeVacancy={handleFinalizeVacancy}
              />
            );
          }
        })}

        {vagasFechadasExibidas.map((vacancy, index) => {
          if (
            props.toggle === 2 &&
            (vacancy.jobStatus === "CLOSED" ||
              vacancy.jobStatus === "COMPLETED")
          ) {
            return (
              <VacancyFinished
                key={index}
                tituloDaVaga={vacancy.jobTitle}
                empresa={vacancy.companyName}
                localizacao={`${vacancy.companyLocation.city}, ${vacancy.companyLocation.city}, ${vacancy.companyLocation.state}`}
                nivel={formatedEducationLevel(vacancy.educationLevel)}
                contrato={vacancy.employmentContractType}
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

export default VacancysCompany;
