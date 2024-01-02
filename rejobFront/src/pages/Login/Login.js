import style from './../../styles/css/Login.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaArrowLeftLong } from "react-icons/fa6";

function Login(){
    const initialValues : AuthRequest = {
        email: '',
        password: '',
    }

    const Logar = () => {

    }

    return(
        <section className={style.login}>
            <a href='/' >
                <FaArrowLeftLong className={style.back} />
            </a>

            <Formik initialValues={initialValues} onSubmit={Logar}>
                <Form>
                    
                </Form>
            </Formik>
        </section>
    );
}

export default Login;