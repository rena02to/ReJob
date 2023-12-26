import Footer from './../../components/Footer';
import NavBar from './../../components/NavBar';
import BackgroundImage from './../../images/backgroundImageRegister.jpg';
import style from './../../styles/css/Register.module.css';

function Register(){
    return(
        <>
            <NavBar />
            <section className={style.register}>
                <img src={BackgroundImage} alt='Imagem de fundo da página de registro'/>
                <div className={style.conteudo}>
                    <p>Bem vindo!<br />Cadastre-se como <span>colaborador</span>, <span>empresa</span><br />ou <span>ex-recluso</span></p>
                    <div className={style.buttons}>
                        <a href='/register/collaborator/'>
                            <button>Sou colaborador</button>
                        </a>
                        <a href='/register/company/'>
                            <button>Sou empresa</button>
                        </a>
                        <a href='/register/remand/'>
                            <button>Sou ex-recluso</button>
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Register;