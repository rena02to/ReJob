import React, { useState } from "react";
import styles from "./../styles/css/Vacancies.module.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";

function Vacancies() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [presencial, setPresencial] = useState(false);
  const [remoto, setRemoto] = useState(false);

  const handlePresencialChange = () => {
    setPresencial(!presencial);
    if (remoto) {
      setRemoto(false);
    }
  };

  const handleRemotoChange = () => {
    setRemoto(!remoto);
    if (presencial) {
      setPresencial(false);
    }
  };

  const [faixaSalarial, setFaixaSalarial] = useState([1000, 30000]);

  const handleFaixaSalarialChange = (e) => {
    setFaixaSalarial(e.value);
  };

  const cities = [
    { label: "New York", value: "New York" },
    { label: "Los Angeles", value: "Los Angeles" },
    { label: "Chicago", value: "Chicago" },
    { label: "Houston", value: "Houston" },
    { label: "Dallas", value: "Dallas" },
  ];

  return (
    <>
      <NavBar></NavBar>
      <div className={styles.container}>
        <div>
          <div className={styles.header_container}>
            <h2>
              As melhores vagas com foco em <span>REINTEGRAÇÃO SOCIAL</span>
            </h2>
          </div>
          <div className={styles.body_container}>
            <div className={styles.job_list_container}>
              <h2>
                <span>130 vagas</span> disponíveis
              </h2>
              <div className={styles.job_list_view}>
                <div>
                  <div className={styles.card_joblist}>
                    <div className={styles.card_joblist_header}>
                      <div>
                        <span>Starbucks</span>
                        <h2>Auxiliar de Limpeza</h2>
                        <button className={styles.button_outline}>
                          Serviços Gerais
                        </button>
                      </div>
                      <div></div>
                    </div>
                    <div className={styles.job_description}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum...
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.filters_container}>
              <div className={styles.filter_header}>
                <h2>Filtro de vagas</h2>
                <button>Limpar</button>
              </div>
              <div className={styles.filters}>
                <p>Categoria da Vaga</p>
                <Dropdown
                  value={selectedCity}
                  options={cities}
                  onChange={(e) => setSelectedCity(e.value)}
                  placeholder="Selecione a categoria"
                />
                <p>Habilidades</p>
                <Dropdown
                  value={selectedCity}
                  options={cities}
                  onChange={(e) => setSelectedCity(e.value)}
                  placeholder="Selecione uma opção"
                />
                <p>Tipo de Vaga</p>
                <div className={styles.type_of_vacancy}>
                  <div>
                    <Checkbox
                      inputId="remoteCheckbox"
                      value="remoto"
                      onChange={handleRemotoChange}
                      checked={remoto}
                    />
                    <label htmlFor="remoteCheckbox"> Remoto</label>
                  </div>
                  <div>
                    <Checkbox
                      inputId="presencialCheckbox"
                      value="presencial"
                      onChange={handlePresencialChange}
                      checked={presencial}
                    />
                    <label htmlFor="presencialCheckbox"> Presencial</label>
                  </div>
                </div>
                <p>Cidade da empresa</p>
                <Dropdown
                  value={selectedCity}
                  options={cities}
                  onChange={(e) => setSelectedCity(e.value)}
                  placeholder="Selecione uma opção"
                />
                <p>Faixa Salarial (Mensal)</p>
                <div className={styles.salary_range}>
                  <span>R$ 1.000 - R$ 30.000</span>
                  <Slider
                    value={faixaSalarial}
                    onChange={handleFaixaSalarialChange}
                    range
                    min={0}
                    max={30000}
                    step={1000}
                  />
                  <button>Filtrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Vacancies;
