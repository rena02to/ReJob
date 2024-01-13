import ReJob from './../../images/newJob.png';
import { Formik, Form, Field } from 'formik';
import style from './../../styles/css/RegisterCompany.module.css';
import { FaArrowLeftLong, FaCheck, FaRegBuilding, FaUsers, FaPenFancy } from "react-icons/fa6";
import { GiModernCity } from "react-icons/gi";
import { TbBuildingEstate } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiGitBranchFill } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useEffect } from 'react';

function RegisterCompany(){
    const dispatch = useDispatch();
    const { visibilityPassword, visibilityRepeatPassword, coincidir, qCaracteres, maiusculo, minusculo, numero, simbolo, statesAndCityes, states, cityes, estado, cidade } = useSelector(rootReducer => rootReducer.useReducer)

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:5000/estados')
            .then((resp) => resp.json())
            .then((data) => {
                let options2 = [];
                data.map((estado) => (
                    options2.push({value: estado.nome, label: estado.nome})
                ));
                dispatch({type: "setStates", payload: options2});
                dispatch({type: 'setStatesAndCityes', payload: data});
            })
            .catch((err) => console.log(err));
        }

        fetchData();
    }, [])


    const initialValues = {
        typeCompany: '',
        nameCompany: '',
        cnpj: '',
        branch: '',
        qFunc: '',
        estado: '',
        cidade: '',
        email: '',
        desc: '',
        password: '',
        RepeatPassword: '',
        terms: false,
        notify: false
    };

    const options = [
        {value: "Empresa", label: "Empresa"},
        {value: "ONG", label: "ONG"},
    ]

    const Teste = () => {
        const password = document.getElementById("password").value;
        const passwordRepeat = document.getElementById("RepeatPassword").value;
        const TemMaisDeOito = password.length >= 8;
        const TemNumeros = /\d/.test(password);
        const TemMaiusculos = /[A-Z]/.test(password);
        const TemMinusculos = /[a-z]/.test(password);
        const TemSimbolos = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        dispatch({type: 'TesteQuantCaracteres', payload: TemMaisDeOito})
        dispatch({type: 'setNumeros', payload: TemNumeros})
        dispatch({type: 'setMaiusculo', payload: TemMaiusculos})
        dispatch({type: 'setMinusculo', payload: TemMinusculos})
        dispatch({type: 'setSimbolos', payload: TemSimbolos})
        dispatch({type: 'TesteCoincidencia', payload: password === passwordRepeat && password !== ""});
    }

    const formataTel = () => {
        const tel = document.getElementById('tel');
        let valor = tel.value.replace(/\D/g, '');
        let valorFormatado = '';

        for(let i = 0; i < valor.length; i++){
            if(i === 0){
                valorFormatado += '(';
            }else if(i === 2){
                valorFormatado += ')';
            }else if(i === 7){
                valorFormatado += '-';
            }
            valorFormatado += valor.charAt(i);
        }

        tel.value = valorFormatado;
    }

    const formataCNPJ = () => {
        const cnpj = document.getElementById('cnpj');
        let valor = cnpj.value.replace(/\D/g, '');
        let valorFormatado = '';

        for(let i = 0; i < valor.length; i++){
            if(i === 3 || i === 6){
                valorFormatado += '.';
            }else if(i === 9){
                valorFormatado += '/';
            }else if(i === 13){
                valorFormatado += '-';
            }
            valorFormatado += valor.charAt(i);
        }

        cnpj.value = valorFormatado;
    }

    const alteraEstado = (opcao) => {
        dispatch({type: "setCidade", payload: null});
        dispatch({type: 'setEstado', payload: opcao.value})
        let cidades = statesAndCityes.find(estado => estado.nome === opcao.value);
        cidades = cidades.cidades;
        let opcoes = [];
        cidades.map((cidade) => {
            opcoes.push({value: cidade, label: cidade});
        })
        dispatch({type: "setCityes", payload: opcoes});
    }

    const alteraCidade = (opcao) => {
        dispatch({type: "setCidade", payload: opcao});
    }

    const alteraTipoEmpresa = (opcao) => {
        dispatch({type: 'setTypeOfCompany', payload: opcao.value})
    }

    const CadastrarSe = () => {
        alert("Cadastrar usuário no db");
    }

    return(
        <section className={style.background}>
            <a href='/register' className={style.back} >
                <FaArrowLeftLong />
                <p>Voltar</p>
            </a>

            <Formik initialValues={initialValues} onSubmit={CadastrarSe}>
                <Form>
                    <img src={ReJob} alt='ReJob' />
                    <p className={style.rejob}>Re<span>Job</span></p>
                    <p>Registre-se como empresa/organização!</p>

                    <div className={style.selectBox}>
                        <label htmlFor="typeCompany">Categoria</label>
                        <div className={style.input}>
                            <Select styles={{ control: (provided) => ({ ...provided, paddingLeft: '30px' }) }} options={options} className={style.select} name='typeCompany' id='typeCompany' onChange={alteraTipoEmpresa} placeholder="Selecione uma opção" required/>
                            <MdOutlineCategory className={style.icon} />
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="nameCompany">Empresa</label>
                        <div className={style.input}>
                            <Field name="nameCompany" id="nameCompany" type="text" placeholder="Digite a razão social da empresa" required />
                            <FaRegBuilding />
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="cnpj">CNPJ</label>
                        <div className={style.input}>
                            <Field name="cnpj" id="cnpj" type="text" placeholder="CNPJ da empresa" maxLength={19} minLength={19} onChange={formataCNPJ} required />
                            <HiIdentification />
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="branch">Ramo de atividade</label>
                        <div className={style.input}>
                            <Field name="branch" id="branch" type="text" placeholder="Ramo de atividade da empresa" required />
                            <RiGitBranchFill />
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label fhtmlForor="qFunc">Quantidade de funcionários</label>
                        <div className={style.input}>
                            <Field name="qFunc" id="qFunc" type="number" placeholder="1" required />
                            <FaUsers />
                        </div>
                    </div>

                    <div className={style.selectBox}>
                        <label htmlFor="local">Local da empresa</label>
                        <div className={style.input}>
                            <Select styles={{ control: (provided) => ({ ...provided, paddingLeft: '30px' }) }} options={states} className={style.select} name="estado" id="estado" onChange={alteraEstado} placeholder="Estado" required/>
                            <GiModernCity className={style.icon} />
                        </div>

                        <div className={style.inputCidade}>
                            <Select styles={{ control: (provided) => ({ ...provided, paddingLeft: '30px' }) }} options={cityes} className={style.select} name="cidade" id="cidade" placeholder="Cidade" value={cidade} onChange={alteraCidade} isDisabled={estado !== null ? false : true} required/>
                            <TbBuildingEstate className={style.icon} />
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="contato">Contatos da empresa</label>
                        <div className={style.input} name="contato">
                            <Field name="email" id="email" type="email" placeholder="Digite seu e-mail" required />
                            <AiOutlineMail/>
                        </div>
                        <div className={style.inputTel} name="contato">
                            <Field name="tel" id="tel" type="text" placeholder="Número de telefone" maxLength={14} minLength={14} onChange={formataTel} required />
                            <BsFillTelephoneFill/>
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="desc">Descrição institucional</label>
                        <div className={style.inputTextArea}>
                            <Field name="desc" id="desc" as="textarea" placeholder="Digite uma breve descrição sobre a empresa (opcional)" required />
                            <FaPenFancy />
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="password">Sua senha</label>
                        <div className={style.input}>
                            <Field name="password" id="password" type={visibilityPassword ? "text" : "password"} placeholder="Digite sua senha" required onChange={Teste} />
                            <AiOutlineLock />
                        </div>
                        {visibilityPassword ? <FaEyeSlash className={style.eye} onClick={() => {dispatch({type: 'ChangeVisibilityPassword',})}} /> : <FaRegEye className={style.eye} onClick={() => {dispatch({type: 'ChangeVisibilityPassword',})}} />}
                    </div>

                    <div className={style.regras}>
                        <p><strong>A senha deve:</strong></p>

                        <div className={style.qCaracteres}>
                            {qCaracteres ? <FaCheck className={style.check} /> : <IoClose className={style.close} />}
                            <p>Possuir pelo menos 8 caracteres</p>
                        </div>

                        <div className={style.maiusculo}>
                            {maiusculo ? <FaCheck className={style.check} /> : <IoClose className={style.close} />}
                            <p>Possuir pelo menos 1 caractere maiúsculo</p>
                        </div>

                        <div className={style.minusculo}>
                            {minusculo ? <FaCheck className={style.check} /> : <IoClose className={style.close} />}
                            <p>Possuir pelo menos 1 caractere minúsculo</p>
                        </div>

                        <div className={style.number}>
                            {numero ? <FaCheck className={style.check} /> : <IoClose className={style.close} />}
                            <p>Possuir pelo menos 1 número</p>
                        </div>

                        <div className={style.simbolo}>
                            {simbolo ? <FaCheck className={style.check} /> : <IoClose className={style.close} />}
                            <p>Possuir pelo menos 1 caractere especial</p>
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="RepeatPassword">Confirme sua senha</label>
                        <div className={style.input}>
                            <Field name="RepeatPassword" id="RepeatPassword" type={visibilityRepeatPassword ? "text" : "password"} placeholder="Repita sua senha" required onChange={Teste} />
                            <AiOutlineLock />
                        </div>
                        {visibilityRepeatPassword ? <FaEyeSlash onClick={() => {dispatch({type: 'ChangeVisibilityRepeatPassword',})}} className={style.eye} /> : <FaRegEye onClick={() => {dispatch({type: 'ChangeVisibilityRepeatPassword',})}} className={style.eye} />}
                    </div>
                    
                    <div className={style.coincidir}>
                        {coincidir ? <FaCheck className={style.check} /> : <IoClose className={style.close} />}
                        <p>As senhas devem coincidir</p>
                    </div>

                    <div className={style.termos}>
                        <Field name="terms" id="terms" type="checkbox" required />
                        <p>Concordo com os <a href="/termsofuse">Termos de Uso</a></p>
                    </div>

                    <div className={style.notify}>
                        <Field name="notify" id="notify" type="checkbox" />
                        <p>Desejo receber notificações por e-mail</p>
                    </div>

                    <button type="submit" disabled={coincidir && qCaracteres && maiusculo && minusculo && numero && simbolo ? false : true }>Registrar-me</button>

                    <p className={style.login}>Já possui uma conta? <a href="/login">Faça login</a></p>
                </Form>
            </Formik>
        </section>
    );
}

export default RegisterCompany;