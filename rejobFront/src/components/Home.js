import style from './../styles/css/Home.module.css';
import NavBar from './NavBar';
import Footer from './Footer';
import backImageHome from './../images/backImageHome.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FaBook, FaAddressCard } from "react-icons/fa";
import { FaBuildingUser, FaLocationDot } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import RejobSimbol from './../images/newJob.png';

function Home(){
    const dispatch = useDispatch();
    const { vagas, empresas, depoimentos, ongs } = useSelector(rootrRedux => rootrRedux.useReducer);
    const ultimasVagas = vagas.length > 6 ? vagas.slice(-6).reverse() : vagas;
    const melhoresEmpresas = empresas.length > 6 ? empresas.slice(-6) : empresas;
    const ultimosDepoimentos = depoimentos.length > 3 ? depoimentos.slice(-3) : depoimentos;
    const melhoresOngs = ongs.length > 5 ? ongs.slice(-5) : ongs;


    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:5000/vagas')
            .then((resp) => resp.json())
            .then((data) => dispatch({type: 'setVagas', payload: data}))
            .catch((err) => console.log(err));

            fetch('http://localhost:5000/empresas')
            .then((resp) => resp.json())
            .then((data) => dispatch({type: 'setEmpresas', payload: data}))
            .catch((err) => console.log(err));

            fetch('http://localhost:5000/depoimentos')
            .then((resp) => resp.json())
            .then((data) => dispatch({type: 'setDepoimentos', payload: data}))
            .catch((err) => console.log(err));

            fetch('http://localhost:5000/ongs')
            .then((resp) => resp.json())
            .then((data) => dispatch({type: 'setOngs', payload: data}))
            .catch((err) => console.log(err))
        }

        fetchData();
    }, [dispatch])

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
                                <div className={style.cardVaga} key={vaga.key}>
                                    <div className={style.imagem}>
                                        <img src={vaga.imagem} alt='Empresa'/>
                                    </div>
                                    <p className={style.titulo}>{vaga.titulo}</p>
                                    <div className={style.area}>
                                        <p><FaBook/>{vaga.area}</p>
                                    </div>
                                    <div className={style.sobre}>
                                        <div className={style.empresa}>
                                            <FaBuildingUser />
                                            <a href={vaga.linkEmpresa}>
                                                <p>{vaga.empresa}</p>
                                            </a>
                                        </div>
                                        <div className={style.local}>
                                            <FaLocationDot />
                                            <p>{vaga.local}</p>
                                        </div>
                                        <div className={style.nivel}>
                                            <ImStatsBars />
                                            <p>{vaga.nivel}</p>
                                        </div>
                                        <div className={style.tipo}>
                                            <FaAddressCard />
                                            <p>{vaga.tipo}</p>
                                        </div>
                                    </div>
                                    <div className={style.conhecimentos}>
                                        {vaga.conhecimentos.map((conhecimento) => (
                                            <p key={conhecimento.key}>{conhecimento.value}</p>
                                        ))}
                                    </div>
                                    <button className={style.inscreva}>
                                        <a href={vaga.link}>Inscreva-se</a>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button>
                            <a href='vagas'>Mais vagas</a>
                        </button>
                    </div>
                    <div className={style.beneficios}>
                        <h2 className={style.quaisbeneficios}>Quais benefícios minha empresa receberá ao recrutar trabalhadores na ReJob?</h2>
                        <p className={style.beneficiosTexto}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br /><br />Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br /><br />Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <div className={style.melhoresEmpresasContainer}>
                            <h2>Algumas empresas que já contrataram com a ReJob</h2>
                            <div className={style.melhoresEmpresas}>
                                {melhoresEmpresas.map((empresa) => (
                                    <a href={empresa.link} key={empresa.key}>
                                        <img src={empresa.imagem} alt='Imagem da empresa' />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={style.futurosReconstruidos}>
                        <div className={style.futurosTitulo}>
                            <h2>Futuros reconstruidos pela</h2>
                            <div className={style.simbolRejob}>
                                <img src={RejobSimbol} alt='ReJob' />
                                <h2>Re<span>Job</span></h2>
                            </div>
                        </div>
                        <div className={style.depoimentos}>
                            {ultimosDepoimentos.map((depoimento) => (
                                <div className={style.cardDepoimentos} key={depoimento.key}>
                                    <div className={style.imagem}>
                                        <img src={depoimento.foto} alt='Foto' />
                                    </div>
                                    <p className={style.nome}>{depoimento.nome}</p>
                                    <p className={style.depoimento}>{depoimento.depoimento}</p>
                                    <div className={style.infosContratacao}>
                                        <img src={depoimento.imgQmContratou} alt='Empresa' />
                                        <p className={style.qmContratou}>Contratado(a) por <a href={depoimento.linkEmpresa}>{depoimento.qmContratou}</a></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={style.ongs}>
                            <h2>Algumas ONG&apos;s que tem parceria com a ReJob</h2>
                            <div className={style.melhoresOngs}>
                                {melhoresOngs.map((ong) => (
                                    <a href={ong.link} key={ong.key}>
                                        <img src={ong.foto} alt='Imagem da ONG' />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className={style.sobreRejob}>
                            <h2>Sobre a Re<span>Job</span></h2>
                            <p>A <span>Re<span>Job</span></span> se trata de um software desenvolvido na disciplina de Projeto de Desenvolvimento de Software na Universidade Federal de Alagoas.<br /><br />Consiste em um sistema desenvolvido com o objetivo de promover a reintegração de detentos e ex-detentos na sociedade por meio da conexão dos mesmos, com empresas interessadas na causa, conectando-os ao mercado de trabalho de forma mais simples e eficiente.<br /><br />Além disso, tende a ofertar cursos na área de interesse do indivíduo para assim profissionalizá-lo e prepará-lo para o mercado de trabalho.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Home;