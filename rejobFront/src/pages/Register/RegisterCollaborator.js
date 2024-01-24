import ReJob from './../../images/newJob.png';
import style from './../../styles/css/RegisterMain.module.css';
import { FaArrowLeftLong, FaCheck } from "react-icons/fa6";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import InputCustom from '../../components/InputCustom/InputCustom';
import SelectCustom from '../../components/SelectCustom/SelectCustom';

function RegisterCollaboratory(){
    const dispatch = useDispatch();
    const { visibilityPassword, visibilityRepeatPassword, coincidir, qCaracteres, maiusculo, minusculo, numero, simbolo } = useSelector(rootReducer => rootReducer.useReducer)

    const [initialValues, setInitialValues] = useState({
        name: '',
        cpf: '',
        nasc: '',
        typeCompany: '',
        companyName: '',
        office: '',
        email: '',
        tel: '',
        passsword: '',
        RepeatPassword: '',
        terms: false,
        notify: false,
    });

    const options = [
        {value: "Empresa", label: "Empresa"},
        {value: "ONG", label: "ONG"},
    ]

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        if(name === "name"){
            setInitialValues({...initialValues, [name]: value})
        }else if(name === "cpf"){
            //formata o cpf para o formato correto (xxx.xxx.xxx-xx)
            let valor = value.replace(/\D/g, '').slice(0, 11);
            let valorFormatado = '';

            for(let i = 0; i < valor.length; i++){
                if(i === 3 || i === 6){
                    valorFormatado += '.';
                }else if(i === 9){
                    valorFormatado += '-';
                }
                valorFormatado += valor.charAt(i);
            }
            setInitialValues({...initialValues, [name]: valorFormatado})
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
        }else if(name === "passsword" || name === "RepeatPassword"){
            setInitialValues({...initialValues, [name]: value})
            if(name === "passsword"){
                const TemMaisDeOito = value.length >= 8;
                const TemNumeros = /\d/.test(value);
                const TemMaiusculos = /[A-Z]/.test(value);
                const TemMinusculos = /[a-z]/.test(value);
                const TemSimbolos = /[!@#$%^&*(),.?":{}|<>]/.test(value);

                dispatch({type: 'TesteQuantCaracteres', payload: TemMaisDeOito})
                dispatch({type: 'setNumeros', payload: TemNumeros})
                dispatch({type: 'setMaiusculo', payload: TemMaiusculos})
                dispatch({type: 'setMinusculo', payload: TemMinusculos})
                dispatch({type: 'setSimbolos', payload: TemSimbolos})
            }else{
                dispatch({type: 'TesteCoincidencia', payload: initialValues.passsword === value && initialValues.passsword !== ""});
            }
        }else{
            setInitialValues({...initialValues, [name]: value})
        }
    }

    const CadastrarSe = () => {
        //quando os checkbox estão ativados o status é "on", ao enviar pra o db trocar para true
        alert(`${initialValues.name}, ${initialValues.cpf}, ${initialValues.nasc}, ${initialValues.typeCompany}, ${initialValues.companyName}, ${initialValues.office}, ${initialValues.email}, ${initialValues.tel}, ${initialValues.passsword}, ${initialValues.RepeatPassword}, ${initialValues.terms}, ${initialValues.notify}`);
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
                <p>Registre-se como colaborador!</p>

                <InputCustom
                    label="Nome Completo"
                    placeholder="Digite o Nome Completo"
                    type="text"
                    id="name"
                    name="name"
                    value={initialValues.name}
                    onChange={handleInputChange}
                />

                <InputCustom
                    label="CPF"
                    placeholder="Digite o CPF"
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={initialValues.cpf}
                    onChange={handleInputChange}
                />

                <InputCustom
                    label="Data de nascimento"
                    placeholder="dd/mm/aaaa"
                    type="date"
                    id="nasc"
                    name="nasc"
                    value={initialValues.nasc}
                    onChange={handleInputChange}
                />

                <SelectCustom
                    label="Colaborador vinculado à uma..."
                    id="typeCompany"
                    name="typeCompany"
                    value={initialValues.typeCompany}
                    onChange={handleInputChange}
                    options={options}
                />

                <InputCustom
                    label="Empresa"
                    placeholder="Você é colaborador de qual empresa?"
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={initialValues.companyName}
                    onChange={handleInputChange}
                />

                <InputCustom
                    label="Cargo ou Função"
                    placeholder="Digite seu cargo ou fução na empresa"
                    type="text"
                    id="office"
                    name="office"
                    value={initialValues.office}
                    onChange={handleInputChange}
                />

                <InputCustom
                    label="E-mail"
                    placeholder="Digite seu e-mail pessoal"
                    type="email"
                    id="email"
                    name="email"
                    value={initialValues.email}
                    onChange={handleInputChange}
                />

                <InputCustom
                    label="Telefone"
                    placeholder="Digite seu número de telefone"
                    type="text"
                    id="tel"
                    name="tel"
                    value={initialValues.tel}
                    onChange={handleInputChange}
                />

                <div className={style.password}>
                    <InputCustom
                        label="Senha"
                        placeholder="Digite uma senha"
                        type={visibilityPassword ? "text" : "password"}
                        id="passsword"
                        name="passsword"
                        value={initialValues.passsword}
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

                <button type="submit" className={style.submit} disabled={coincidir && qCaracteres && maiusculo && minusculo && numero && simbolo ? false : true } onClick={CadastrarSe}>Registrar-me</button>

                <p className={style.login}>Já possui uma conta? <a href="/login">Faça login</a></p>
            </form>
        </section>
    );
}

export default RegisterCollaboratory;