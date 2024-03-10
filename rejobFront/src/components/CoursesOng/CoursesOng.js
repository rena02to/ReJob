import { useState, useEffect } from "react";

import api from "../../services/api";

import SearchIcon from '@mui/icons-material/Search';
import CourseInProgress from "../CourseInProgress/CourseInProgress";

const CoursesOng = (props) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
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

  const handleChangePagina = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  return (
    <div className="">
      <div className="relative">
        <input
          className="absolute top-[-92px] h-[42px] w-full"
          type="text"
          placeholder="Pesquise qualquer informação de vaga aqui"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <SearchIcon onClick={(e) => setSearchTerm(e.target.value)} style={{ color: "#00a3ff" }} className="absolute hover:scale-110 hover:-translate-y-1 transition duration-300 ease-in-out delay-150 top-[-82px] right-[24px] h-[42px] w-full hover:bg-slate-100 hover: cursor-pointer rounded-full" />

      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[12px] px-[12px] pb-[24px]">
        {courses.map((course, index) => {
          {
            return (
              <CourseInProgress
                key={index}
                courseTitle={course.courseTitle}
                platform={course.platform}
                link={course.link}
                description={course.description}
                duration={course.duration}
              />
            );
          }
        })}

      </div>


    </div>
  );
};

export default CoursesOng;
