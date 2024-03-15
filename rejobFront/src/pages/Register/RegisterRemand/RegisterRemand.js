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
import { isValidEmail, validatePassword } from "../../../utils/utils";

// Assets
import "./RegisterRemand.css";
import logo from "../../../images/newJob.png";

// Services
import api from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";

const RegisterRemand = () => {
  const [ visibilityPassword, setVisibilityPassword ] = useState(false);
  const [ visibilityRepeatPassword, setVisibilityRepeatPassword ] = useState(false);
  const [ coincidir, setCoincidir ] = useState(false);
  const [ qCaracteres, setQCaracteres ] = useState(false);
  const [ maiusculo, setMaiusculo ] = useState(false);
  const [ minusculo, setMinusculo ] = useState(false);
  const [ simbolo, setSimbolo ] = useState(false);
  const [ numero, setNumero ] = useState(false);
  const dispatch = useDispatch();
  const [states, setStates] = useState([]);
  const navigate = useNavigate();
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    cpf: "",
    prisonCode: "",
    educationLevel: "",
    dateOfBirth: "",
    residenceLocation: {
      state: "",
      city: "",
      address: "",
    },
    sentenceRegime: "",
    professionalExperience: "",
    areasOfInterest: "",
    skillsAndQualifications: "",
    educationalHistory: "",
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

  const formatCpf = (cpf) => {
    let valor = cpf.replace(/\D/g, "").slice(0, 11);
    let valorFormatado = "";

    for (let i = 0; i < valor.length; i++) {
      if (i === 3 || i === 6) {
        valorFormatado += ".";
      } else if (i === 9) {
        valorFormatado += "-";
      }
      valorFormatado += valor.charAt(i);
    }
    setFormData({ ...formData, cpf: valorFormatado });
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
    setFormData({ ...formData, phoneNumber: valorFormatado });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "cpf") {
      formatCpf(value);
    } else if (name === "phoneNumber") {
      formatPhone(value);
    } else if (name === "confirmationPassword") {
      setConfirmationPassword(value);
    } else if (name === "state" || name === "city" || name === "address") {
      setFormData((formData) => ({
        ...formData,
        residenceLocation: {
          ...formData.residenceLocation,
          [name]: value,
        },
      }));
    }else if (name === "password" || name === "repeatPassword") {
      setFormData({ ...formData, [name]: value });
      if (name === "password") {
        const TemMaisDeOito = value.length >= 8;
        const TemNumeros = /\d/.test(value);
        const TemMaiusculos = /[A-Z]/.test(value);
        const TemMinusculos = /[a-z]/.test(value);
        const TemSimbolos = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        setQCaracteres(TemMaisDeOito);
        setNumero(TemNumeros);
        setMaiusculo(TemMaiusculos);
        setMinusculo(TemMinusculos);
        setSimbolo(TemSimbolos);
      } else {
        setCoincidir(formData.password === value && formData.password !== "");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password ||
      !formData.cpf ||
      !formData.prisonCode ||
      !formData.educationLevel ||
      !formData.dateOfBirth ||
      !formData.residenceLocation.state ||
      !formData.residenceLocation.city ||
      !formData.residenceLocation.address ||
      !formData.sentenceRegime ||
      !formData.professionalExperience ||
      !formData.areasOfInterest ||
      !formData.skillsAndQualifications ||
      !formData.educationalHistory
    ) {
      toast.warn("Por favor, preencha todos os campos obrigatórios.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.warn("Por favor, verifique o seu e-mail e tente novamente!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.warn(
        "A senha deve ter pelo menos uma letra maiúscula, no mínimo 8 caracteres e um símbolo especial. Por favor, tente novamente!",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      toast.warn(
        "As senhas inseridas não coincidem. Por favor, tente novamente!",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      return;
    }

    if (formData.professionalExperience.length > 1000) {
      toast.warn("O limite de caracteres máximo em DESCRIÇÃO é: 1000", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    if (formData.skillsAndQualifications.length > 1000) {
      toast.warn("O limite de caracteres máximo em DESCRIÇÃO é: 1000", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    if (formData.educationalHistory.length > 1000) {
      toast.warn("O limite de caracteres máximo em DESCRIÇÃO é: 1000", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    try {
      await api.post("/auth/register-employee", formData);
      toast.success(
        `${formData.name}, sua conta foi criada na ReJob com sucesso.`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer a solicitação POST:", error);

      if (error.response && error.response.status === 409) {
        toast.error(
          "Já existe uma conta cadastrada neste email. Por favor, insira outro e-mail ou logue na conta.",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    }
  };

  return (
    <div className="bg-gray">
      <BackLink />
      <main className="white-container">
        <div className="cabecalho">
          <img src={logo} alt="logo" />
          <h1>
            Re<span className="span-blue">Job</span>
          </h1>
          <p>Registre-se como Egresso</p>
        </div>
        <form className="form-registro-empresa">
          <div className="campos-registro-empresa">
            <InputCustom
              label="Nome Completo"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Digite o Nome completo"
              type="text"
            />

            <InputCustom
              label="Telefone"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Digite seu número de telefone"
              type="text"
            />

            <InputCustom
              label="Endereço de E-mail"
              placeholder="Digite o E-mail"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="username"
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
                onClick={() => {setVisibilityPassword(!visibilityPassword)}}
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
                onClick={() => {setVisibilityPassword(!visibilityPassword)}}
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

            <InputCustom
              label="CPF"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              placeholder="Digite seu CPF"
              type="text"
            />

            <InputCustom
              label="Código de Prisão"
              id="prisonCode"
              name="prisonCode"
              value={formData.prisonCode}
              onChange={handleInputChange}
              placeholder="Digite o Código de Prisão"
              type="text"
            />

            <SelectCustom
              label="Escolaridade"
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleInputChange}
              options={[
                {
                  value: "ENSINO_FUNDAMENTAL_INCOMPLETO",
                  label: "Ensino Fundamental Incompleto",
                },
                {
                  value: "ENSINO_FUNDAMENTAL_COMPLETO",
                  label: "Ensino Fundamental Completo",
                },
                {
                  value: "ENSINO_MEDIO_INCOMPLETO",
                  label: "Ensino Médio Incompleto",
                },
                {
                  value: "ENSINO_MEDIO_COMPLETO",
                  label: "Ensino Médio Completo",
                },
                {
                  value: "EDUCACAO_SUPERIOR_INCOMPLETA",
                  label: "Educação Superior Incompleta",
                },
                {
                  value: "EDUCACAO_SUPERIOR_COMPLETA",
                  label: "Educação Superior Completa",
                },
                {
                  value: "POS_GRADUACAO_INCOMPLETA",
                  label: "Pós Graduação Incompleta",
                },
                {
                  value: "POS_GRADUACAO_COMPLETA",
                  label: "Pós Graduação Completa",
                },
                { value: "MESTRADO_INCOMPLETO", label: "Mestrado Incompleto" },
                { value: "MESTRADO_COMPLETO", label: "Mestrado Completo" },
                {
                  value: "DOUTORADO_INCOMPLETO",
                  label: "Doutorado Incompleto",
                },
                { value: "DOUTORADO_COMPLETO", label: "Doutorado Completo" },
                { value: "OUTRO", label: "Outro" },
              ]}
            />

            <InputCustom
              label="Data de Aniversário"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              placeholder="Digite a data de Aniversário"
              type="date"
            />

            <SelectCustom
              label="Estado"
              id="state"
              name="state"
              value={formData.residenceLocation.state}
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
              value={formData.residenceLocation.city}
              onChange={handleInputChange}
              options={
                states
                  .find(
                    (state) => state.sigla === formData.residenceLocation.state
                  )
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
              value={formData.residenceLocation.address}
              onChange={handleInputChange}
            />

            <SelectCustom
              label="Regime de Cumprimento de Pena"
              id="sentenceRegime"
              name="sentenceRegime"
              value={formData.sentenceRegime}
              onChange={handleInputChange}
              options={[
                { value: "FECHADO", label: "Fechado" },
                { value: "SEMIABERTO", label: "Semi Aberto" },
                { value: "ABERTO", label: "Aberto" },
                { value: "LIBERADO", label: "Liberado" },
              ]}
            />

            <InputCustom
              label="Áreas de Interesse"
              id="areasOfInterest"
              name="areasOfInterest"
              value={formData.areasOfInterest}
              onChange={handleInputChange}
              placeholder="Digite as suas Áreas de Interesse"
              type="text"
            />

            <TextareaCustom
              label="Experiência Profissional"
              id="professionalExperience"
              name="professionalExperience"
              value={formData.professionalExperience}
              onChange={handleInputChange}
              rows={20}
              placeholder="Digite uma descrição sobre sua Experiência Profissional"
              charmax={1000}
              countchar={formData.professionalExperience.length}
            />

            <TextareaCustom
              label="Habilidades e Qualificações"
              id="skillsAndQualifications"
              name="skillsAndQualifications"
              value={formData.skillsAndQualifications}
              onChange={handleInputChange}
              rows={20}
              placeholder="Digite uma descrição sobre suas Habilidades e Qualificações"
              charmax={1000}
              countchar={formData.skillsAndQualifications.length}
            />

            <TextareaCustom
              label="Histórico Educacional"
              id="educationalHistory"
              name="educationalHistory"
              value={formData.educationalHistory}
              onChange={handleInputChange}
              rows={20}
              placeholder="Digite uma descrição sobre seu Histórico Educacional"
              charmax={1000}
              countchar={formData.educationalHistory.length}
            />

            <div className="box-botao-registrar-empresa">
              <button type="submit" onClick={handleFormSubmit} className="save">
                CADASTRAR
              </button>

              <div className="links-registro-empresa">
                <Link to="/">Voltar</Link>
                <Link to="/Login">Já tem uma conta? Faça login</Link>
              </div>
            </div>
          </div>
        </form>
      </main>

      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default RegisterRemand;
