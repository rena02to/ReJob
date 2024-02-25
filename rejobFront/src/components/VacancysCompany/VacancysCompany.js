import { useState, useEffect } from 'react';

import VacancyFinished from "../VacancyFinished/VacancyFinished";
import VacancyInProgress from "../VacancyInProgress/VacancyInProgress";

import api from '../../services/api'
import PaginationRounded from '../../pages/PaginationRounded/PaginationRounded';

const VacancysCompany = (props) => {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [vagasExibidas, setVagasExibidas] = useState([]);
    const [vacancies, setVacancies] = useState([]);

    // GET JOBS
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/jobs/job-list/1");
                setVacancies(response.data);
            } catch (error) {
                console.error("Erro na requisição:", error);
            }
        };

        fetchData();
    }, []);

    const handleChangePagina = (novaPagina) => {
        setPaginaAtual(novaPagina);
    }

    const calcularVagasExibidas = () => {
        const vagasPorPagina = 6;
        const indiceInicial = (paginaAtual - 1) * vagasPorPagina;
        const indiceFinal = indiceInicial + vagasPorPagina;

        return vacancies.slice(indiceInicial, indiceFinal);
    }

    const formatedEducationLevel = (educationLevel) => {
        switch (educationLevel) {
            case "ENSINO_FUNDAMENTAL_COMPLETO":
                return "Ensino Fundamental Completo"
            case "ENSINO_FUNDAMENTAL_INCOMPLETO":
                return "Ensino Fundamental Incompleto"
            case "ENSINO_MEDIO_COMPLETO":
                return "Ensino Médio Completo"
            case "ENSINO_MEDIO_INCOMPLETO":
                return "Ensino Médio Incomplento"
            case "EDUCACAO_SUPERIOR_COMPLETA":
                return "Ensino Superior Completo"
            case "EDUCACAO_SUPERIOR_INCOMPLETA":
                return "Ensino Superior Inompleto"
            case "POS_GRADUACAO_COMPLETA":
                return "Pos Graduação Completa"
            case "POS_GRADUACAO_INCOMPLETA":
                return "Pos Graduação Incompleta"
            case "MESTRADO_COMPLETO":
                return "Mestrado Completo"
            case "MESTRADO_INCOMPLETO":
                return "Mestrado Incompleto"
            case "DOUTORADO_COMPLETO":
                return "Doutorado Completo"
            case "DOUTORADO_INCOMPLETO":
                return "Doutorado Incompleto"
            case "OUTRO":
                return "Outro"
        }
    }

    useEffect(() => {
        setVagasExibidas(calcularVagasExibidas());
    }, [paginaAtual, vacancies]);

    return (
        <div className="grid grid-cols-3 gap-[12px] pt-[12px] px-[12px]">
            {vagasExibidas.map((vacancy, index) => {
                if (props.toggle === 1 && (vacancy.jobStatus === "ACTIVE" || vacancy.jobStatus === "IN_PROGRESS")) {
                    return (
                        <VacancyInProgress
                            key={index}
                            tituloDaVaga={vacancy.jobTitle}
                            empresa={vacancy.companyName}
                            localizacao={`${vacancy.companyLocation.city}, ${vacancy.companyLocation.city}, ${vacancy.companyLocation.state}`}
                            nivel={formatedEducationLevel(vacancy.educationLevel)}
                            contrato={vacancy.employmentContractType}
                        />
                    );
                } else if (props.toggle === 2 && (vacancy.jobStatus === "CLOSED" || vacancy.jobStatus === "COMPLETED")) {
                    return (
                        <VacancyFinished
                            key={index}
                            tituloDaVaga={vacancy.jobTitle}
                            empresa={vacancy.companyName}
                            localizacao={`${vacancy.companyLocation.city}, ${vacancy.companyLocation.city}, ${vacancy.companyLocation.state}`}
                            nivel={vacancy.educationLevel}
                            contrato={vacancy.employmentContractType}
                        />
                    );
                }
            })
            }

            <PaginationRounded
                totalVagas={vacancies.length}
                paginaAtual={paginaAtual}
                onChangePagina={handleChangePagina}
            />
        </div>
    );
}

export default VacancysCompany;