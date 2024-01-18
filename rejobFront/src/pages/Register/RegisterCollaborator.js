import ReJob from './../../images/newJob.png';
import { Formik, Form, Field } from 'formik';
import style from './../../styles/css/RegisterCollaborator.module.css';
import { FaClipboardUser, FaRegIdBadge, FaArrowLeftLong, FaCheck, FaBuildingUser, FaRegBuilding, FaRegCalendar } from "react-icons/fa6";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { HiIdentification } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

function RegisterCollaboratory(){
    const dispatch = useDispatch();
    const { visibilityPassword, visibilityRepeatPassword, coincidir, qCaracteres, maiusculo, minusculo, numero, simbolo } = useSelector(rootReducer => rootReducer.useReducer)

    const initialValues = {
        name: '',
        cpf: '',
        nasc: '',
        typeCompany: '',
        companyName: '',
        office: '',
        email: '',
        tel: '',
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

    const formataCPF = () => {
        const cpf = document.getElementById('cpf');
        let valor = cpf.value.replace(/\D/g, '');
        let valorFormatado = '';

        for(let i = 0; i < valor.length; i++){
            if(i === 3 || i === 6){
                valorFormatado += '.';
            }else if(i === 9){
                valorFormatado += '-';
            }
            valorFormatado += valor.charAt(i);
        }

        cpf.value = valorFormatado;
    }

    const formataData = () => {
        const nasc = document.getElementById('nasc');
        let valor = nasc.value.replace(/rt\D/g, '');
        let valorFormatado = '';

        for(let i = 0; i < valor.length; i++){
            if(i === 2 || i === 4){
                valorFormatado += '/';
            }
            valorFormatado += valor.charAt(i);
        }

        nasc.value = valorFormatado;
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

            <Formik initialValues={initialValues} onSubmit={CadastrarSe}>
                <Form>
                    <img src={ReJob} alt='ReJob' />
                    <p className={style.rejob}>Re<span>Job</span></p>
                    <p>Registre-se como colaborador!</p>

                    <div className={style.inputBox}>
                        <label htmlFor="name">Nome Completo</label>
                        <div className={style.input}>
                            <Field name="name" id="name" type="text" placeholder="Digite seu nome completo" required />
                            <FaClipboardUser />
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="cpf">CPF</label>
                        <div className={style.input}>
                            <Field name="cpf" id="cpf" type="text" placeholder="Seu CPF" maxLength={14} minLength={14} onChange={formataCPF} required />
                            <HiIdentification/>
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="nasc">Data de nascimento</label>
                        <div className={style.input}>
                            <Field name="nasc" id="nasc" type="text" placeholder="Data de nascimento" maxLength={10} minLength={10} onChange={formataData} required />
                            <FaRegCalendar/>
                        </div>
                    </div>

                    <div className={style.selectBox}>
                        <label htmlFor="typeCompany">Colaborador vinculado a uma...</label>
                        <div className={style.input}>
                            <Select styles={{ control: (provided) => ({ ...provided, paddingLeft: '30px' }) }} options={options} className={style.select} placeholder="Selecione uma opção" required/>
                            <FaBuildingUser className={style.icon}/>
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="companyName">Empresa</label>
                        <div className={style.input}>
                            <Field name="companyName" id="companyName" type="text" placeholder="Você é colaborador de qual empresa?" required />
                            <FaRegBuilding />
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="office">Cargo ou Função</label>
                        <div className={style.input}>
                            <Field name="office" id="office" type="text" placeholder="Seu cargo ou fução na empresa?" required />
                            <FaRegIdBadge />
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="contato">Contatos da pessoais</label>
                        <div className={style.input} name="contato">
                            <Field name="email" id="email" type="email" placeholder="Digite seu e-mail" required />
                            <AiOutlineMail/>
                        </div>
                        <div className={style.inputTel} name="contato">
                            <Field name="tel" id="tel" type="text" placeholder="Seu número de telefone" maxLength={14} minLength={14} onChange={formataTel} required />
                            <BsFillTelephoneFill/>
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

export default RegisterCollaboratory;