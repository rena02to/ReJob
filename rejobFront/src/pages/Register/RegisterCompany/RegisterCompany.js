import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import InputCustom from "../../../components/InputCustom/InputCustom";
import SelectCustom from "../../../components/SelectCustom/SelectCustom";
import TextareaCustom from "../../../components/TextareaCustom/TextareaCustom";
import BackLink from "../../../components/BackLink/BackLink";
import { isValidEmail, validatePassword } from "../../../utils/utils";

// Assets
import "./RegisterCompany.css";
import logo from "../../../images/newJob.png";

// Services
import api from "../../../services/api";

const RegisterCompany = () => {
  const [states, setStates] = useState([]);
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [formData, setFormData] = useState({
    cnpj: "",
    name: "",
    companyType: "",
    businessActivity: "",
    numberOfEmployees: "",
    headquarters: {
      city: "",
      state: "",
      address: "",
    },
    phone: "",
    institutionalDescription: "",
    email: "",
    password: "",
  });

  // GET STATES
  useEffect(() => {
    const carregarStates = async () => {
      try {
        // Importar diretamente o arquivo JSON
        const data = require("./states.json");
        setStates(data.estados);
      } catch (error) {
        console.error("Erro ao carregar Estados:", error);
      }
    };

    carregarStates();
  }, [setStates]);

  const formatCnpj = (cnpj) => {
    // Remove caracteres não numéricos
    const onlyNumbers = cnpj.replace(/[^\d]/g, "");

    // Limita o tamanho máximo do CNPJ
    const formattedCnpj = onlyNumbers.slice(0, 14);

    // Adiciona pontos, barra e traço conforme o formato do CNPJ
    const displayCnpj = formattedCnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );

    // Atualiza o estado com o CNPJ formatado
    setFormData({ ...formData, cnpj: formattedCnpj, displayCnpj });
  };

  const formatPhone = (phone) => {
    // Remove caracteres não numéricos
    const onlyNumbers = phone.replace(/[^\d]/g, "");

    // Limita o tamanho máximo do número de telefone
    const formattedPhone = onlyNumbers.slice(0, 11);

    // Adiciona parênteses, espaço e traço conforme o formato do telefone
    const displayPhone = formattedPhone.replace(
      /^(\d{2})(\d{4,5})(\d{4})$/,
      "($1) $2-$3"
    );

    // Atualiza o estado com o telefone formatado
    setFormData({ ...formData, phone: formattedPhone, displayPhone });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Restante do código

    if (name === "cnpj") {
      formatCnpj(value);
    } else if (name === "phone") {
      formatPhone(value);
    } else if (name === "confirmationPassword") {
      setConfirmationPassword(value);
    } else if (name === "state" || name === "city" || name === "address") {
      setFormData((formData) => ({
        ...formData,
        headquarters: {
          ...formData.headquarters,
          [name]: value,
        },
      }));
    } else if (name === "numberOfEmployees") {
      if (isNaN(value)) {
        setFormData({ ...formData, [name]: "" });
      } else {
        setFormData({ ...formData, [name]: Number(value) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.cnpj ||
      !formData.name ||
      !formData.email ||
      !formData.businessActivity ||
      !formData.headquarters.state ||
      !formData.headquarters.city ||
      !formData.companyType ||
      !formData.headquarters.address ||
      !formData.institutionalDescription ||
      !formData.numberOfEmployees ||
      !formData.phone
    ) {
      toast.warn("Por favor, preencha todos os campos obrigatórios.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.warn("Por favor, verifique o seu e-mail e tente novamente!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.warn(
        "A senha deve ter pelo menos uma letra maiúscula, no mínimo 8 caracteres e um símbolo especial. Por favor, tente novamente!",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      return;
    }

    if (formData.password !== confirmationPassword) {
      toast.warn(
        "As senhas inseridas não coincidem. Por favor, tente novamente!",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      return;
    }

    if (formData.institutionalDescription.length > 1000) {
      toast.warn("O limite de caracteres máximo em DESCRIÇÃO é: 1000", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      await api.post("/auth/register-Company", formData);
      toast.success(
        `A empresa: ${formData.name}, foi registrada na ReJob com sucesso.`,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    } catch (error) {
      console.error("Erro ao fazer a solicitação POST:", error);
    }
  };

  return (
    <div className="bg-gray">
      <BackLink />
      <main className="white-container">
        <div className="cabecalho">
          <img src={logo} />
          <h1>
            Re<span className="span-blue">Job</span>
          </h1>
          <p>Registre-se como Empresa / Organização</p>
        </div>
        <form className="form-registro-empresa">
          <div className="campos-registro-empresa">
            <SelectCustom
              label="Tipo de Empresa"
              id="companyType"
              name="companyType"
              value={formData.companyType}
              onChange={handleInputChange}
              options={[
                { value: "EMPRESA_COMERCIAL", label: "Empresa Comercial" },
                { value: "ONG", label: "ONG" },
              ]}
            />

            <InputCustom
              label="CNPJ"
              id="cnpj"
              name="cnpj"
              value={formData.displayCnpj || ""}
              onChange={handleInputChange}
              placeholder="XX.XXX.XXX/YYYY-ZZ"
              type="text"
            />

            <InputCustom
              label="Nome da Empresa"
              placeholder="Digite o Nome da Empresa"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              type="text"
            />

            <InputCustom
              label="Ramo de Atividade"
              id="businessActivity"
              name="businessActivity"
              value={formData.businessActivity}
              onChange={handleInputChange}
              placeholder="Digite o Ramo de Atividade"
              type="text"
            />

            <InputCustom
              label="Quantidade de Funcionários"
              id="numberOfEmployees"
              name="numberOfEmployees"
              value={formData.numberOfEmployees}
              onChange={handleInputChange}
              placeholder="Digite a Quantidade de Funcionários"
              type="text"
            />

            <SelectCustom
              label="Estado"
              id="state"
              name="state"
              value={formData.headquarters.state}
              onChange={handleInputChange}
              options={states.map((state) => ({
                value: state.sigla,
                label: state.nome,
              }))}
            />

            <SelectCustom
              label="Cidade"
              id="city"
              name="city"
              value={formData.headquarters.city}
              onChange={handleInputChange}
              options={
                states
                  .find((state) => state.sigla === formData.headquarters.state)
                  ?.cidades.map((city) => ({
                    value: city,
                    label: city,
                  })) || []
              }
            />

            <InputCustom
              label="Endereço"
              placeholder="Digite a endereço da empresa"
              type="text"
              id="address"
              name="address"
              value={formData.headquarters.address}
              onChange={handleInputChange}
            />

            <InputCustom
              label="Telefone"
              id="phone"
              name="phone"
              value={formData.displayPhone || ""}
              onChange={handleInputChange}
              placeholder="(XX) XXXX-XXXX"
              type="text"
            />

            <TextareaCustom
              label="Descrição Institucional da Empresa"
              id="institutionalDescription"
              name="institutionalDescription"
              rows={20}
              placeholder="Digite uma Descrição Institucional da Empresa"
              value={formData.institutionalDescription}
              onChange={handleInputChange}
              charmax={1000}
              countchar={formData.institutionalDescription.length}
            />

            <InputCustom
              label="Endereço de E-mail Corporativo"
              placeholder="Digite o e-mail"
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleInputChange}
            />

            <InputCustom
              label="Senha"
              placeholder="*******"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              autoComplete="new-password"
            />

            <InputCustom
              label="Confirme a Senha"
              placeholder="*******"
              id="confirmationPassword"
              name="confirmationPassword"
              value={confirmationPassword}
              onChange={handleInputChange}
              type="password"
              autoComplete="new-password"
            />

            <div className="box-botao-registrar-empresa">
              <button type="submit" onClick={handleFormSubmit} className="save">
                CADASTRAR
              </button>

              <div className="links-registro-empresa">
                <Link to="/">Voltar</Link>
                <Link to="/Login">Já tem uma empresa?Login</Link>
              </div>
            </div>
          </div>
        </form>
      </main>

      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default RegisterCompany;
