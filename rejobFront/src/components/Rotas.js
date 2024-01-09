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
import RegisterCollaboratory from "./../pages/Register/RegisterCollaboratory";
import Vacancies from "./Vacancies";
import JobDescriptions from "./JobDescriptions";
import GeneralServices from "./GeneralServices";

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
          element={isLoged ? <Navigate to="/" /> : <RegisterCollaboratory />}
        />
        <Route
          exact
          path="/register/company/"
          element={isLoged ? <Navigate to="/" /> : <Register />}
        />
        <Route
          exact
          path="/register/remand/"
          element={isLoged ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/*" element={<NotFound />} />
        <Route
          exact
          path="/vacancies"
          element={isLoged ? <Navigate to="/" /> : <Vacancies />}
        ></Route>
        <Route
          exact
          path="/job-descriptions"
          element={isLoged ? <Navigate to="/" /> : <JobDescriptions />}
        ></Route>
        <Route
          exact
          path="/general-services"
          element={isLoged ? <Navigate to="/" /> : <GeneralServices />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default Rotas;
