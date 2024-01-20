import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./../../styles/css/JobDetails.module.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { FaBuildingUser } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import api from "../../services/api";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-evenly md:justify-center gap-12 h-[569px] w-full bg-black text-white">
          <div className="flex flex-col items-center justify-between h-[225px]">
            <div className="flex flex-col items-center gap-2 text-[18px] w-[501px] h-[52]">
              <span>{job.companyName}</span>
              <span className="w-max text-[52px]">{job.jobTitle}</span>
              <span className="text-customColor">{job.categories}</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-between gap-2 text-[26.57px] text-gray-500 h-[40px] w-full">
              {job.companyName && (
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2 md:mb-0">
                  <FaBuildingUser />
                  <span>{job.companyName}</span>
                </div>
              )}
              {job.companyLocation && (
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2 md:mb-0">
                  <FaLocationDot />
                  <span>
                    {job.companyLocation.city +
                      "," +
                      job.companyLocation.state +
                      "," +
                      job.companyLocation.address}
                  </span>
                </div>
              )}
              {job.educationLevel && (
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2 md:mb-0">
                  <ImStatsBars />
                  <span>{job.educationLevel}</span>
                </div>
              )}
              {job.salaryRange && (
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <RiMoneyDollarCircleLine className="text-[25px]" />
                  <span>
                    {"R$" +
                      " " +
                      job.salaryRange.salaryRangeMin +
                      "-" +
                      job.salaryRange.salaryRangeMax}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center md:gap-2">
            <span className="text-[18px] text-center md:text-left">
              Ficou com interesse na vaga? Demonstre o seu interesse e seja
              encontrado pela empresa.
            </span>
            <button className={styles.button}>Inscrever-se</button>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full h-[1405px]">
        <div className={styles.body_container}>
          <div className="flex flex-col justify-center items-center gap-8 w-[843px] md:w-5/6">
            <div className="w-5/6 h-[467px] p-8 rounded shadow-md bg-white">
              <h1 className="text-lg md:text-xl font-semibold">
                Empresa -{" "}
                <span className="text-customColor">{job.companyName}</span>
              </h1>
              {job.companyLocation &&
              (
                <h2 className="text-gray-500 text-sm md:text-base">
                  {job.companyLocation.city +
                    "," +
                    job.companyLocation.state +
                    "," +
                    job.companyLocation.address}
                </h2>
              )}
              <p className=" text-base md:text-lg my-2">
                <span className="ml-4 text-gray-500">{job.jobDescription}</span>
              </p>
              <span className="inline-block w-24 text-customColor  font-semibold text-lg md:text-xl">
                Benefícios
              </span>
              <p className=" text-gray-500 text-base md:text-lg">
                {job.benefits}
              </p>
            </div>
            <div className="flex flex-col gap-4 w-5/6 rounded h-[467px] p-8 shadow-md bg-white">
              <span className="text-lg text-customColor md:text-xl font-semibold">
                Requisitos
              </span>
              <span className="text-lg  md:text-xl font-semibold">
                Habilidades Necessárias
              </span>
              <button className="border border-customColor py-2 px-4 hover:bg-customColor hover:text-white transition duration-300 ease-in-out">
                Conhecimentos básicos em produtos e técnicas de limpeza
              </button>
              <span className="text-lg md:text-xl font-semibold">
                Conhecimentos Necessários
              </span>
              <p className=" text-gray-500 text-base md:text-lg">
                {job.requirements}
              </p>
              <span className="text-lg md:text-xl font-semibold">
                Tempo de Experiência
              </span>
              <p className=" text-gray-500 text-base md:text-lg">
                {job.requiredExperience}
              </p>
            </div>
            {job.responsibilities && (
              <div className="flex flex-col gap-4 w-5/6 rounded h-[467px] p-8 shadow-md bg-white">
                <span className="text-lg text-customColor md:text-xl font-semibold">
                  Atividades
                </span>
                <p className=" text-gray-500 text-base md:text-lg">
                  {job.responsibilities}
                </p>
              </div>
            )}
            <div className={styles.subscribeCard}>
              <h1>Ficou interessado na vaga?</h1>
              <h3> Demonstre o seu interesse e seja encontrado pela empresa</h3>
              <button className={styles.button}>Inscrever-se</button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>;
    </>
  );
};

export default JobDetails;
