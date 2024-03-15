// ASSETS
import locationIcon from "../../images/locationIcon.jpg";
import contractIcon from "../../images/contractIcon.jpg";
import nivelIcon from "../../images/nivelIcon.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VacancyFinished = (props) => {
  const typeUser = useSelector(state => state?.typeUser?.typeUser);
  const navigate = useNavigate();

  const viewApplications = () => {
    if (props.vaga) navigate(`/candidaturas/${props.vaga?.id}`);
  };

  return (
    <div
      className="flex w-[400px] md:w-[300px] h-[250px] py-[24px] flex-col justify-between items-center border-2 
        rounded border-solid border-[#D2D4D4] 
        "
    >
      <h3 className="text-[#00A3FF] font-bold">{props.tituloDaVaga}</h3>
      <div className="w-full flex flex-col list-none px-[12px] gap-[6px] items-center justify-center text-[#7C7C8A] text-[12px]">
        <div className="flex gap-[6px] items-center">
          <img src={locationIcon} />
          {props.localizacao}
        </div>
        <div className="flex gap-[6px] items-center">
          <img src={nivelIcon} />
          {props.nivel}
        </div>
        <div className="flex gap-[6px] items-center">
          <img src={contractIcon} />
          {props.contrato}
        </div>
      </div>
      <div className="flex flex-col gap-[12px] items-center">
        <button
          className="border-none px-[12px] w-[124px] bg-[#D2D4D4] text-[#000] rounded"
          onClick={
            typeUser === "COLLABORATOR" || typeUser === "COMPANY"
              ? viewApplications
              : null
          }
        >
          CANDIDATOS
        </button>
        {props.statusRemand === "ACCEPTED" && (
          <button
            disabled
            className="border-none font-bold px-[12px] w-[124px] bg-green-400 text-[#000] rounded"
          >
            VOCÊ FOI ACEITO
          </button>
        )}
        {props.statusRemand === "REJECTED" && (
          <button className="border-none px-[12px] w-[124px] font-bold bg-red-400 text-[#fff] rounded">
            VOCÊ FOI REJEITADO
          </button>
        )}
        {!(
          props.statusRemand === "ACCEPTED" || props.statusRemand === "REJECTED"
        ) && (
          <button
            disabled
            className="border-none px-[12px] w-[124px] bg-[#D2D4D4] text-[#000] rounded"
          >
            VAGA FINALIZADA
          </button>
        )}
      </div>
    </div>
  );
};

export default VacancyFinished;
