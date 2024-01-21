import React, { useState } from "react";
import style from "./../../styles/css/GeneralServices.module.css";
import { ProgressBar } from "primereact/progressbar";
import NavBar from "../../components/NavBar";
import ExpandingSection from "../../components/ExpenseSection/ExpenseSection";

const GeneralServices = () => {
  const [progressBar, setProgressBar] = useState(50);

  return (
    <div>
      <NavBar />
      <div className={style.body_container}>
        <div>
          <h1 className="text-customColor">SERVIÇOS GERAIS</h1>
          <p className="font-normal">
            Acompanhe abaixo o andamento de cada etapa do seu processo seletivo.
            Caso queira consultar a descrição da vaga,
            <a className="text-sky-500" href="">
              clique aqui
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col self-center w-full gap-4 p-4">
          <div className="w-full flex justify-between">
            <span className="font-normal">Seu progresso</span>
            {progressBar + "/100"}
          </div>
          <ProgressBar
            value={progressBar}
            showValue={false}
            pt={{
              value: {
                style: {
                  background: "#00A3FF",
                },
              },
            }}
          ></ProgressBar>
          <div className="flex flex-col">
            <ExpandingSection
              title="Currículo"
              content="Conteúdo para Currículo"
            />
            <ExpandingSection
              title="Em Análise"
              content="Conteúdo para Em Análise"
            />
            <ExpandingSection
              title="Entrevista RH"
              content="Conteúdo para Entrevista RH"
            />
            <ExpandingSection title="Final" content="Conteúdo para Final" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GeneralServices;
