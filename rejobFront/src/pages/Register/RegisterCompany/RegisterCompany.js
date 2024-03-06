import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaCheck } from "react-icons/fa6";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";

// Components
import InputCustom from "../../../components/InputCustom/InputCustom";
import SelectCustom from "../../../components/SelectCustom/SelectCustom";
import TextareaCustom from "../../../components/TextareaCustom/TextareaCustom";
import BackLink from "../../../components/BackLink/BackLink";

// Assets
import "./RegisterCompany.css";
import logo from "../../../images/newJob.png";

// Services
import api from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";

const RegisterCompany = () => {
  const { visibilityPassword, visibilityRepeatPassword, coincidir, qCaracteres, maiusculo, minusculo, numero, simbolo } = useSelector((rootReducer) => rootReducer.useReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        const data = require("../../../utils/states.json");
        setStates(data.estados);
      } catch (error) {
        console.error("Erro ao carregar Estados:", error);
      }
    };

    carregarStates();
  }, [setStates]);

  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;

    const lengthRequirement = password.length >= 8;

    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    return (
      uppercaseRegex.test(password) &&
      lengthRequirement &&
      specialCharRegex.test(password)
    );
  };

  const formatCnpj = (cnpj) => {
    let valor = cnpj.replace(/\D/g, "").slice(0, 14);
    let valorFormatado = "";

    for (let i = 0; i < valor.length; i++) {
      if (i === 2 || i === 5) {
        valorFormatado += ".";
      } else if (i === 8) {
        valorFormatado += "/";
      }else if(i === 12){
        valorFormatado += "-";
      }
      valorFormatado += valor.charAt(i);
    }
    setFormData({ ...formData, cnpj: valorFormatado });
  };

  const formatPhone = (phone) => {
    let valor = phone.replace(/\D/g, "").slice(0, 11);
    let valorFormatado = "";

    for (let i = 0; i < valor.length; i++) {
      if (i === 0) {
        valorFormatado += "(";
      } else if (i === 2) {
        valorFormatado += ") ";
      } else if (i === 7) {
        valorFormatado += "-";
      }
      valorFormatado += valor.charAt(i);
    }
    setFormData({ ...formData, phone: valorFormatado });
  };

  function isValidEmail(email) {
    // Expressão regular para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

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
    }else if (name === "password" || name === "repeatPassword") {
      setFormData({ ...formData, [name]: value });
      if (name === "password") {
        const TemMaisDeOito = value.length >= 8;
        const TemNumeros = /\d/.test(value);
        const TemMaiusculos = /[A-Z]/.test(value);
        const TemMinusculos = /[a-z]/.test(value);
        const TemSimbolos = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        dispatch({ type: "TesteQuantCaracteres", payload: TemMaisDeOito });
        dispatch({ type: "setNumeros", payload: TemNumeros });
        dispatch({ type: "setMaiusculo", payload: TemMaiusculos });
        dispatch({ type: "setMinusculo", payload: TemMinusculos });
        dispatch({ type: "setSimbolos", payload: TemSimbolos });
      } else {
        dispatch({
          type: "TesteCoincidencia",
          payload: formData.password === value && formData.password !== "",
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Verificação de campos vazios
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
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    // Verificacao email
    if (!isValidEmail(formData.email)) {
      toast.warn("Por favor, verifique o seu e-mail e tente novamente!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    // Verificacao senha
    if (!validatePassword(formData.password)) {
      toast.warn(
        "A senha deve ter pelo menos uma letra maiúscula, no mínimo 8 caracteres e um símbolo especial. Por favor, tente novamente!",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      return;
    }

    if (formData.password !== confirmationPassword) {
      toast.warn(
        "As senhas inseridas não coincidem. Por favor, tente novamente!",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      return;
    }

    // Limite de caracteres
    if (formData.institutionalDescription.length > 1000) {
      toast.warn("O limite de caracteres máximo em DESCRIÇÃO é: 1000", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    try {
      const response = await api.post("/auth/register-Company", formData);

      const token = response.data;

      localStorage.setItem("token", token.token);

      toast.success(
        `A empresa: ${formData.name}, foi registrada na ReJob com sucesso.`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      navigate("/dashboard/empresa");
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
              value={formData.cnpj || ""}
              onChange={handleInputChange}
              placeholder="Digite o CNPJ da empresa"
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
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Digite o telefone da empresa"
              type="text"
            />

            <TextareaCustom
              label="Descrição Institucional da Empresa"
              id="institutionalDescription"
              name="institutionalDescription"
              institutionalDescription
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

            <div className="password">
              <InputCustom
                label="Senha"
                placeholder="Digite uma senha"
                type={visibilityPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="eyeButton"
                onClick={() => {
                  dispatch({ type: "ChangeVisibilityPassword", payload: !visibilityPassword });
                }}
              >
                {visibilityPassword ? (
                  <FaRegEye className="eye" />
                ) : (
                  <FaEyeSlash className="eye" />
                )}
              </button>
            </div>

            <div className="regras">
              <p>
                <strong>A senha deve:</strong>
              </p>

              <div className="qCaracteres">
                {qCaracteres ? (
                  <FaCheck className="v" />
                ) : (
                  <IoClose className="x" />
                )}
                <p>Possuir pelo menos 8 caracteres</p>
              </div>

              <div className="maiusculo">
                {maiusculo ? (
                  <FaCheck className="v" />
                ) : (
                  <IoClose className="x" />
                )}
                <p>Possuir pelo menos 1 caractere maiúsculo</p>
              </div>

              <div className="minusculo">
                {minusculo ? (
                  <FaCheck className="v" />
                ) : (
                  <IoClose className="x" />
                )}
                <p>Possuir pelo menos 1 caractere minúsculo</p>
              </div>

              <div className="number">
                {numero ? (
                  <FaCheck className="v" />
                ) : (
                  <IoClose className="x" />
                )}
                <p>Possuir pelo menos 1 número</p>
              </div>

              <div className="simbolo">
                {simbolo ? (
                  <FaCheck className="v" />
                ) : (
                  <IoClose className="x" />
                )}
                <p>Possuir pelo menos 1 caractere especial</p>
              </div>
            </div>

            <div className="password">
              <InputCustom
                label="Repita sua senha"
                placeholder="Repita sua senha"
                type={visibilityRepeatPassword ? "text" : "password"}
                id="repeatPassword"
                name="repeatPassword"
                autoComplete="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="eyeButton"
                onClick={() => {
                  dispatch({ type: "ChangeVisibilityRepeatPassword", payload: !visibilityRepeatPassword });
                }}
              >
                {visibilityRepeatPassword ? (
                  <FaRegEye className="eye" />
                ) : (
                  <FaEyeSlash className="eye" />
                )}
              </button>
            </div>

            <div className="coincidir">
              {coincidir ? (
                <FaCheck className="v" />
              ) : (
                <IoClose className="x" />
              )}
              <p>As senhas devem coincidir</p>
            </div>

            <div className="box-botao-registrar-empresa">
              <button type="submit" onClick={handleFormSubmit} className="save">
                CADASTRAR
              </button>

              <div className="links-registro-empresa">
                <Link to="/">Voltar</Link>
                <Link to="/Login">Já tem uma empresa? Faça login</Link>
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
