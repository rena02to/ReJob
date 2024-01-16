import React from "react";
import style from "./../../styles/css/GeneralServices.module.css";
import Icone from "./../../images/newJob.png";
import image from "./../../images/Ellipse 3.png";

const GeneralServices = () => {
  return (
    <div>
      <nav className={style.NavBarServices}>
        <div className={style.textIcon}>
          <img src={Icone} alt="Ícone" width={43} height={43} />
          <span className={style.re}>Re</span>
          <span className={style.job}>Job</span>
        </div>
        <span>Ver Vagas</span>
        <p>Dashboard</p>
        <img src={image} alt="Ícone" width={60} height={60} />
      </nav>
      <div className={style.GeneralServices}>
        <div>
          <h1>Serviços Gerais</h1>
          <h4>
            Acompanhe abaixo o andamento de cada etapa do seu processo seletivo.
            Caso queira consultar a descrição da vaga,<span>clique aqui.</span>
          </h4>
        </div>
      </div>
    </div>
  );
};
export default GeneralServices;
