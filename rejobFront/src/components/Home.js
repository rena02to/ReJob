import style from './../styles/css/Home.module.css';
import NavBar from './NavBar';
import Footer from './Footer';
import backImageHome from './../images/backImageHome.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Home(){
    const dispatch = useDispatch();
    const { vagas } = useSelector(rootrRedux => rootrRedux.useReducer);
    const ultimasVagas = vagas.slice(-6);

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:5000/vagas')
            .then((resp) => resp.json())
            .then((data) => dispatch({type: 'setVagas', payload: data}))
            .catch((err) => console.log(err));
        }

        fetchData();
    }, [])

    return(
        <>
            <NavBar />
            <section className={style.vagas}>
                <div className={style.containerMain}>
                    <div className={style.perfilHome}>
                        <img alt='Imagem de fundo da página de vagas' src={backImageHome} />
                        <div className={style.conteudo}>
                            <p className={style.title}>OPORTUNIDADES DE <br />TRABALHO COM FOCO EM<br /><span>REINTEGRAÇÃO SOCIAL</span></p>
                            <p className={style.cadastre}>Cadastre-se e comece a construir um novo futuro!</p>
                            <div className={style.buttons}>
                                <button className={style.colaborador}>Sou colaborador</button>
                                <button>Sou empresa</button>
                            </div>
                            <i><p className={style.legenda}>Tenha acesso a diversas oportunidades de emprego.<br />Encontre a vaga perfeita para de acordo com o perfil do usuário.</p></i>
                        </div>
                    </div>
                    <div className={style.ultimasVagas}>
                        <h2>Nossas últimas vagas</h2>
                        <div className={style.cards}>
                            {ultimasVagas.map((vaga) => (
                                <div className={style.cardVaga}>
                                    
                                </div>
                            ))}
                        </div>
                        <button>Mais vagas</button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Home;