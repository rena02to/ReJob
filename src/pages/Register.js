import { Formik, Form, Field, ErrorMessage } from "formik";
import style from './../css/Register.module.css';
import { validate } from 'gerador-validador-cpf';
import * as Yup from 'yup';

function Register(){

    const isValidCPF = () => {
        const valor = document.getElementById('cpf').value;
        const cpf = valor.replace(/\D/g, '');
        const isValidCPF = validate(cpf);
        if(isValidCPF){
            return true;
        }else{
            return false;
        }
    }

    //validação dos dados do formulário
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(5, 'O nome deve ter no mínimo 5 letras!').matches(/^[a-zA-Z]+$/, 'Somente letras são permitidas!'),
        cpf: Yup.string().transform((originalValue) => originalValue.replace(/\D/g, '')).min(11, 'O CPF deve ter 11 dígitos!').test('is-valid-CPF', 'Digite uma CPF válido!', isValidCPF),
        email: Yup.string().email('Insira um e-mail válido!'),
        nasc: Yup.string().min(10, 'Digite uma data válida!').test('is-valid-date', 'A idade mínima permitida no sistema é 18 anos!', function(value){value = value.split('/'); value = value.reverse().join('-'); const dataAtual = new Date(); const inputDate = new Date(value); const idadeMilissegundos = dataAtual - inputDate; const idade = Math.floor(idadeMilissegundos / (365.25 * 24 * 60 * 60 * 1000)); return idade >= 18;}),
        email: Yup.string().min(15, 'Digite um número de telefone válido!'),
    })

    const initialValues = {
        nome: '',
        cpf: '',
        email: '',
        nasc: '',
        tel: '',
        selectedOption: '',
    }

    const typeUser = [
        {key: 1, value:'usuario', text: 'Busco vagas de emprego'},
        {key: 2, value:'cursos', text: 'Quero fornecer cursos'},
        {key: 3, value:'empresa', text: 'Busco funcionários'},
    ];

    const Cadatrar = () => {
        alert('Aqui vai o cadastro no sistema.');
    }

    const FormataCPF = () => {
        const cpf = document.getElementById('cpf');
        let valor = cpf.value.replace(/\D/g, '');
        let valorFormatado = '';
        for (let i = 0; i < valor.length; i++) {
            if (i > 0 && i % 3 === 0 && i !== 9) {
                valorFormatado += '.';
            }else if(i === 9){
                valorFormatado += '-';
            }
            valorFormatado += valor.charAt(i);
        }
        cpf.value = valorFormatado;
    }

    const FormataDate = () => {
        const nasc = document.getElementById('nasc');
        let valor = nasc.value.replace(/\D/g, '');
        let valorFormatado = '';
        for (let i = 0; i < valor.length; i++) {
            if(i === 2){
                valorFormatado += '/';
            }else if(i === 4){
                valorFormatado += '/';
            }

            valorFormatado += valor.charAt(i);
        }
        nasc.value = valorFormatado;
    }

    const FormataTel = () => {
        const tel = document.getElementById('tel');
        let valor = tel.value.replace(/\D/g, '');
        let valorFormatado = '';
        for (let i = 0; i < valor.length; i++) {
            if(i === 0){
                valorFormatado += '(';
            }else if(i === 2){
                valorFormatado += ') ';
            }else if(i === 7){
                valorFormatado += '-';
            }


            valorFormatado += valor.charAt(i);
        }
        tel.value = valorFormatado;
    }

    return(
        <div className={style.main}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={Cadatrar}>
                <Form>
                    <h2>Cadastre-se</h2>
                    <p>Vamos às informações básicas...</p>

                    <div className={style.inputBox}>
                        <Field type="text" id="nome" name="name" required/>
                        <label id="nome">Nome</label>
                        <span />
                    </div>
                    <ErrorMessage name='name' component='div' className={style.error}/>

                    <div className={style.inputBox}>
                        <Field type="text" id="cpf" name="cpf" required onInput={FormataCPF} maxLength={14}/>
                        <label id="cpf">CPF</label>
                        <span />
                    </div>
                    <ErrorMessage name='cpf' component='div' className={style.error}/>

                    <div className={style.inputBox}>
                        <Field type="text" id="email" name="email" required/>
                        <label id="email">E-mail</label>
                        <span />
                    </div>
                    <ErrorMessage name='email' component='div' className={style.error}/>

                    <div className={style.inputBox}>
                        <Field type="text" id="nasc" name="nasc" className={style.nasc} onInput={FormataDate} maxLength={10} required/>
                        <label id="nasc">Data de nascimento</label>
                        <span />
                    </div>
                    <ErrorMessage name='nasc' component='div' className={style.error}/>

                    <div className={style.inputBox}>
                        <Field type="text" id="tel" name="tel" onInput={FormataTel} maxLength={15} required/>
                        <label id="tel">Telefone</label>
                        <span />
                    </div>
                    <ErrorMessage name='tel' component='div' className={style.error}/>

                    <div className={style.optionsUser}>
                        <label id="typeUser" className={style.legend}>Que tipo de usuário você é?</label>
                        <div className={style.optionsUserRadios}>
                            {typeUser.map((option) => (
                                <div className={style.option}>
                                    <Field type='radio' value={option.value} id='selectedOption' name="selectedOption" required></Field>
                                    <label id={option.value}>{option.text}</label>
                                </ div>
                            ))}
                        </div>
                    </div>

                    <button type="submit">Próximo</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Register;