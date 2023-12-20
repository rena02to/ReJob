import style from './../styles/css/Footer.module.css';
import Icon from './../images/newJob.png';
import { TbArrowBadgeRightFilled } from "react-icons/tb";

function Footer(){
    return(
        <footer className={style.footer}>
            <div className={style.main}>
                <div className={style.rejob}>
                    <img src={Icon} alt="Icone" width={67} height={67} />
                    <p>Re<span>Job</span></p>
                </div>
                <div className={style.infos}>
                    <p className={style.endereco}>Endereço</p>
                    <p className={style.textEndereco}>Av. Lourival Melo Mota, S/N, Tabuleiro do<br /> Martins, Maceió - AL, Cep: 57072-970</p>
                    <p className={style.contato}>Contato</p>
                    <p className={style.email}>mailrejob@gmail.com</p>
                </div>
                <div className={style.links}>
                    <a href='##' onClick={(event) => {event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth'})}}><TbArrowBadgeRightFilled />Início</a>
                    <a href='/vagas'><TbArrowBadgeRightFilled />Vagas</a>
                    <a href='/sobrenos'><TbArrowBadgeRightFilled />Sobre a empresa</a>
                </div>
            </div>
            <p className={style.university}>Universidade Federal de Alagoas © - 2024</p>
        </footer>
    );
}

export default Footer;