import { useState, useEffect } from "react";

import api from "../../services/api";

import SearchIcon from "@mui/icons-material/Search";
import CoursesInProgress from "../CoursesInProgress/CoursesInProgress";
import PaginationRounded from "../../pages/PaginationRounded/PaginationRounded";

const CoursesOng = (props) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [cursosExibidos, setCursosExibidos] = useState([]);
  const id = props.id;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await api.get(`${props.url}/${id}`);

          setCourses(response.data);
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (props.newCourse) {
      const fetchData = async () => {
        try {
          const response = await api.get(`${props.url}/${id}`);

          setCourses(response.data);
        } catch (error) {
          console.error("Erro na requisição:", error);
        }

        props.toggleNewCourse();
      };

      fetchData();
    }
  }, [props.newCourse]);


  useEffect(() => {
    setCursosExibidos(calcularCursosExibidos());
  }, [paginaAtual, courses]);

  useEffect(() => {
    setCursosExibidos(calcularCursosExibidos());
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm === undefined) {
      setSearchTerm("");
    }
  }, [searchTerm]);

  const calcularCursosExibidos = () => {
    const cursosFiltrados = courses.filter((course) => {
      const searchString = `${course.courseTitle} ${course.platform} ${course.description} ${course.link}`;
      return searchString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const cursosPorPagina = 8;
    const indiceInicial = (paginaAtual - 1) * cursosPorPagina;
    const indiceFinal = indiceInicial + cursosPorPagina;

    return cursosFiltrados.slice(indiceInicial, indiceFinal);
  };

  const handleChangePagina = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  return (
    <div className="">
      <div className="relative">
        <input
          className="absolute top-[-56px] h-[42px] w-full"
          type="text"
          placeholder="Pesquise qualquer informação de vaga aqui"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <SearchIcon
          onClick={(e) => setSearchTerm(e.target.value)}
          style={{ color: "#00a3ff" }}
          className="absolute hover:scale-110 hover:-translate-y-1 transition duration-300 ease-in-out delay-150 top-[-46px] right-[24px] h-[42px] w-full hover:bg-slate-100 hover: cursor-pointer rounded-full"
        />
      </div>
      <div className="flex flex-wrap md:grid-cols-4 gap-[12px] px-[12px] pb-[24px]">
        {cursosExibidos.map((course, index) => {
          {
            return (
              <CoursesInProgress
                course={course}
              />
            );
          }
        })}
      </div>

      <PaginationRounded
        totalVagas={courses.length}
        paginaAtual={paginaAtual}
        onChangePagina={handleChangePagina}
      />
    </div>
  );
};

export default CoursesOng;
