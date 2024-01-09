import { Provider } from "react-redux";
import store from "./redux/store";
import Rotas from "./components/Rotas";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Rotas />
      </div>
    </Provider>
  );
}

export default App;
