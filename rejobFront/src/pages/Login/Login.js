import style from './../../styles/css/Login.module.css';
import { Formik, Form, Field } from 'formik';
import { FaArrowLeftLong } from "react-icons/fa6";
import ReJob from './../../images/newJob.png';
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import LoginService from './LoginService';
import { Navigate, useNavigate } from "react-router-dom";

function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { visibilityPassword } = useSelector(rootReducer => rootReducer.useReducer)

    const initialValues = {
        email: "",
        password: "",
    };
    
    const Logar = async (values) => {
        try {
            const AuthResponse = await LoginService.login(
            values.email,
            values.password
            );

            console.log("Login successful:", AuthResponse);
            
            navigate('/');
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return(
        <section className={style.background}>
            <a href='/' className={style.back} >
                <FaArrowLeftLong />
                <p>Voltar</p>
            </a>

            <Formik initialValues={initialValues} onSubmit={Logar}>
                <Form>
                    <img src={ReJob} alt='ReJob' />
                    <p className={style.rejob}>Re<span>Job</span></p>
                    <p>Faça login e comece a usar!</p>

                    <div className={style.inputBox}>
                        <label htmlFor="email">Endereço de e-mail</label>
                        <div className={style.input}>
                            <Field name="email" id="email" type="email" placeholder="Digite seu e-mail" required />
                            <AiOutlineMail />
                        </div>
                    </div>

                    <div className={style.inputBox}>
                        <label htmlFor="password">Sua senha</label>
                        <div className={style.input}>
                            <Field name="password" id="password" type={visibilityPassword ? "text" : "password"} placeholder="Digite sua senha" required />
                            <AiOutlineLock />
                        </div>
                        {visibilityPassword ? <FaEyeSlash className={style.eye} onClick={() => {dispatch({type: 'ChangeVisibilityPassword',})}} /> : <FaRegEye className={style.eye} onClick={() => {dispatch({type: 'ChangeVisibilityPassword',})}} />}
                    </div>

                    <div className={style.lembrarMe}>
                        <Field type="checkbox" name="lembrar" />
                        <p>Lembrar-me por 30 dias</p>
                    </div>

                    <button type="submit" className={style.acessar}>Acessar a plataforma</button>

                    <a href='/recover' className={style.esqueceu}>Esqueceu sua senha?</a>
                    <p className={style.crie}>Não possui conta? <a href='/register'>Crie uma agora!</a></p>
                </Form>
            </Formik>
        </section>
    );
}

export default Login;