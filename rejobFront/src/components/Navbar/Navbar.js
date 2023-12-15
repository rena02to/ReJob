import React, { useState } from "react";
import "./Navbar.css";

import Icone from "../../images/newJob.jpg";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
      setIcon("nav__toggler toggle");
    } else setActive("nav__menu");
    setIcon("nav__toggler");
  };
  return (
    <nav className="nav">
      <div className="nav__brand">
        <img src={Icone} alt="Ícone" width={42} height={42} />
      </div>

      <div className="nav__rejob">
        <span className="re">Re</span>
        <span className="job">Job</span>
      </div>

      <ul className={active}>
        <li className="nav__item">
          <a href="#" className="nav__space">
            Ver Vagas
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Sou Empresa
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Sobre o projeto
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            <button id="Login">Login</button>
          </a>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
