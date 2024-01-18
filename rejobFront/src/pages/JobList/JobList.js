import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./../../styles/css/JobList.module.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { FaBuildingUser, FaLocationDot } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import api from "../../services/api";

function JobList() {
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const [presencial, setPresencial] = useState(false);
  const [remoto, setRemoto] = useState(false);
  const [salaryRange, setSalaryRange] = useState([1000, 30000]);
  const [jobs, setJobs] = useState([]);

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

  const brazilianStates = [
    { label: "Acre", value: "AC" },
    { label: "Alagoas", value: "AL" },
    { label: "Amapá", value: "AP" },
    { label: "Amazonas", value: "AM" },
    { label: "Bahia", value: "BA" },
    { label: "Ceará", value: "CE" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Goiás", value: "GO" },
    { label: "Maranhão", value: "MA" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Pará", value: "PA" },
    { label: "Paraíba", value: "PB" },
    { label: "Paraná", value: "PR" },
    { label: "Pernambuco", value: "PE" },
    { label: "Piauí", value: "PI" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Rondônia", value: "RO" },
    { label: "Roraima", value: "RR" },
    { label: "Santa Catarina", value: "SC" },
    { label: "São Paulo", value: "SP" },
    { label: "Sergipe", value: "SE" },
    { label: "Tocantins", value: "TO" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/jobs");
        console.log(response);
        setJobs(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterClick = () => {
    // eslint-disable-next-line
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

  const goToDetailsPage = (index) => {
    navigate(`/jobs/${index}`);
  };

  return (
    <>
      <NavBar></NavBar>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className="flex items-center justify-center bg-black w-full h-[250px] text-white">
            <h2 className="w-[760px] mx-auto text-center text-[32px] font-bold">
              As melhores vagas com foco em{" "}
              <span className="text-customColor">REINTEGRAÇÃO SOCIAL</span>
            </h2>
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
                {jobs.map((job, index) => (
                  <div
                    key={index}
                    className={styles.card_joblist}
                    onClick={() => goToDetailsPage(index + 1)}
                  >
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-[18px] text-customColor font-extrabold">
                          {job.companyName}
                        </p>
                        <p className="text-[24px] font-extrabold">
                          {job.jobTitle}
                        </p>
                        <button className={styles.button_outline}>
                          {job.categories}
                        </button>
                      </div>
                      <div className="self-center h-[40px] w-[309.18px]text-end">
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
                                {job.companyLocation}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex text-justify text-gray-500">
                          {job.educationLevel && (
                            <>
                              <ImStatsBars className="ml-1" />
                              <span className="text-xs ml-1">
                                {job.educationLevel}
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
                <p>Categoria da Vaga</p>
                <Dropdown
                  value={state}
                  options={brazilianStates}
                  onChange={(e) => setState(e.value)}
                  placeholder="Selecione a categoria"
                />
                <p>Habilidades</p>
                <Dropdown
                  value={state}
                  options={brazilianStates}
                  onChange={(e) => setState(e.value)}
                  placeholder="Selecione uma opção"
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
                <p>Localização</p>
                <Dropdown
                  value={state}
                  options={brazilianStates}
                  onChange={(e) => setState(e.value)}
                  placeholder="Selecione uma opção"
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
