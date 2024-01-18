import style from './../../styles/css/RegisterRemand.module.css';
import { Formik, Form, Field } from 'formik';
import { useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { FaClipboardUser, FaRegCalendar, FaCheck, FaUserGraduate, FaPersonChalkboard } from 'react-icons/fa6';
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi2";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { IoClose, IoBarcodeSharp } from "react-icons/io5";
import { GiModernCity, GiBrain } from "react-icons/gi";
import { TbBuildingEstate, TbMap2 } from "react-icons/tb";
import { RiDoorLockLine } from "react-icons/ri";

function RegisterRemand(){
    const dispatch = useDispatch();
    const { visibilityPassword, visibilityRepeatPassword, coincidir, qCaracteres, maiusculo, minusculo, numero, simbolo, states, cityes, estado, cidade, statesAndCityes } = useSelector(rootReducer => rootReducer.useReducer)

    const initialValues = {
        name: '',
        email: '',
        cpf: '',
        nasc: '',
        endereco: '',
        password: '',
        RepeatPassword: '',
        codCadeia: '',
        admin: false,
        artedesign: false,
        cbt: false,
        ti: false,
        csh: false,
        ci: false,
        ep: false,
        sb: false,
        sg: false,
        outrasAreas: '',
        histEducacional: '',
        nameHability: '',
    }

    const regimes = [
        {value: "Fechado", label: "Fechado"},
        {value: "Semiaberto", label: "Semiaberto"},
        {value: "Aberto", label: "Aberto"},
    ]

    const escolaridade = [
        {value: "Analfabeto", label: "Analfabeto"},
        {value: "Fundamental completo", label: "Fundamental completo"},
        {value: "Fundamental incompleto", label: "Fundamental incompleto"},
        {value: "Médio completo", label: "Médio completo"},
        {value: "Médio incompleto", label: "Médio incompleto"},
        {value: "Superior completo", label: "Superior completo"},
        {value: "Superior incompleto", label: "Superior incompleto"},
    ]

    const AreasInteresse = [
        {key: 1, value: "Administração, negócios e serviços", name: "admin"},
        {key: 2, value: "Artes e Design", name: "artedesign"},
        {key: 3, value: "Ciências Biológicas e da Terra", name: "cbt"},
        {key: 4, value: "Tecnologia da Informação (TI)", name: "ti"},
        {key: 5, value: "Ciências Sociais e Humanas", name: "csh"},
        {key: 6, value: "Comunicação e Informação", name: "ci"},
        {key: 7, value: "Engenharia e Produção", name: "ep"},
        {key: 8, value: "Saúde e Bem-estar", name: "sb"},
        {key: 9, value: "Serviços Gerais", name: "sg"},
    ]

    /*const levels = [
        {value: "Noções básicas", label: "Noções básicas"},
        {value: "Iniciante", label: "Iniciante"},
        {value: "Intermediário", label: "Intermediário"},
        {value: "Avançado", label: "Avançado"},
        {value: "Especialista", label: "Especialista"}
    ]*/

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
        let valor = nasc.value.replace(/\D/g, '');
        let valorFormatado = '';

        for(let i = 0; i < valor.length; i++){
            if(i === 2 || i === 4){
                valorFormatado += '/';
            }
            valorFormatado += valor.charAt(i);
        }

        nasc.value = valorFormatado;
    }

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

    const alteraEstado = (opcao) => {
        dispatch({type: "setCidade", payload: null});
        dispatch({type: 'setEstado', payload: opcao.value})
        let cidades = statesAndCityes.find(estado => estado.nome === opcao.value);
        cidades = cidades.cidades;
        let opcoes = [];
        //eslint-disable-next-line
        cidades.map((cidade) => {
            opcoes.push({value: cidade, label: cidade});
        })
        dispatch({type: "setCityes", payload: opcoes});
    }

    return(
        <section className={style.background}>
            <p className={style.title}>CADASTRO</p>
            <p className={style.subtitle}>Cadastre as informações referentes ao Ressocializado</p>
            <div className={style.foto}>
                <FaUserAlt />
            </div>
            <Formik initialValues={initialValues} clasName={style.formRemand}>
                {(formikProps) => (<Form>
                    <div className={style.inputBox}>
                        <label htmlFor="name">Nome Completo</label>
                        <div className={style.input}>
                            <Field name="name" id="name" type="text" placeholder="Digite o nome completo" required />
                            <FaClipboardUser />
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="email">Endereço de e-mail</label>
                        <div className={style.input}>
                            <Field name="email" id="email" type="email" placeholder="Digite o endereço de e-mail" required />
                            <AiOutlineMail/>
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="cpf">CPF</label>
                        <div className={style.input}>
                            <Field name="cpf" id="cpf" type="text" placeholder="Digite o CPF" maxLength={14} minLength={14} onChange={formataCPF} required />
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

                    <div className={style.acoplamento}>
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
                    </div>

                    <div className={style.acoplamento}>
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
                    </div>

                    <div className={style.selectBox}>
                        <label htmlFor="local">Local de residência</label>
                        <div className={style.input}>
                            <Select styles={{ control: (provided) => ({ ...provided, paddingLeft: '30px' }) }} options={states} className={style.select} name="estado" id="estado" onChange={alteraEstado} placeholder="Estado" required/>
                            <GiModernCity className={style.icon} />
                        </div>

                        <div className={style.inputCidade}>
                            <Select styles={{ control: (provided) => ({ ...provided, paddingLeft: '30px' }) }} options={cityes} className={style.select} name="cidade" id="cidade" placeholder="Cidade" value={cidade} onChange={(opcao) => {dispatch({type: "setCidade", payload: opcao});}} isDisabled={estado !== null ? false : true} required/>
                            <TbBuildingEstate className={style.icon} />
                        </div>

                        <div className={style.inputTextArea}>
                            <Field name="endereco" id="endereco" as="textarea" placeholder="Linha de endereço" required />
                            <TbMap2 />
                        </div>
                    </div>

                    <div className={style.checkBoxes}>
                        <label htmlFor="AreasInteresse">Áreas de interesse / ocupação</label>
                        <div className={style.boxCheckBox}>
                            {AreasInteresse.map((area) => (
                                <div className={style.checkBoxArea} key={area.key}>
                                    <Field type="checkbox" name={area.name}/>
                                    <p>{area.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className={style.inputbox}>
                            <Field type="text" name="outrasAreas" placeholder="Outra(s)"/>
                            <GiBrain />
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="codCadeia">Código da cadeia</label>
                        <div className={style.input}>
                            <Field name="codCadeia" id="codCadeia" type="number" placeholder="Digite o código da cadeia" required />
                            <IoBarcodeSharp />
                        </div>
                    </div>

                    <div className={style.selectBox}>
                        <label htmlFor="typeRegime">Regime de cumprimento da pena</label>
                        <div className={style.input}>
                            <Select styles={{ control: (provided) => ({ ...provided, paddingLeft: '30px' }) }} options={regimes} className={style.select} placeholder="Selecione uma opção" required/>
                            <RiDoorLockLine className={style.icon}/>
                        </div>
                    </div>

                    <div className={style.selectBox}>
                        <label htmlFor="escolaridade">Nível de escolaridade</label>
                        <div className={style.input}>
                            <Select styles={{ control: (provided) => ({ ...provided, paddingLeft: '30px' }) }} options={escolaridade} className={style.select} placeholder="Selecione uma opção" required/>
                            <FaUserGraduate className={style.icon}/>
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="histEducacional">Descrição institucional</label>
                        <div className={style.inputTextArea}>
                            <Field name="histEducacional" id="histEducacional" as="textarea" className={style.histEducacional} placeholder="Dê uma breve descrição do histórico educacional" required />
                            <FaPersonChalkboard />
                        </div>
                    </div>

                    {/*<div className={style.inputBox}>
                        <label>Habilidades e qualificações</label>
                        <div className={style.habilidades}>
                            {habilidades.map((habilidade, index) => (
                                <div className={style.geral} key={index}>
                                    <div className={style.individual}>
                                        <p className={style.name}>{habilidade.name}</p>
                                        <p className={style.level}>{habilidade.level}</p>
                                    </div>
                                    <div className={style.buttons}>
                                        <button type='button' title='Editar habilidade' onClick={() => {editHability(index)}}>
                                            <FaPencil/>
                                        </button>
                                        <button type='button' title='Deletar habilidade'>
                                            <FaRegTrashCan/>
                                        </button>
                                    </div>
                                </div>
                            )) }
                            {modalOpen ? 
                                <div className={style.addHabilidade}>
                                    <div className={style.individualInput}>
                                        <Field className={style.name} name="nameHability" id="nameHability" type="text" placeholder="Nome" />
                                        <Select options={levels} className={style.levelSelect} name="levelHability" id="levelHability" placeholder="Nível" value={levelHability} onChange={(opcao) => {dispatch({type: "setLevelHability", payload: opcao});}}/>
                                    </div>
                                    <div className={style.buttons}>
                                        <button type='button' title='Inserir habilidade'>
                                            <FaCheck className={style.confirm} onClick={() => {setHabilidade(formikProps)}} />
                                        </button>
                                        <button type='button' title='Cancelar' onClick={() => {openModal(formikProps)}}>
                                            <IoClose className={style.cancel} />
                                        </button>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                        <button type='button' className={style.add} onClick={() => {dispatch({type: "openModal"})}}>Adicionar</button>
                    </div>*/}
                </Form>)}
            </Formik>
        </section>
    )
}

export default RegisterRemand;