import Footer from '../../components/Footer';
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
                    <p>Bem vindo!<br />Cadastre-se como <span>colaborador</span><br />ou <span>empresa</span></p>
                    <div className={style.buttons}>
                        <a href='/cadastro/colaborador/'>
                            <button>Sou colaborador</button>
                        </a>
                        <a href='/cadastro/empresa/'>
                            <button>Sou empresa</button>
                        </a>
                        <a href='/cadastro/egresso/'>
                            <button>Sou egresso</button>
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Register;