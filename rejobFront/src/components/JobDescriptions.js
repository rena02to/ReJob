import React from "react";
import styles from "./../styles/css/JobDescriptions.module.css";
import NavBar from "./NavBar";
import Footer from "../components/Footer";

const JobDescriptions = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <p className={styles.text}>Starbucks</p>
        <h2 className={styles.title}>Auxiliar de Limpeza</h2>
        <p className={styles.textSub}>Serviços Gerais</p>
        <span className={styles.textButton}>
          Ficou com interesse na vaga? Demonstre o seu interesse e seja
          encontrado pela empresa.
        </span>
        <button className={styles.button}>Inscrever-se</button>
      </div>
      <div className={styles.containerCompany}>
        <div className={styles.benefits}>
          <div className={styles.enterpriseCard}>
            <h1>
              Empresa - <span>Starbucks</span>
            </h1>
            <h2>Barueri-SP</h2>
            <p className={styles.descriptions}>Máquina de fazer cafés</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book.
            </p>
            <span className={styles.benefitsCard}>Benefícios</span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book.
            </p>
          </div>
          <div className={styles.requirementCard}>
            <span>Requisitos</span>
            <h2>Habilidades Necessárias</h2>

            <button>Limpeza</button>
            <button>Organização</button>
            <button>Responsabilidade</button>
            <button>
              Conhecimentos básicos em produtos e técnicas de limpeza
            </button>
            <h2>Conhecimentos Necessários</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book.
            </p>
            <h2>Tempo de Experiência</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book.
            </p>

            <h2>Mais Detalhes</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book.
            </p>
          </div>
          <div className={styles.activatiesCard}>
            <span>Atividades</span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
              <br /> Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book.
              <br />
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book.
              <br /> Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book.
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. <br />
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book.
            </p>
          </div>

          <div className={styles.subscribeCard}>
            <h1>Ficou interessado na vaga?</h1>
            <h3> Demonstre o seu interesse e seja encontrado pela empresa</h3>
            <button className={styles.button}>Inscrever-se</button>
          </div>
        </div>
        <div className={styles.similarVacancies}>
          {" "}
          <p>Vagas similares</p>
          <div className={styles.vacancyCard}>
            <h2>Consultor SAP (Remoto)</h2>
            <span>Vizualizar vaga</span>
          </div>
        </div>
      </div>
      <Footer></Footer>;
    </div>
  );
};

export default JobDescriptions;
