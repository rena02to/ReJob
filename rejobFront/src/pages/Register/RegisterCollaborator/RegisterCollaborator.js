import ReJob from "../../../images/newJob.png";
import "./RegisterCollaborator.css";
import { FaCheck } from "react-icons/fa6";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import InputCustom from "../../../components/InputCustom/InputCustom";
import SelectCustom from "../../../components/SelectCustom/SelectCustom";
import BackLink from "../../../components/BackLink/BackLink";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { isValidEmail, validatePassword } from "../../../utils/utils";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../services/api";
import UserService from "../../../services/UserService";
import { useNavigate } from "react-router-dom";

function RegisterCollaboratory() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const userData = UserService();
  const [ visibilityPassword, setVisibilityPassword ] = useState(false);
  const [ visibilityRepeatPassword, setVisibilityRepeatPassword ] = useState(false);
  const [ coincidir, setCoincidir ] = useState(false);
  const [ qCaracteres, setQCaracteres ] = useState(false);
  const [ maiusculo, setMaiusculo ] = useState(false);
  const [ minusculo, setMinusculo ] = useState(false);
  const [ simbolo, setSimbolo ] = useState(false);
  const [ numero, setNumero ] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    collaboratorType: "",
    companyId: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
  });

  const options = [
    { value: "PRIVATE_ENTERPRISE", label: "Empresa" },
    { value: "ONG", label: "ONG" },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setFormData({ ...formData, [name]: value });
    } else if (name === "cpf") {
      let valor = value.replace(/\D/g, "").slice(0, 11);
      let valorFormatado = "";

      for (let i = 0; i < valor.length; i++) {
        if (i === 3 || i === 6) {
          valorFormatado += ".";
        } else if (i === 9) {
          valorFormatado += "-";
        }
        valorFormatado += valor.charAt(i);
      }
      setFormData({ ...formData, [name]: valorFormatado });
    } else if (name === "phoneNumber") {
      let valor = value.replace(/\D/g, "").slice(0, 11);
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
      setFormData({ ...formData, [name]: valorFormatado });
    } else if (name === "password" || name === "repeatPassword") {
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

  if (userData.companyType && !formData.collaboratorType) {
    setFormData({ ...formData, collaboratorType: userData.companyType });
  }

  if (userData.id && !formData.companyId) {
    setFormData({ ...formData, companyId: userData.id });
  }

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await api.get("/companies");
        setCompanies(response.data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    getCompanies();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.jobTitle ||
      !formData.collaboratorType ||
      !formData.companyId ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.repeatPassword
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

    try {
      const response = await api.post("/auth/register-collaborator", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        jobTitle: formData.jobTitle,
        collaboratorType: formData.collaboratorType,
        companyId: Number(formData.companyId),
      });
      const token = response.data;

      localStorage.setItem("token", token.token);

      toast.success(
        `O colaborador: ${formData.name}, foi registrado na ReJob com sucesso.`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
      navigate("/login");
    } catch (error) {
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
    <section className="background">
      <BackLink className="back" />
      <ToastContainer autoClose={5000} />
      <form>
        <img src={ReJob} alt="ReJob" />
        <p className="rejob">
          Re<span>Job</span>
        </p>
        <p>Registre-se como colaborador!</p>

        <InputCustom
          label="Nome Completo"
          placeholder="Digite o Nome Completo"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <InputCustom
          label="CPF"
          placeholder="Digite o CPF"
          type="text"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleInputChange}
        />

        <SelectCustom
          label="Colaborador vinculado à uma..."
          id="collaboratorType"
          name="collaboratorType"
          value={formData.collaboratorType}
          onChange={handleInputChange}
          options={options}
          disabled={userData}
        />

        <SelectCustom
          label="Empresa"
          placeholder="Você é colaborador de qual empresa?"
          id="companyId"
          name="companyId"
          value={formData.companyId}
          onChange={handleInputChange}
          options={companies.map((company) => {
            return { value: company.id, label: company.name };
          })}
          disabled={userData}
        />

        <InputCustom
          label="Cargo ou Função"
          placeholder="Digite seu cargo ou fução na empresa"
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleInputChange}
        />

        <InputCustom
          label="E-mail"
          placeholder="Digite seu e-mail pessoal"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <InputCustom
          label="Telefone"
          placeholder="Digite seu número de telefone"
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
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
            {maiusculo ? <FaCheck className="v" /> : <IoClose className="x" />}
            <p>Possuir pelo menos 1 caractere maiúsculo</p>
          </div>

          <div className="minusculo">
            {minusculo ? <FaCheck className="v" /> : <IoClose className="x" />}
            <p>Possuir pelo menos 1 caractere minúsculo</p>
          </div>

          <div className="number">
            {numero ? <FaCheck className="v" /> : <IoClose className="x" />}
            <p>Possuir pelo menos 1 número</p>
          </div>

          <div className="simbolo">
            {simbolo ? <FaCheck className="v" /> : <IoClose className="x" />}
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
            onClick={() => {setVisibilityRepeatPassword(!visibilityRepeatPassword)}}
          >
            {visibilityRepeatPassword ? (
              <FaRegEye className="eye" />
            ) : (
              <FaEyeSlash className="eye" />
            )}
          </button>
        </div>

        <div className="coincidir">
          {coincidir ? <FaCheck className="v" /> : <IoClose className="x" />}
          <p>As senhas devem coincidir</p>
        </div>

        <button type="submit" className="submit" onClick={handleFormSubmit}>
          CADASTRAR
        </button>

        <p className="login">
          Já possui uma conta? <a href="/login">Faça login</a>
        </p>
      </form>
    </section>
  );
}

export default RegisterCollaboratory;
