import React from "react";
import "./Homestyles.css";
import image from "../../images/image(1).jpg";
import image1 from "../../images/Rectangle 13.jpg";
import image2 from "../../images/Rectangle 13 (1).jpg";
import image3 from "../../images/Rectangle 13 (2).jpg";
import iconejob from "../../images/newJob.jpg";
import icone1 from "../../images/icone1.jpg";
import icone3 from "../../images/icone2.jpg";
import icone2 from "../../images/icone3.jpg";
import icone4 from "../../images/icone4.jpg";
import Rectangle1 from "../../images/Rectangle 1.jpg";
import Rectangle2 from "../../images/Rectangle 2.jpg";
import Rectangle3 from "../../images/Rectangle 3.jpg";
import Rectangle4 from "../../images/Rectangle 4.jpg";
import Rectangle5 from "../../images/Rectangle 5.jpg";
import Profile3 from "../../images/Profile3.jpg";
import Profile4 from "../../images/Profile4.jpg";
import Profile5 from "../../images/Profile5.jpg";
import iconprofile1 from "../../images/iconprofile1.jpg";
import iconprofile2 from "../../images/iconprofile2.jpg";
import iconprofile3 from "../../images/iconprofile3.jpg";
import ONG1 from "../../images/ONG1.jpg";
import ONG2 from "../../images/ONG2.jpg";
import ONG3 from "../../images/ONG3.jpg";
import ONG4 from "../../images/ONG4.jpg";
import ONG5 from "../../images/ONG5.jpg";
import arrow from "../../images/arrow.png";
import Navbar from "../Navbar/Navbar";

function Home() {
  const handleColaboradorClick = () => {
    console.log("Botão Sou Colaborador clicado!");
  };

  const handleEmpresaClick = () => {
    console.log("Botão Sou Empresa clicado!");
  };

  return (
    <>
      <Navbar />
      <div className="image">
        <div className="text-overlay-image">
          <div className="text-container">
            <span className="op">
              OPORTUNIDADES DE <br />
              TRABALHO COM O FOCO EM <br />
            </span>
            <span className="job-int">REINTEGRAÇÃO SOCIAL</span>
            <div className="registration-section">
              <span className="registration-instructions">
                <p>Cadastre-se e comece a construir um novo futuro!</p>
              </span>
            </div>
            <div className="button-container">
              <button
                className="employee-section "
                onClick={handleColaboradorClick}
              >
                Sou Colaborador
              </button>
              <button className="company-section" onClick={handleEmpresaClick}>
                Sou Empresa
              </button>
            </div>
            <div>
              <div className="text-overlay">
                <p>
                  Tenha acesso a diversas oportunidades de emprego.
                  <br />
                  Encontre a vaga perfeita de acordo com o perfil do usuário.
                </p>
              </div>
            </div>
          </div>
          <img src={image} alt="Image" width={1024} height={400} />
        </div>

        <div className="job-section">
          <h1>Nossas últimas vagas</h1>
          <div className="opportunities-card-list">
            <div className="opportunity-card">
              <div className="icon-box">
                <img src={image1} alt="image1" className="image-card" />
              </div>
              <div className="card-title">
                <h1>Serviços Gerais</h1>
              </div>
              <div className="info-container">
                <p className="card-info">
                  <img src={icone1} alt="Ícone 1" />
                  Starbucks
                </p>
                <p className="card-info">
                  <img src={icone2} alt="Ícone 2" />
                  São Paulo, São Paulo, Brasil
                </p>
                <p className="card-info">
                  <img src={icone3} alt="Ícone 3" /> Sênior
                </p>
                <p className="card-info">
                  <img src={icone4} alt="Ícone 4" /> CLT
                </p>
                <div className="btns-icon">
                  <button>AW2 EC2</button>
                  <button>C# </button>
                  <button>.NET</button>
                  <button>TDD</button>
                  <button>Node.js</button>
                </div>
              </div>
              <button className="subscribe-button">Inscrever-se</button>
            </div>
            <div className="opportunity-card">
              <div className="icon-box">
                <img src={image2} alt="image2" className="image-card" />
              </div>
              <div className="card-title">
                <h1>Assistente Financeiro</h1>
              </div>

              <div className="info-container">
                <p className="card-info">
                  <img src={icone1} alt="Ícone 1" />
                  Seil Hakc
                </p>
                <p className="card-info">
                  <img src={icone2} alt="Ícone 2" />
                  Maceió, Alagoas, Brasil
                </p>
                <p className="card-info">
                  <img src={icone3} alt="Ícone 3" />
                  Ensino Médio
                </p>
                <p className="card-info">
                  <img src={icone4} alt="Ícone 4" /> CLT
                </p>
                <div className="btns-icon">
                  <button>AW2 EC2</button>
                  <button>C# </button>
                  <button>.NET</button>
                  <button>TDD</button>
                  <button>Node.js</button>
                </div>
              </div>
              <button className="subscribe-button">Inscrever-se</button>
            </div>

            <div className="opportunity-card">
              <div className="icon-box">
                <img src={image3} alt="image3" className="image-card" />
              </div>
              <div className="card-title">
                <h1>Desenvolvedor(a) Back- end Sênior</h1>
              </div>
              <div className="info-container">
                <p className="card-info">
                  <img src={icone1} alt="Ícone 1" />
                  Mc Donald’s
                </p>
                <p className="card-info">
                  <img src={icone2} alt="Ícone 2" />
                  São Paulo, São Paulo, Brasil
                </p>
                <p className="card-info">
                  <img src={icone3} alt="Ícone 3" /> Sênior
                </p>
                <p className="card-info">
                  <img src={icone4} alt="Ícone 4" /> CLT
                </p>
                <div className="btns-icon">
                  <button>AW2 EC2</button>
                  <button>C# </button>
                  <button>.NET</button>
                  <button>TDD</button>
                  <button>Node.js</button>
                </div>
              </div>
              <button className="subscribe-button">Inscrever-se</button>
            </div>
          </div>
        </div>
        <div className="benifits-section">
          <h1>
            Quais benefícios minha empresa<br></br>
            receberá ao recrutar trabalhadores na ReJob?
          </h1>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </div>
        </div>
        <div className="company-title">
          <h1> Algumas empresas que já contratram com a Rejob</h1>
          <div className="company-icon">
            <img src={Rectangle1} alt="image1" className="image-card"></img>
            <img src={Rectangle2} alt="image1" className="image-card"></img>
            <img src={Rectangle3} alt="image1" className="image-card"></img>
            <img src={Rectangle4} alt="image1" className="image-card"></img>
            <img src={Rectangle5} alt="image1" className="image-card"></img>
          </div>
        </div>

        <div className="future-vision-box">
          <div className="vision-title">
            <h1>Futuros reconstruidos pela</h1>
            <span className="rejob-container">
              <img src={iconejob} alt="Ícone" width={42} height={42} />
              <span className="re">Re</span>
              <span className="job">Job</span>
            </span>
          </div>
        </div>
        <div className="cards-second">
          <div className="work-opportunity">
            <div className="opportunity-card2">
              <div className="icon-box2">
                <img src={Profile3} alt="image1" className="image-card"></img>
              </div>
              <div className="card-title-profile">Ana Letícia da Silva</div>
              <div className="info-container-profile">
                <p className="card-info-profile">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.Lorem Ipsum is simply dummy
                  text of the printing and typesetting industry.
                </p>
              </div>
              <p className="card-info-end">
                <img src={iconprofile1} alt="iconprofile" />
                Contratada pela
                <span className="company-container"> Seil Hack</span>
              </p>
            </div>
          </div>
          <div className="work-opportunity">
            <div className="opportunity-card2">
              <div className="icon-box2">
                <img src={Profile4} alt="image1" className="image-card"></img>
              </div>
              <div className="card-title-profile">Clara Matos</div>
              <div className="info-container-profile">
                <p className="card-info-profile">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.Lorem Ipsum is simply dummy
                  text of the printing and typesetting industry.
                </p>
              </div>
              <p className="card-info-end">
                <img src={iconprofile2} alt="iconprofile" />
                Contratada pela
                <span className="company-container"> Mc Donald’s</span>
              </p>
            </div>
          </div>
          <div className="work-opportunity">
            <div className="opportunity-card2">
              <div className="icon-box2">
                <img src={Profile5} alt="image1" className="image-card"></img>
              </div>
              <div className="card-title-profile">Pedro Matheus</div>
              <div className="info-container-profile">
                <p className="card-info-profile">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.Lorem Ipsum is simply dummy
                  text of the printing and typesetting industry.
                </p>
              </div>
              <p className="card-info-end">
                <img src={iconprofile3} alt="iconprofile" />
                Contratada pela
                <span className="company-container"> BMW</span>
              </p>
            </div>
          </div>
        </div>

        <div className="benifits-section2">
          <div className="company-title2">
            <h1>Algumas ONG’s que tem parceria com a ReJob</h1>
            <div className="company-icon">
              <img src={ONG1} alt="image1" className="image-card"></img>
              <img src={ONG2} alt="image1" className="image-card"></img>
              <img src={ONG3} alt="image1" className="image-card"></img>
              <img src={ONG4} alt="image1" className="image-card"></img>
              <img src={ONG5} alt="image1" className="image-card"></img>
            </div>
          </div>
          <p className="about">
            Sobre a Re<span className="company-container2">Job</span>
          </p>
          <div>
            <div>
              <p className="about2">
                {" "}
                <p className="about2">
                  <p>
                    A{" "}
                    <span className="rejob2">
                      <strong>Re</strong>
                      <span className="re">Job </span>
                    </span>
                    se trata de um software desenvolvido na disciplina de
                    Projeto de Desenvolvimento de Software na{" "}
                    <strong>Universidade Federal de Alagoas</strong>.
                  </p>
                  <br />
                  <p>
                    {" "}
                    Consiste em um sistema desenvolvido com o objetivo de
                    promover a reintegração de detentos e ex-detentos na
                    sociedade por meio da conexão dos mesmos, com empresas
                    interessadas na causa, conectando-os ao mercado de trabalho
                    de forma mais simples e eficiente.
                  </p>
                  <br /> Além disso, tende a ofertar cursos na área de interesse
                  do indivíduo para assim profissionalizá-lo e prepará-lo para o
                  mercado de trabalho.
                </p>
              </p>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="footer-rejob">
            <span className="rejob-container-footer">
              <img src={iconejob} alt="Ícone" width={66.564} height={66.564} />
              <span className="re-white">Re</span>
              <span className="job-footer">Job</span>
            </span>
          </div>
          <div className="vertical-line">
            <p className="address">Endereço</p>
            <div className="horizontal-line"></div>
            <p>
              Av. Lourival Melo Mota, S/N, Tabuleiro do <br /> Martins, Maceió -
              AL, Cep: 57072-970
            </p>
            <p className="contact">Contato</p>
            <div className="horizontal-line"></div>
            <p>reJob_suporte@gmail.com</p>
          </div>
          <div className="vertical-line2"></div>
          <div className="footer-topics">
            <div className="footer-icon-topic">
              <img src={arrow} alt="Ícone" width={24} height={24} />
              <span>Início</span>
            </div>
            <div className="footer-icon-topic">
              <img src={arrow} alt="Ícone" width={24} height={24} />
              <span>Vagas</span>
            </div>
            <div className="footer-icon-topic">
              <img src={arrow} alt="arrow" width={24} height={24} />
              <span>Sobre a Empresas</span>
            </div>
          </div>
        </footer>
        <div className="university-line">
          <p>Universidade Federal de Alagoas © - 2024</p>
        </div>
      </div>
    </>
  );
}

export default Home;
