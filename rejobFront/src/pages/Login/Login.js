import style from './../../styles/css/Login.module.css';
import { Formik, Form, Field } from 'formik';
import { FaArrowLeftLong } from "react-icons/fa6";

function Login(){
    const initialValues : AuthRequest = {
        email: '',
        password: '',
    }

    return(
        <section className={style.login}>
            <FaArrowLeftLong />
             
        </section>
    );
}

export default Login;