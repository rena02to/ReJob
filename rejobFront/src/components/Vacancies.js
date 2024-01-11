import React, { useEffect, useState } from "react";
import styles from "./../styles/css/Vacancies.module.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";

function Vacancies() {
  const [state, setState] = useState(null);
  const [presencial, setPresencial] = useState(false);
  const [remoto, setRemoto] = useState(false);
  const [salaryRange, setSalaryRange] = useState([1000, 30000]);

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

  const handleSalaryRangeChange = (e) => {
    setSalaryRange(e.value);
  };

  const brazilianStates = [
    { label: "Acre", value: "AC" },
    { label: "Alagoas", value: "AL" },
    { label: "Amapá", value: "AP" },
    { label: "Amazonas", value: "AM" },
    { label: "Bahia", value: "BA" },
    { label: "Ceará", value: "CE" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Goiás", value: "GO" },
    { label: "Maranhão", value: "MA" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Pará", value: "PA" },
    { label: "Paraíba", value: "PB" },
    { label: "Paraná", value: "PR" },
    { label: "Pernambuco", value: "PE" },
    { label: "Piauí", value: "PI" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Rondônia", value: "RO" },
    { label: "Roraima", value: "RR" },
    { label: "Santa Catarina", value: "SC" },
    { label: "São Paulo", value: "SP" },
    { label: "Sergipe", value: "SE" },
    { label: "Tocantins", value: "TO" },
  ];

  const handleFilterClick = () => {
    const filters = {
      state,
      presencial,
      remoto,
      salaryRange,
    };
    console.log(filters);
  };

  const clearFilters = () => {
    setState(null);
    setPresencial(false);
    setRemoto(false);
    setSalaryRange([1000, 30000]);
  };

  return (
    <>
      <NavBar></NavBar>
      <div className={styles.container}>
        <div className={styles.section}>
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
            <div>
              <div className={styles.filters_container}>
                <div className={styles.filter_header}>
                  <h2>Filtro de vagas</h2>
                  <button onClick={clearFilters}>Limpar</button>
                </div>
                <div className={styles.filters}>
                  <p>Categoria da Vaga</p>
                  <Dropdown
                    value={state}
                    options={brazilianStates}
                    onChange={(e) => setState(e.value)}
                    placeholder="Selecione a categoria"
                  />
                  <p>Habilidades</p>
                  <Dropdown
                    value={state}
                    options={brazilianStates}
                    onChange={(e) => setState(e.value)}
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
                  <p>Localização</p>
                  <Dropdown
                    value={state}
                    options={brazilianStates}
                    onChange={(e) => setState(e.value)}
                    placeholder="Selecione uma opção"
                  />
                  <p>Faixa Salarial (Mensal)</p>
                  <div className={styles.salary_range}>
                    <span>
                      R$ {salaryRange[0]} - R$ {salaryRange[1]}
                    </span>
                    <Slider
                      value={salaryRange}
                      onChange={handleSalaryRangeChange}
                      range
                      min={0}
                      max={30000}
                      step={1000}
                    />
                    <button onClick={handleFilterClick}>Filtrar</button>
                  </div>
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
