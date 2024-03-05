import style from "./../styles/css/Home.module.css";
import NavBar from "./../components/NavBar";
import Footer from "./../components/Footer";
import backImageHome from "./../images/backImageHome.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FaAddressCard, FaClock } from "react-icons/fa";
import { FaBuildingUser, FaLocationDot } from "react-icons/fa6";
import RejobSimbol from "./../images/newJob.png";
import { GoBook } from "react-icons/go";
import { MdOutlineCategory } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { educationLevelMapper } from "../utils/utils";
import api from "../services/api";

function Home() {
  const dispatch = useDispatch();
  const { vagas, empresas, depoimentos, ongs, isLoged, nameUser } = useSelector(
    (rootrRedux) => rootrRedux.useReducer
  );
  const ultimasVagas = vagas.length > 6 ? vagas.slice(-6).reverse() : vagas;
  const melhoresEmpresas = empresas.length > 6 ? empresas.slice(-6) : empresas;
  const ultimosDepoimentos = depoimentos.length > 3 ? depoimentos.slice(-3) : depoimentos;
  const melhoresOngs = ongs.length > 5 ? ongs.slice(-5) : ongs;

  useEffect(() => {
    const loadVacancies = async () => {
      try {
        const response = await api.get("/jobs");
        dispatch({ type: "setVagas", payload: response.data });
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    const loadDataStates = async () => {
      try {
        const data = require("./componentsForHome.json");
        dispatch({ type: "setEmpresas", payload: data.empresas });
        dispatch({ type: "setOngs", payload: data.ongs });
        dispatch({ type: "setDepoimentos", payload: data.depoimentos });
      } catch (error) {
        console.error("Erro ao carregar Estados:", error);
      }
    };

    loadVacancies();
    loadDataStates();
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <section className={style.vagas}>
        <div className={style.containerMain}>
          <div className={style.perfilHome}>
            <img alt="Imagem de fundo da página de vagas" src={backImageHome} />
            <div className={style.conteudo}>
              <p className={style.title}>
                OPORTUNIDADES DE <br />
                TRABALHO COM FOCO EM
                <br />
                <span>REINTEGRAÇÃO SOCIAL</span>
              </p>
              {isLoged ? 
              <>
                <p className={style.welcome}>Seja bem vindo, <span>{nameUser}</span>!</p>
              </> : <>
                <p className={style.cadastre}>
                  Cadastre-se e comece a construir um novo futuro!
                </p>
                <div className={style.interno}>
                  <div className={style.buttons}>
                    <a href="/cadastro/colaborador" className={style.colaborador}>
                      <button>Sou colaborador</button>
                    </a>
                    <a
                      href="/cadastro/empresa"
                      className={style.colaboradorEmpresa}
                    >
                      <button>Sou empresa</button>
                    </a>
                    <a
                      href="/cadastro/egresso"
                      className={style.colaboradorEmpresa}
                    >
                      <button>Sou egresso</button>
                    </a>
                  </div>
                  <i>
                    <p className={style.legenda}>
                      Tenha acesso a diversas oportunidades de emprego.
                      <br />
                      Encontre a vaga perfeita para de acordo com o perfil do
                      usuário.
                    </p>
                  </i>
                </div>
              </>}
            </div>
          </div>
          <div className={style.ultimasVagas}>
            <h2>Nossas últimas vagas</h2>
            <div className={style.cards}>
              {ultimasVagas.map((vaga) => (
                <div className={style.cardVaga} key={vaga.id}>
                  <div className={style.imagem}>
                    <img src={RejobSimbol} alt="Empresa" />
                  </div>
                  <p className={style.titulo}>{vaga.jobTitle}</p>
                  <div className={style.area}>
                    <p>
                      <MdOutlineCategory />
                      {vaga.categories}
                    </p>
                  </div>
                  <div className={style.sobre}>
                    <div className={style.empresa}>
                      <a href={`/empresa/id`}>
                        <p>
                          <FaBuildingUser />
                          {vaga.companyName}
                        </p>
                      </a>
                    </div>
                    <div className={style.local}>
                      <p>
                        <FaLocationDot />
                        {/* {vaga.companyLocation} */}
                      </p>
                    </div>
                    <div className={style.nivel}>
                      <p>
                        <FaClock />
                        {vaga.employmentType}
                      </p>
                    </div>
                    <div className={style.tipo}>
                      <p>
                        <FaAddressCard />
                        {vaga.employmentContractType}
                      </p>
                    </div>
                    <div className={style.faixaSalarial}>
                      <p>
                        <RiMoneyDollarCircleLine />
                        R$ {vaga.salaryRange.salaryRangeMin} - R${" "}
                        {vaga.salaryRange.salaryRangeMax}
                      </p>
                    </div>
                    <div className={style.escolaridade}>
                      <p>
                        <GoBook />
                        {educationLevelMapper(vaga.educationLevel)}
                      </p>
                    </div>
                  </div>
                  <button className={style.inscreva}>
                    <a href={`/vagas/${vaga.id}`}>Inscreva-se</a>
                  </button>
                </div>
              ))}
            </div>
            <button>
              <a href="/vagas">Mais vagas</a>
            </button>
          </div>
          <div className={style.beneficios}>
            <h2 className={style.quaisbeneficios}>
              Quais benefícios minha empresa receberá ao recrutar trabalhadores
              na ReJob?
            </h2>
            <p className={style.beneficiosTexto}>
              Sua empresa receberá incentivos fiscais fornecidos pelo governo,
              além do Certificado de Empregador Socialmente Responsável emitido
              por nós, comprovando o compromisso da sua empresa com a inclusão
              social. Além disso, você irá encontrar talentos qualificados e com
              as habilidades necessárias para preencher as vagas de sua empresa.
            </p>
            <div className={style.melhoresEmpresasContainer}>
              <h2>Algumas empresas que já contrataram com a ReJob</h2>
              <div className={style.melhoresEmpresas}>
                {melhoresEmpresas.map((empresa, index) => (
                  <a href={`empresa/${empresa.id}`} key={index}>
                    <img src={empresa.imagem} alt="Imagem da empresa" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={style.futurosReconstruidos}>
            <div className={style.futurosTitulo}>
              <h2>Futuros reconstruidos pela</h2>
              <div className={style.simbolRejob}>
                <img src={RejobSimbol} alt="ReJob" />
                <h2>
                  Re<span>Job</span>
                </h2>
              </div>
            </div>
            <div className={style.depoimentos}>
              {ultimosDepoimentos.map((depoimento, index) => (
                <div className={style.cardDepoimentos} key={index}>
                  <div className={style.imagem}>
                    <img src={depoimento.foto} alt="Foto" />
                  </div>
                  <p className={style.nome}>{depoimento.nome}</p>
                  <p className={style.depoimento}>
                    {depoimento.depoimento.split("").length > 380
                      ? depoimento.depoimento.substring(0, 380) + "..."
                      : depoimento.depoimento}
                  </p>
                  <div className={style.infosContratacao}>
                    <img src={depoimento.imgQmContratou} alt="Empresa" />
                    <p className={style.qmContratou}>
                      Contratado(a) por{" "}
                      <a href={`empresa/${depoimento.idEmpresa}`}>
                        {depoimento.qmContratou}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.ongs}>
              <h2>Algumas ONG&apos;s que tem parceria com a ReJob</h2>
              <div className={style.melhoresOngs}>
                {melhoresOngs.map((ong, index) => (
                  <a href={`ong/${ong.id}`} key={index}>
                    <img src={ong.foto} alt="Imagem da ONG" />
                  </a>
                ))}
              </div>
            </div>
            <div className={style.sobreRejob}>
              <h2>
                Sobre a Re<span>Job</span>
              </h2>
              <p>
                A{" "}
                <span>
                  Re<span>Job</span>
                </span>{" "}
                se trata de um software desenvolvido na disciplina de Projeto de
                Desenvolvimento de Software na Universidade Federal de Alagoas.
                <br />
                <br />
                Consiste em um sistema desenvolvido com o objetivo de promover a
                reintegração de detentos e ex-detentos na sociedade por meio da
                conexão dos mesmos, com empresas interessadas na causa,
                conectando-os ao mercado de trabalho de forma mais simples e
                eficiente.
                <br />
                <br />
                Além disso, tende a ofertar cursos na área de interesse do
                indivíduo para assim profissionalizá-lo e prepará-lo para o
                mercado de trabalho.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
