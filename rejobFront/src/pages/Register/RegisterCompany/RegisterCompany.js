import React from "react";

// components
import InputCustom from "../../../components/InputCustom/InputCustom";
import SelectCustom from "../../../components/SelectCustom/SelectCustom";

// import css 
import './RegisterCompany.css'

// import images/icons
import logo from '../../../images/newJob.png'

const RegisterCompany = () => {
    return (
        <div className="background">
            <div className="back-button">
                <a href="#">Voltar para a página anterior</a>
            </div>

            <div className="container">
                <div className="title-box">
                    <img className="logo" width={120} src={logo} />
                    <h1>Re<span>Job</span></h1>
                    <p>Registre-se como empresa/organização</p>
                </div>

                <form className="form-custom">
                    <div className="campos">

                        <SelectCustom
                            label="Categoria"
                            options={[
                                    { value: 'Empresa', label: 'Empresa' },
                                    { value: 'ONG', label: 'ONG' }
                                ]
                            }
                        />

                        <InputCustom
                            label="Razão Social"
                            placeholder="Digite a Razão Social"
                            type="text"
                        />

                        <InputCustom
                            label="CNPJ"
                            placeholder="Digite o CNPJ da empresa"
                            type="number"
                        />

                        <InputCustom
                            label="Ramo de Atividade"
                            placeholder="Digite o Ramo de Atividade"
                            type="text"
                        />

                        <InputCustom
                            label="Quantidade de Funcionarios"
                            placeholder="Digite a Quantidade de Funcionarios"
                            type="number"
                        />

                        <InputCustom
                            label="Quantidade de Funcionarios"
                            placeholder="Digite a Quantidade de Funcionarios"
                            type="number"
                        />

                    </div>
                </form>
                <div>
                    checkbox
                </div>
                <div>
                    buttons
                </div>

            </div>


        </div>
    );
}

export default RegisterCompany;