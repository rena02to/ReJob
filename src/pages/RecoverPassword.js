import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { TiArrowBack } from "react-icons/ti";
import style from './../css/RecoverPassword.module.css';

function RecoverPassword(){
    const dispatch = useDispatch();
    const { isValidData } = useSelector(rootReducer => rootReducer.useReducer);

    const initialValues = {
        email: '',
        codigo: '',
    }

    const EnviarEmail = () => {
        alert('Aqui deve ocorrer a verificação se os dados existem no sistema, e se existirem, envia o código de verificação');
        dispatch({
            type: 'ChangeValidData',
            payload: true,
        })
    }

    const Recuperar = () => {
        alert('Aqui deve ocorrer a verificação do código enviado por e-mail');
        window.location.href = '/login';
    }

    const Voltar = (formikProps ) => {
        formikProps.setFieldValue('codigo', '');
        dispatch({
            type: 'ChangeValidData',
            payload: false,
        })
    }

    return(
        <div className={style.main}>
                    {!isValidData ?
                        <Formik initialValues={initialValues} onSubmit={EnviarEmail}>
                            <Form>
                                <h2>Recupere sua senha</h2>
                                <p>Para recuperar sua senha preencha os campos abaixo</p>
                                <div className={style.inputBox}>
                                    <Field id='email' name='email' type='text' required/>
                                    <label id='email'>CPF ou e-mail</label>
                                    <span />
                                </div>

                                <button type='submit' className={style.submit}>Enviar e-mail</button>

                                <a href="/login" className={style.voltarLink}>
                                    <TiArrowBack />
                                    Voltar
                                </a>
                            </Form>
                        </Formik>
                        :
                        <Formik initialValues={initialValues} onSubmit={Recuperar}>
                            {(formikProps) => (<Form>
                            <h2>Recupere sua senha</h2>
                                <p>Para recuperar sua senha preencha os campos abaixo</p>
                                <div className={style.inputBox}>
                                    <Field id='codigo' name='codigo' type='number' className={style.codigo} onInput={(e) => {if(e.target.value.length > 6){e.target.value = e.target.value.slice(0, 6);}}} required/>
                                    <label id='codigo'>Código enviado por e-mail</label>
                                    <span />
                                </div>

                                <button type='submit' className={style.submit}>Verificar</button>

                                <button type='button' onClick={()=>Voltar(formikProps)} className={style.voltarButton}>
                                    <TiArrowBack />
                                    Voltar
                                </button>
                            </Form>)}
                        </Formik>
                    }
        </div>
    );
}

export default RecoverPassword;