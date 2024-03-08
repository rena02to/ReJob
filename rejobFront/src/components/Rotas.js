import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./../pages/Login/Login";
import Homepage from "./../pages/Home";
import NotFound from "./../pages/NotFound";
import Register from "./../pages/Register/Register";
import RegisterCollaborator from "./../pages/Register/RegisterCollaborator/RegisterCollaborator";
import RegisterCompany from "./../pages/Register/RegisterCompany/RegisterCompany";
import RegisterRemand from "./../pages/Register/RegisterRemand/RegisterRemand";
import JobDetails from "../pages/JobDetails/JobDetails";
import JobList from "../pages/JobList/JobList";

import NewVacancy from "../pages/NewVacancy/NewVacancy";
import Profile from "../pages/Profile/Profile";
import ApplicationStatus from "../pages/ApplicationStatus/ApplicationStatus";
import DashboardCompany from "../pages/Dashboard/DashboardCompany/DashboardCompany";
import DashboardRemand from "../pages/Dashboard/DashboardRemand/DashboardRemand"
import DashboardCollaborator from "../pages/Dashboard/DashboardCollaborator/DashboardCollaborator";

function Rotas() {
  const { isLoged, typeUser } = useSelector((rooteRedux) => rooteRedux.useReducer);
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}

        <Route exact path="/" element={<Homepage />} />

        <Route
          exact
          path="/login"
          element={isLoged ? <Navigate to="/" /> : <Login />}
        />

        <Route
          exact
          path="/cadastro"
          element={isLoged ? <Navigate to="/" /> : <Register />}
        />

        <Route
          exact
          path="/vagas/"
          element={<JobList />}>
        </Route>

        <Route
          exact
          path="/vagas/:id"
          element={<JobDetails />}
        ></Route>

        {/* Rotas de Registro */}

        <Route
          exact
          path="/cadastro/empresa"
          element={isLoged ? <Navigate to="/" /> : <RegisterCompany />}
        />

        <Route
          exact
          path="/cadastro/colaborador"
          element={isLoged ? <Navigate to="/" /> : <RegisterCollaborator />}
        />

        <Route
          exact
          path="/cadastro/egresso"
          element={isLoged ? <Navigate to="/login" /> : <RegisterRemand />}
        />

        <Route path="/*" element={<NotFound />} />

        {/* Rotas da Empresa */}
        <Route
          exact
          path="/nova-vaga"
          element={<NewVacancy />}
        />

        <Route
          exact
          path="/dashboard/colaborador"
          element={ <DashboardCollaborator /> }
        ></Route>

        <Route exact path="/dashboard/empresa" element={ <DashboardCompany />} />

        {/* Rotas do Colaborador */}

        {/* Rotas do Egresso */}
        <Route
          exact
          path="/perfil"
          element={isLoged ? <Navigate to="/login" /> : <Profile />}
        />

        <Route
          exact
          path="/painel-egresso"
          element={<DashboardRemand/>}
        />

        <Route
          exact
          path="/minha-candidatura"
          element={<ApplicationStatus />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default Rotas;
