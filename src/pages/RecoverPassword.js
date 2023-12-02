import { Field, Form, Formik } from 'formik';
import style from './../css/RecoverPassword.module.css';

function RecoverPassword(){
    const initialValues = {
        email: '',
    }

    return(
        <div className={style.main}>
            <Formik initialValues={initialValues}>
                <Form>
                    <h2>Recupere sua senha</h2>
                    <p>Para recuperar sua senha preencha os campos abaixo</p>
                    <Field id='email' name='email' type='email' />
                    <label id='email'>CPF ou e-mail</label>
                    <button type='submit'>Enviar e-mail</button>
                </Form>
            </Formik>
        </div>
    );
}

export default RecoverPassword;