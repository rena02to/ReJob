import { useState, useEffect } from "react";

import VacancyFinished from "../VacancyFinished/VacancyFinished";
import VacancyInProgress from "../VacancyInProgress/VacancyInProgress";

import api from "../../services/api";

import PaginationRounded from "../../pages/PaginationRounded/PaginationRounded";
import SearchIcon from '@mui/icons-material/Search';

const VacancysRecommended = (props) => {
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

          setVacancies(allVacancies);
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

      setVacancies(allVacancies);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[12px] px-[12px]">
        {vacancies.map((vacancy, index) => {
            return (
              <VacancyInProgress
                key={index}
                tituloDaVaga={vacancy.jobTitle}
                empresa={vacancy.companyName}
                localizacao={`${vacancy.companyLocation.address}, ${vacancy.companyLocation.city}, ${vacancy.companyLocation.state}`}
                nivel={formatedEducationLevel(vacancy.educationLevel)}
                contrato={vacancy.employmentContractType}
                vaga={vacancy}
                recommended={true}
              />
            );
        })}
      </div>
    </div>
  );
};

export default VacancysRecommended;
