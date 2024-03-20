import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./../../styles/css/JobList.module.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import SelectCustom from "../../components/SelectCustom/SelectCustom";
import { Slider } from "primereact/slider";
import { FaBuildingUser, FaLocationDot } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import api from "../../services/api";
import { educationLevelMapper } from "../../utils/utils";
import { useSelector } from "react-redux";
import InputCustom from "../../components/InputCustom/InputCustom";
import CoursesInProgress from "../../components/CoursesInProgress/CoursesInProgress";

function JobList() {
  const typeCollaborator = useSelector(
    (state) => state?.typeCollaborator?.typeCollaborator
  );
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const [presencial, setPresencial] = useState(false);
  const [remoto, setRemoto] = useState(false);
  const [salaryRange, setSalaryRange] = useState([0, 30000]);
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [states, setStates] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    categories: "",
    minSalary: salaryRange[0],
    maxSalary: salaryRange[1],
    state: "",
  });

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

    const min = e.value[0];
    const max = e.value[1];

    setFilter((prevFilter) => ({
      ...prevFilter,
      minSalary: min,
      maxSalary: max,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/jobs/open");
        const data = require("../../utils/states.json");
        setStates(data.estados);
        setJobs(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await api.get("/jobs/open");
      setJobs(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFilter({ ...filter, [name]: value });
  };

  const handleFilterClick = async () => {
    try {
      const response = await api.get("/jobs/jobs", {
        params: {
          name: filter.name.toLowerCase(),
          categories: filter.categories.toLowerCase(),
          state: filter.state.toLowerCase(),
          minSalary: filter.minSalary,
          maxSalary: filter.maxSalary,
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const clearFilters = async () => {
    setFilter({
      name: "",
      categories: "",
      minSalary: salaryRange[0],
      maxSalary: salaryRange[1],
      state: "",
    });
    setSalaryRange([0, 30000]);

    loadJobs();
  };

  const goToDetailsPage = (jobId) => {
    navigate(`/vagas/${jobId}`);
  };

  return (
    <>
      <NavBar></NavBar>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className="flex flex-col items-center justify-center bg-black h-[250px] w-full text-white">
            <h2 className="w-full mx-auto text-center text-[32px] font-bold">
              As melhores vagas com foco em{" "}
              <span className="text-customColor">REINTEGRAÇÃO SOCIAL</span>
            </h2>
            {typeCollaborator === "PRIVATE_ENTERPRISE" ? (
              <button
                className={styles.new}
                onClick={() => {
                  navigate("/nova-vaga");
                }}
              >
                Cadastrar nova vaga
              </button>
            ) : null}
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
            <div className="flex flex-col gap-[24px]">
              <div className={styles.filters_container}>
                <div className={styles.filter_header}>
                  <h2>Filtro de vagas</h2>
                  <button onClick={clearFilters}>Limpar</button>
                </div>
                <div className={styles.filters}>
                  <InputCustom
                    label="Titulo da Vaga"
                    id="name"
                    name="name"
                    value={filter.name}
                    onChange={handleInputChange}
                    type="text"
                  />

                  <InputCustom
                    label="Categorias"
                    id="categories"
                    name="categories"
                    value={filter.categories}
                    onChange={handleInputChange}
                    type="text"
                  />

                  <SelectCustom
                    label="Estado"
                    name="state"
                    id="state"
                    options={states.map((state) => ({
                      value: state.sigla,
                      label: state.nome,
                    }))}
                    value={filter.state}
                    onChange={handleInputChange}
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
                      step={50}
                    />
                    <button onClick={handleFilterClick}>Filtrar</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-[12px]">
                <div className="text-[#00A3FF]">
                  <h2>Cursos Anunciados</h2>
                </div>
                <div className="flex flex-col justify-center items-center gap-[12px]">
                  {courses.map((course, index) => {
                    {
                      return <CoursesInProgress key={index} course={course} />;
                    }
                  })}
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
