import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./../pages/Login/Login";
import Homepage from "./../pages/Home";
import NotFound from "./../pages/NotFound";
import Register from "./../pages/Register/Register";
import RegisterCollaborator from "./../pages/Register/RegisterCollaborator";
import RegisterCompany from "./../pages/Register/RegisterCompany";
import RegisterRemand from "./../pages/Register/RegisterRemand";
import JobDetails from "../pages/JobDetails/JobDetails";
import GeneralServices from "../pages/GeneralServices/GeneralServices";
import JobList from "../pages/JobList/JobList";

import NewVacancy from "../pages/NewVacancy/NewVacancy";

function Rotas() {
  const { isLoged } = useSelector((rooteRedux) => rooteRedux.useReducer);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route
          exact
          path="/login"
          element={isLoged ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/registro"
          element={isLoged ? <Navigate to="/" /> : <Register />}
        />
        <Route
          exact
          path="/registro/colaborador/"
          element={isLoged ? <Navigate to="/" /> : <RegisterCollaborator />}
        />
        <Route
          exact
          path="/registro/empresa/"
          element={isLoged ? <Navigate to="/" /> : <RegisterCompany />}
        />
        <Route
          exact
          path="/colaborador/registro-ressocializado/"
          element={isLoged ? <Navigate to="/login" /> : <RegisterRemand />}
        />
        <Route path="/*" element={<NotFound />} />

        <Route path="/nova-vaga" element={<NewVacancy/>} />
        <Route
          exact
          path="/vagas/"
          element={<JobList />}
        ></Route>
        <Route
          exact
          path="/vagas/:id"
          element={isLoged ? <Navigate to="/" /> : <JobDetails />}
        ></Route>
        <Route
          exact
          path="/serviços-gerais"
          element={<GeneralServices />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default Rotas;
