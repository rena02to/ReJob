import VacancyFinished from "../VacancyFinished/VacancyFinished";
import VacancyInProgress from "../VacancyInProgress/VacancyInProgress";

const VacancysCompany = (props) => {
    return (
        <div className="grid grid-cols-3 gap-[12px] pt-[12px] px-[12px]">
            {
                props.toggle === 1 ?
                    <VacancyInProgress
                        tituloDaVaga="Serviços Gerais"
                        empresa="Starbuck"
                        localizacao="São Paulo, São Paulo, Brasil"
                        nivel="Ensino Médio"
                        contrato="CLT"
                    />
                    :
                    <VacancyFinished
                        tituloDaVaga="Serviços Gerais"
                        empresa="Starbuck"
                        localizacao="São Paulo, São Paulo, Brasil"
                        nivel="Ensino Médio"
                        contrato="CLT"
                    />
            }
        </div>
    );
}

export default VacancysCompany;