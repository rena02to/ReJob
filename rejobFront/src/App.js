import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./components/Login/Login";
import Homepage from "./components/Home";
import NotFound from "./pages/NotFound";
import Register from'./pages/Register';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
