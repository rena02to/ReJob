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
          path="/register"
          element={isLoged ? <Navigate to="/" /> : <Register />}
        />
        <Route
          exact
          path="/register/collaborator/"
          element={isLoged ? <Navigate to="/" /> : <RegisterCollaborator />}
        />
        <Route
          exact
          path="/register/company/"
          element={isLoged ? <Navigate to="/" /> : <RegisterCompany />}
        />
        <Route
          exact
          path="/collaborator/registerremand/"
          element={isLoged ? <Navigate to="/login" /> : <RegisterRemand />}
        />
        <Route path="/*" element={<NotFound />} />

        <Route path="/newVacancy" element={<NewVacancy/>} />
        <Route
          exact
          path="/jobs/"
          element={isLoged ? <Navigate to="/" /> : <JobList />}
        ></Route>
        <Route
          exact
          path="/jobs/:index"
          element={isLoged ? <Navigate to="/" /> : <JobDetails />}
        ></Route>
        <Route
          exact
          path="/serviços-gerais"
          element={isLoged ? <Navigate to="/" /> : <GeneralServices />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default Rotas;
