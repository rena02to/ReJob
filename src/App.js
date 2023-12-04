import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import RecoverPassword from "./pages/RecoverPassword";
import Register from './pages/Register';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/recover" element={<RecoverPassword/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;