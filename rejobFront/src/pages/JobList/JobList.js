import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./../../styles/css/JobList.module.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import SelectCustom from "../../components/SelectCustom/SelectCustom";
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { FaBuildingUser, FaLocationDot } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import api from "../../services/api";
import { educationLevelMapper } from "../../utils/utils";
import { useSelector } from "react-redux";

function JobList() {
  const { typeUser } = useSelector((rootReducer) => rootReducer.useReducer);
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const [presencial, setPresencial] = useState(false);
  const [remoto, setRemoto] = useState(false);
  const [salaryRange, setSalaryRange] = useState([1000, 30000]);
  const [jobs, setJobs] = useState([]);
  const [states, setStates] = useState([]);

  const handlePresencialChange = () => {
    setPresencial(!presencial);
    if (remoto) {
      setRemoto(false);
    }
  };

  const handleRemotoChange = () => {
    setRemoto(!remoto);
    if (presencial) {
      setPresencial(false);
    }
  };

  const handleSalaryRangeChange = (e) => {
    setSalaryRange(e.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/jobs");
        const data = require("../../states.json");
        setStates(data.estados);
        setJobs(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterClick = () => {
    const filters = {
      state,
      presencial,
      remoto,
      salaryRange,
    };
  };

  const clearFilters = () => {
    setState(null);
    setPresencial(false);
    setRemoto(false);
    setSalaryRange([1000, 30000]);
  };

  const goToDetailsPage = (jobId) => {
    navigate(`/vagas/${jobId}`);
  };

  return (
    <>
      <NavBar></NavBar>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className="flex flex-col h-auto py-20 items-center justify-center bg-black w-full text-white">
            <h2 className="w-[760px] mx-auto text-center text-[32px] font-bold">
              As melhores vagas com foco em{" "}
              <span className="text-customColor">REINTEGRAÇÃO SOCIAL</span>
            </h2>
            {typeUser === "COLLABORATOR" ? 
              <a href="/nova-vaga">
                <a href="/nova-vaga" className={styles.new}>
                  <button>Cadastrar nova vaga</button>
                </a>
              </a>
              :
              null
            }
          </div>
          <div className={styles.body_container}>
            <div className={styles.job_list_container}>
              <h2>
                <span className="text-customColor mr-2">
                  {jobs.length > 0 ? jobs.length : "0"} vagas
                </span>
                disponíveis
              </h2>
              <div className={styles.job_list_view}>
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className={styles.card_joblist}
                    onClick={() => goToDetailsPage(job.id)}
                  >
                    <div className="flex flex-col justify-between gap-3">
                      <div>
                        <p className="text-[18px] text-customColor font-extrabold">
                          {job.companyName}
                        </p>
                        <p className="text-[24px] font-extrabold">
                          {job.jobTitle}
                        </p>
                        <button className={styles.button_outline}>
                          {job.categories.split("").length > 25
                            ? job.categories.substring(0, 25) + "..."
                            : job.categories}
                        </button>
                      </div>
                      <div className="flex flex-wrap h-auto w-full mt-8 text-end">
                        <div className="flex text-justify text-gray-500">
                          {job.companyName && (
                            <>
                              <FaBuildingUser className="ml-1" />
                              <span className="text-xs ml-1">
                                {job.companyName}
                              </span>
                            </>
                          )}
                          {job.companyLocation && (
                            <>
                              <FaLocationDot className="ml-1" />
                              <span className="text-xs ml-1 text-gray-500">
                                {job.companyLocation.city +
                                  "," +
                                  job.companyLocation.state +
                                  "," +
                                  job.companyLocation.address}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex text-justify text-gray-500">
                          {job.educationLevel && (
                            <>
                              <ImStatsBars className="ml-1" />
                              <span className="text-xs ml-1">
                                {educationLevelMapper(job.educationLevel)}
                              </span>
                            </>
                          )}
                          <RiMoneyDollarCircleLine className="ml-1 text-[15px]" />
                          <span className="text-xs ml-1">
                            {"R$" +
                              " " +
                              job.salaryRange.salaryRangeMin +
                              "-" +
                              job.salaryRange.salaryRangeMax}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-base md:text-lg my-2 text-gray-500">
                      {job.jobDescription}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.filters_container}>
              <div className={styles.filter_header}>
                <h2>Filtro de vagas</h2>
                <button onClick={clearFilters}>Limpar</button>
              </div>
              <div className={styles.filters}>
                <SelectCustom
                  label="Categoria da vaga"
                  options={[
                    { value: "Meio Período", label: "Meio Período" },
                    { value: "Período Integral", label: "Período Integral" },
                  ]}
                />
                <SelectCustom
                  label="Habilidades"
                  options={[
                    { value: "Meio Período", label: "Meio Período" },
                    { value: "Período Integral", label: "Período Integral" },
                  ]}
                />
                <p>Tipo de Vaga</p>
                <div className={styles.type_of_vacancy}>
                  <div>
                    <Checkbox
                      inputId="remoteCheckbox"
                      value="remoto"
                      onChange={handleRemotoChange}
                      checked={remoto}
                    />
                    <label htmlFor="remoteCheckbox"> Remoto</label>
                  </div>
                  <div>
                    <Checkbox
                      inputId="presencialCheckbox"
                      value="presencial"
                      onChange={handlePresencialChange}
                      checked={presencial}
                    />
                    <label htmlFor="presencialCheckbox"> Presencial</label>
                  </div>
                </div>
                <SelectCustom
                  label="Estado"
                  options={states.map((state) => ({
                    value: state.sigla,
                    label: state.nome,
                  }))}
                />
                <p>Faixa Salarial (Mensal)</p>
                <div className={styles.salary_range}>
                  <span>
                    R$ {salaryRange[0]} - R$ {salaryRange[1]}
                  </span>
                  <Slider
                    value={salaryRange}
                    onChange={handleSalaryRangeChange}
                    range
                    min={0}
                    max={30000}
                    step={1000}
                  />
                  <button onClick={handleFilterClick}>Filtrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default JobList;
