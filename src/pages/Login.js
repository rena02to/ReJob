import { Formik, Form, Field } from 'formik';
import style from './../css/login.module.css';

function Login(){
    const initialValues = {
        cpf: '',
        senha: '',
    }

    return(
        <div className={style.main}>
            <Formik initialValues={initialValues}>
                {({}) => (
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
                            <label id="senha">Senha</label>
                            <span />
                        </span>

                        <div className={style.links}>
                            <a href="#" className={style.recuperar}>Recuperar senha</a>
                            <a href="#" className={style.registro}>Registrar-se</a>
                        </div>

                        <button type='submit'>Entrar</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;