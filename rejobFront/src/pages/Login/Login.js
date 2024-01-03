import style from './../../styles/css/Login.module.css';
import { Formik, Form, Field } from 'formik';
import { FaArrowLeftLong } from "react-icons/fa6";
import ReJob from './../../images/newJob.png';
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import LoginService from './LoginService';

function Login(){
    const dispatch = useDispatch();
    const { visibilityPassword } = useSelector(rootReducer => rootReducer.useReducer)

    const initialValues: AuthRequest = {
        email: "",
        password: "",
    };
    
    const Logar = async (values: AuthRequest) => {
        try {
            const AuthResponse = await LoginService.login(
            values.email,
            values.password
            );

            console.log("Login successful:", AuthResponse);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const MostrarSenha = () => {
        dispatch({
            type: 'ChangeVisibilityPassword',
        })
    }

    return(
        <section className={style.login}>
            <a href='/' className={style.back} >
                <FaArrowLeftLong className={style.back} />
            </a>

            <Formik initialValues={initialValues} onSubmit={Logar}>
                <Form>
                    <img src={ReJob} alt='ReJob' />
                    <p className={style.rejob}>Re<span>Job</span></p>
                    <p>Faça login e comece a usar!</p>

                    <div className={style.inputBox}>
                        <label>Endereço de e-mail</label>
                        <Field name="email" id="email" type="email" placeholder="Digite seu e-mail" required />
                        <AiOutlineMail />
                    </div>

                    <div className={style.inputBox}>
                        <label>Sua senha</label>
                        <Field name="password" id="password" type={visibilityPassword ? "text" : "password"} placeholder="Digite sua senha" required />
                        <AiOutlineLock />
                        {visibilityPassword ? <FaEyeSlash onClick={MostrarSenha} className={style.eye} /> : <FaRegEye onClick={MostrarSenha} className={style.eye} />}
                    </div>

                    <div className={style.lembrarMe}>
                        <Field type="checkbox" name="lembrar" />
                        <p>Lembrar-me por 30 dias</p>
                    </div>

                    <button type="submit" className={style.acessar}>Acessar a plataforma</button>

                    <a href='/recover' className={style.esqueceu}>Esqueceu sua senha?</a>
                    <a href='/register' className={style.crie}>Não possui conta? Crie uma agora!</a>
                </Form>
            </Formik>
        </section>
    );
}

export default Login;