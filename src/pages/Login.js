import { Formik, Form, Field } from 'formik';
import { FaEyeLowVision, FaEye } from "react-icons/fa6";
import style from './../css/Login.module.css';
import { useState } from 'react';

function Login(){
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const initialValues = {
        cpf: '',
        senha: '',
    }

    const MostrarOcultar = () => {
        const senha = document.getElementById('senha');
        senha.type = senha.type === 'password' ? 'text' : 'password';
        setMostrarSenha(!mostrarSenha);
    }

    const Logar = () => {
        alert('Nesse ponto o usuário deve fazer o login');
    }

    return(
        <div className={style.main}>
            <Formik initialValues={initialValues} onSubmit={Logar}>
                {() => (
                    <Form>
                        <h2>Bem vindo!</h2>
                        <p>Entre com sua conta para acessar nossa plataforma</p>

                        <span className={style.inputBox}>
                            <Field name="cpf" id="cpf" type="text" required />
                            <label id="cpf">CPF ou e-mail</label>
                            <span />
                        </span>

                        <span className={style.inputBox}>
                            <Field name="senha" id="senha" type="password" required/>
                            <button type='button' onClick={MostrarOcultar}>
                                {mostrarSenha ? <FaEyeLowVision /> : <FaEye />}
                            </button>
                            <label id="senha">Senha</label>
                            <span />
                        </span>

                        <div className={style.links}>
                            <a href="/recover" className={style.recuperar}>Recuperar senha</a>
                            <a href="#" className={style.registro}>Registrar-se</a>
                        </div>

                        <button type='submit' className={style.submit}>Entrar</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;