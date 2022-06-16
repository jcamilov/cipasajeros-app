import "./App.css";
import TestData from "./components/TestData";
import Home from "./pages/Home";
import Vehiculo from "./pages/Vehiculo";
import {data} from "./assets/fakedata";
import Dashboard from "./pages/Dashboard";

function App() {
  return <div className="App">{<Dashboard />}</div>;
}

export default App;
