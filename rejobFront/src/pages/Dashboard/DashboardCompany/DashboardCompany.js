import { Link } from "react-router-dom";

// COMPONENTS
import NavBar from "../../../components/NavBar";
import Title from "../../../components/Title/Title";
import InputCustom from "../../../components/InputCustom/InputCustom";
import VacancyCompany from "../../../components/VacancyCompany/VacancyCompany";

// ASSETS
import backIcon from '../../../images/backIcon.png'
import rightIcon from '../../../images/rightIcon.png'
import SelectCustom from "../../../components/SelectCustom/SelectCustom";

const DashboardCompany = () => {
    return (
        <div>
            <NavBar />
            <div className="max-w-[1440px] m-auto px-[42px] flex flex-col">
                <div className="flex justify-between items-center">
                    <Title
                        titulo="POSTAGEM DE VAGAS"
                        subtitulo="Acompanhe abaixo o andamento de todas as vagas que sua empresa ofertou.">
                    </Title>

                    <Link to="/nova-vaga" className="no-underline">
                        <button to="/nova-vaga" className="p-[12px] w-[227px] bg-[#00A3FF] text-[#FFF] rounded hover:opacity-85 cursor-pointer">
                            OFERTAR NOVA VAGA
                        </ button>
                    </Link>
                </div>

                <input className="w-full py-[12px] px-[16px]" placeholder="Pesquise uma vaga específica aqui...">
                </input>

                <div className="w-full flex pt-[24px]">
                    <div className="w-9/12">
                        <div className="flex gap-[12px] text-[18px]">
                            <div className="text-[#00A3FF]" >Em andamento</div>
                            <div className="text-[#7C7C8A]">Finalizadas</div>
                        </div>
                        <div className="mt-[6px] w-full rounded bg-[#D2D4D4]">
                            <div className="w-[124px] border-3 rounded border-[#00A3FF] border-solid "></div>
                        </div>
                        <div className="grid grid-cols-3 gap-[12px] pt-[12px] px-[12px]">
                            <VacancyCompany
                                tituloDaVaga="Serviços Gerais"
                                empresa="Starbuck"
                                localizacao="São Paulo, São Paulo, Brasil"
                                nivel="Ensino Médio"
                                contrato="CLT"
                            />
                            <VacancyCompany
                                tituloDaVaga="Serviços Gerais"
                                empresa="Serviços Gerais"
                                localizacao="Serviços Gerais"
                                contrato="Serviços Gerais"
                            />
                            <VacancyCompany
                                tituloDaVaga="Serviços Gerais"
                                empresa="Serviços Gerais"
                                localizacao="Serviços Gerais"
                                contrato="Serviços Gerais"
                            />
                            <VacancyCompany
                                tituloDaVaga="Serviços Gerais"
                                empresa="Serviços Gerais"
                                localizacao="Serviços Gerais"
                                contrato="Serviços Gerais"
                            />
                            <VacancyCompany
                                tituloDaVaga="Serviços Gerais"
                                empresa="Serviços Gerais"
                                localizacao="Serviços Gerais"
                                contrato="Serviços Gerais"
                            />
                            <VacancyCompany
                                tituloDaVaga="Serviços Gerais"
                                empresa="Serviços Gerais"
                                localizacao="Serviços Gerais"
                                contrato="Serviços Gerais"
                            />
                        </div>
                        <div className="flex py-[24px]">
                            <div className="flex justify-center items-center w-[40px] rounded h-[40px] hover:opacity-75 cursor-pointer">
                                <img src={backIcon} />
                            </div>
                            <div className="flex justify-center font-bold items-center w-[40px] rounded h-[40px] bg-[#00A3FF] text-[#FFF] hover:opacity-75 cursor-pointer">
                                1
                            </div>
                            <div className="flex justify-center font-bold items-center w-[40px] rounded h-[40px] text-[#00A3FF] hover:opacity-75 cursor-pointer">
                                2
                            </div>
                            <div className="flex justify-center font-bold items-center w-[40px] rounded h-[40px] text-[#00A3FF] hover:opacity-75 cursor-pointer">
                                3
                            </div>
                            <div className="flex justify-center items-center w-[40px] rounded h-[40px] hover:opacity-75 cursor-pointer">
                                <img src={rightIcon} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col rounded w-[411px] h-full mt-[51px] p-[12px] shadow-xl">
                            <h3 className="font-bold text-[#00A3FF] text-[24px]">Filtrar</h3>
                            <div className="flex flex-col gap-[12px]">
                                <SelectCustom
                                    label="Estado"
                                    id="State"
                                    name="State"
                                    options={[
                                        { value: 'Meio Período', label: 'Meio Período' },
                                        { value: 'Período Integral', label: 'Período Integral' }
                                    ]
                                    }
                                />
                                <SelectCustom
                                    label="Cidade"
                                    id="City"
                                    name="City"
                                    options={[
                                        { value: 'Meio Período', label: 'Meio Período' },
                                        { value: 'Período Integral', label: 'Período Integral' }
                                    ]
                                    }
                                />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DashboardCompany;