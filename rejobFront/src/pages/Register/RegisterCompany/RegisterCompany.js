import React from "react";
import "./RegisterCompany.css"
import logo from "../../../images/newJob.png"

const RegisterCompany = () => {
    return (
        <div className="bg-gray">
            <main className="white-container">
                <div className="cabecalho">
                    <img src={logo}/>
                    <h1>Re<span className="span-blue">Job</span></h1>
                    <p>Registre-se como Egresso</p>
                </div>
                <form className="form-registro-empresa">

                </form>
            </main>
        </div>
    );
}

export default RegisterCompany;