import ReJob from './../../images/newJob.png';
import style from './../../styles/css/RegisterMain.module.css';
import { FaArrowLeftLong, FaCheck } from "react-icons/fa6";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SelectCustom from '../../components/SelectCustom/SelectCustom';
import InputCustom from '../../components/InputCustom/InputCustom';

function RegisterCompany(){
    const dispatch = useDispatch();
    const { visibilityPassword, visibilityRepeatPassword, coincidir, qCaracteres, maiusculo, minusculo, numero, simbolo, statesAndCityes, states, cityes } = useSelector(rootReducer => rootReducer.useReducer)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = require('../NewVacancy/states.json');
                let options2 = [];
                data.estados.map((estado) => (
                    options2.push({value: estado.nome, label: estado.nome})
                ));
                dispatch({type: "setStates", payload: options2});
                dispatch({type: 'setStatesAndCityes', payload: data.estados});
            } catch (error) {
                console.error('Erro ao carregar Estados:', error);
            }
        };
    
        fetchData();
    }, [dispatch]);


    const [initialValues, setInitialValues] = useState ({
        typeCompany: '',
        nameCompany: '',
        cnpj: '',
        branch: '',
        qFunc: '',
        estado: '',
        cidade: '',
        adress: '',
        email: '',
        tel: '',
        desc: '',
        password: '',
        RepeatPassword: '',
        terms: false,
        notify: false
    });

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        if(name === "cnpj"){
            let valor = value.replace(/\D/g, '').slice(0, 14);
            let valorFormatado = '';

            for(let i = 0; i < valor.length; i++){
                if(i === 2 || i === 5){
                    valorFormatado += '.';
                }else if(i === 8){
                    valorFormatado += '/';
                }else if(i === 12){
                    valorFormatado += '-';
                }
                valorFormatado += valor.charAt(i);
            }
            setInitialValues({...initialValues, [name]: valorFormatado})
        }else if(name === "estado"){
            dispatch({type: "setCidade", payload: null});
            let cidades = statesAndCityes.find(estado => estado.nome === value);
            cidades = cidades.cidades;
            let opcoes = [];
            //eslint-disable-next-line
            cidades.map((cidade) => {

                opcoes.push({value: cidade, label: cidade})
            })
            dispatch({type: "setCityes", payload: opcoes});
            setInitialValues({...initialValues, [name]: value})
        }else if(name === "tel"){
            let valor = value.replace(/\D/g, '').slice(0, 11);
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
            setInitialValues({...initialValues, [name]: valorFormatado})
        }else{
            setInitialValues({...initialValues, [name]: value})
        }
    }

    const CadastrarSe = () => {
        alert("Cadastrar usuário no db");
    }

    return(
        <section className={style.background}>
            <a href='/registro' className={style.back} >
                <FaArrowLeftLong />
                <p>Voltar</p>
            </a>

            <form>
                <img src={ReJob} alt='ReJob' />
                <p className={style.rejob}>Re<span>Job</span></p>
                <p>Registre-se como empresa/organização!</p>

                <SelectCustom
                    label="Categoria"
                    id="typeCompany"
                    name="typeCompany"
                    value={initialValues.typeCompany}
                    onChange={handleInputChange}
                    options={options}
                />

                <InputCustom
                    label="Razão social da empresa"
                    placeholder="Digite a razão social da empresa"
                    type="text"
                    id="nameCompany"
                    name="nameCompany"
                    value={initialValues.nameCompany}
                    onChange={handleInputChange}
                />

                <InputCustom
                    label="CNPJ"
                    placeholder="Digite o CNPJ da empresa"
                    type="text"
                    id="cnpj"
                    name="cnpj"
                    value={initialValues.cnpj}
                    onChange={handleInputChange}
                />

                <InputCustom
                    label="Ramo de atividade"
                    placeholder="Digite o ramo de atividade da empresa"
                    type="text"
                    id="branch"
                    name="branch"
                    value={initialValues.branch}
                    onChange={handleInputChange}
                />

                <InputCustom
                    label="Quantidade de funcionários"
                    placeholder="Digite a quantidade de funcionários"
                    type="number"
                    id="qFunc"
                    name="qFunc"
                    value={initialValues.qFunc}
                    onChange={handleInputChange}
                />

                <SelectCustom
                    label="Estado da empresa"
                    id="estado"
                    name="estado"
                    value={initialValues.estado}
                    onChange={handleInputChange}
                    options={states}
                />

                <SelectCustom
                    label="Cidade da empresa"
                    id="cidade"
                    name="cidade"
                    value={initialValues.cidade}
                    onChange={handleInputChange}
                    options={cityes}
                />

                <InputCustom
                    label="Linha digitável do endereço"
                    placeholder="Digite a linha digitável do endereço"
                    type="text"
                    id="adress"
                    name="adress"
                    value={initialValues.adress}
                    onChange={handleInputChange}
                />

                <InputCustom
                    label="E-mail da empresa"
                    placeholder="Digite o e-mail da empresa"
                    type="email"
                    id="email"
                    name="email"
                    value={initialValues.email}
                    onChange={handleInputChange}
                />

                <InputCustom
                    label="Número da empresa da empresa"
                    placeholder="Digite o número de telefone da empresa"
                    type="text"
                    id="tel"
                    name="tel"
                    value={initialValues.tel}
                    onChange={handleInputChange}
                />

                <div className={style.textArea}>
                    <label className={style.labelTextArea}>Descrição institucional<span>*</span></label>
                    <textarea
                        placeholder='Digite uma descrição institucional'
                        id="desc"
                        name="desc"
                        value={initialValues.desc}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={style.password}>
                    <InputCustom
                        label="Senha"
                        placeholder="Digite uma senha"
                        type={visibilityPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={initialValues.password}
                        onChange={handleInputChange}
                    />
                    <button type='button' className={style.eyeButton} onClick={() => {dispatch({type: "ChangeVisibilityPassword"})}}>
                        {visibilityPassword ? <FaRegEye className={style.eye} /> : <FaEyeSlash className={style.eye} />}
                    </button>
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

                <div className={style.password}>
                    <InputCustom
                        label="Repita sua senha"
                        placeholder="Repita sua senha"
                        type={visibilityRepeatPassword ? "text" : "password"}
                        id="RepeatPassword"
                        name="RepeatPassword"
                        value={initialValues.RepeatPassword}
                        onChange={handleInputChange}
                    />
                    <button type='button' className={style.eyeButton} onClick={() => {dispatch({type: "ChangeVisibilityRepeatPassword"})}}>
                        {visibilityRepeatPassword ? <FaRegEye className={style.eye} /> : <FaEyeSlash className={style.eye} />}
                    </button>
                </div>

                <div className={style.coincidir}>
                    {coincidir ? <FaCheck className={style.check} /> : <IoClose className={style.close} />}
                    <p>As senhas devem coincidir</p>
                </div>

                <div className={style.termos}>
                    <input name="terms" id="terms" type="checkbox" onChange={handleInputChange} required />
                    <p>Concordo com os <a href="/termos-uso">Termos de Uso</a></p>
                </div>

                <div className={style.notify}>
                    <input name="notify" id="notify" onChange={handleInputChange} type="checkbox" />
                    <p>Desejo receber notificações por e-mail</p>
                </div>

                <button type="submit" className={style.submit} disabled={coincidir && qCaracteres && maiusculo && minusculo && numero && simbolo ? false : true } onClick={CadastrarSe}>Registrar</button>

                <p className={style.login}>Já possui uma conta? <a href="/login">Faça login</a></p>
            </form>
        </section>
    );
}

export default RegisterCompany;