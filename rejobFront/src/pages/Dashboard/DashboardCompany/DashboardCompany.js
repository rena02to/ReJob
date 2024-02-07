import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

// COMPONENTS
import NavBar from "../../../components/NavBar";
import Title from "../../../components/Title/Title";
import InputCustom from "../../../components/InputCustom/InputCustom";
import VacancyCompany from "../../../components/VacancyInProgress/VacancyInProgress";

// ASSETS
import backIcon from '../../../images/backIcon.png'
import rightIcon from '../../../images/rightIcon.png'
import SelectCustom from "../../../components/SelectCustom/SelectCustom";
import VacancysCompany from '../../../components/VacancysCompany/VacancysCompany';
import PaginationRounded from '../../PaginationRounded/PaginationRounded';

// API
import api from '../../../services/api'

const DashboardCompany = () => {
    const [toggle, setToggle] = useState(1);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [states, setStates] = useState([]);
    const [formData, setFormData] = useState({
        companyLocation: {
          city: "",
          state: "",
          address: ""
        }
      });

    // GET STATES
    useEffect(() => {
        const carregarStates = async () => {
            try {
                // Importar diretamente o arquivo JSON
                const data = require('./states.json');
                setStates(data.estados);
            } catch (error) {
                console.error('Erro ao carregar Estados:', error);
            }
        };

        carregarStates();
    }, [setStates]);

    const updateToggle = (id) => {
        setToggle(id)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name.startsWith("salaryRange")) {
          // Se o campo pertencer a salaryRange, atualize apenas esse campo
          setFormData((formData) => ({
            ...formData,
            salaryRange: {
              ...formData.salaryRange,
              [name]: parseFloat(value),
            },
          }));
        } else if (name === "state" || name === "city" || name === "address") {
          setFormData((formData) => ({
            ...formData,
            companyLocation: {
              ...formData.companyLocation,
              [name]: value,
            },
          }));
        } else if (name === "contactPersonId") {
          setFormData({ ...formData, [name]: parseFloat(value) });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };

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
                        <button to="/finalizadas" className="p-[12px] w-[227px] bg-[#00A3FF] text-[#FFF] rounded hover:opacity-85 cursor-pointer">
                            OFERTAR NOVA VAGA
                        </ button>
                    </Link>
                </div>

                <input className="w-full py-[12px] px-[16px]" placeholder="Pesquise uma vaga específica aqui...">
                </input>

                <div className="w-full flex pt-[24px]">
                    <div className="w-9/12">
                        <div className="flex gap-[12px] text-[18px]">
                            <div onClick={() => updateToggle(1)} className={toggle === 1 ? "cursor-pointer text-[#00A3FF] hover:opacity-70" : "cursor-pointer text-[#7C7C8A] hover:opacity-70"}>Em andamento</div>
                            <div onClick={() => updateToggle(2)} className={toggle === 1 ? "cursor-pointer text-[#7C7C8A] hover:opacity-70" : "cursor-pointer text-[#00A3FF] hover:opacity-70"}>Finalizadas</div>
                        </div>
                        {
                            toggle === 1 ?
                                <div className="mt-[6px] w-full rounded bg-[#D2D4D4]">
                                    <div className="relative z-10 w-[124px] border-3 rounded border-[#00A3FF] border-solid "></div>
                                </div>
                                :
                                <div className="z-0 mt-[6px] w-full rounded bg-[#D2D4D4]">
                                    <div className="relative z-10 left-[132px] w-[124px] border-3 rounded border-[#00A3FF] border-solid "></div>
                                </div>
                        }
                        <VacancysCompany
                            toggle={toggle}
                        />
                    </div>
                    <div className="flex flex-col rounded w-[411px] h-full mt-[51px] p-[12px] shadow-xl">
                        <h3 className="font-bold text-[#00A3FF] text-[24px]">Filtrar</h3>
                        <div className="flex flex-col gap-[12px]">
                            <SelectCustom
                                label="Estado"
                                id="state"
                                name="state"
                                value={formData.companyLocation.state}
                                onChange={handleInputChange}
                                options={states.map(state => ({ value: state.sigla, label: state.nome }))}
                            />

                            <SelectCustom
                                label="Cidade"
                                id="city"
                                name="city"
                                value={formData.companyLocation.city}
                                onChange={handleInputChange}
                                options={
                                    states.find(state => state.sigla === formData.companyLocation.state)?.cidades.map(city => ({
                                        value: city,
                                        label: city
                                    })) || []
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