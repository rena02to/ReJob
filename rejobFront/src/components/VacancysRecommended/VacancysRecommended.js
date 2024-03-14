import { useState, useEffect } from "react";

import VacancyInProgress from "../VacancyInProgress/VacancyInProgress";

import api from "../../services/api";
import { educationLevelMapper } from "../../utils/utils";

const VacancysRecommended = (props) => {
  const [vacancies, setVacancies] = useState([]);
  const [states, setStates] = useState([]);
  const id = props.id;

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

  useEffect(() => {
    const carregarStates = async () => {
      try {
        const data = require("../../utils/states.json");
        setStates(data.estados);
      } catch (error) {
        console.error("Erro ao carregar Estados:", error);
      }
    };

    carregarStates();
  }, [setStates]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[12px] px-[12px]">
        {vacancies.map((vacancy, index) => {
          const {
            jobTitle,
            companyName,
            companyLocation,
            educationLevel,
            employmentContractType,
          } = vacancy || {};
          const localizacao = `${companyLocation?.address}, ${companyLocation?.city}, ${companyLocation?.state}`;
          return (
            <VacancyInProgress
              key={index}
              tituloDaVaga={jobTitle}
              empresa={companyName}
              localizacao={localizacao}
              nivel={educationLevelMapper(educationLevel)}
              contrato={employmentContractType}
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
