// ASSETS
import companyIcon from '../../images/companyIcon.jpg'
import locationIcon from '../../images/locationIcon.jpg'
import contractIcon from '../../images/contractIcon.jpg'
import nivelIcon from '../../images/nivelIcon.jpg'

const VacancyCompany = (props) => {
    return (
        <div className="flex w-[250px] h-[250px] py-[24px] flex-col justify-between items-center border-2 
        rounded border-solid border-[#D2D4D4]
        ">
            <h3 className="text-[#00A3FF] font-bold">{props.tituloDaVaga}</h3>
            <div className="w-full flex flex-wrap list-none px-[12px] gap-[2px] items-center justify-center text-[#7C7C8A] text-[12px]">
                <div className="flex gap-[6px] items-center">
                    <img src={companyIcon} />
                    {props.empresa}
                </div>
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
            <div className="flex gap-[6px] items-center">
                <a href="#" className="text-red-500">Finalizar</a>
                <button className="px-[12px] w-[124px] bg-[#00A3FF] text-[#FFF] rounded hover:opacity-85 cursor-pointer">
                    Ver processo
                </button>
            </div>
        </div>
    );
}

export default VacancyCompany;