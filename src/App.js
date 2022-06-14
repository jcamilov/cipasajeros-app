import "./App.css";
import Graph from "./components/Graph";
import TestData from "./components/TestData";
import Home from "./pages/Home";
import Vehiculo from "./pages/Vehiculo";
import {data} from "./assets/fakedata";

function App() {
  // const populate = () => {
  //   data.forEach(async (element) => {
  //     const response = await fetch(API_URL, {
  //       method: "POST",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify(element),
  //     });
  //     // const content = await response.json();
  //   });
  // };

  return (
    <div className="App">
      {/* <Home /> */}
      {/* <Graph /> */}
      {/* <Vehiculo /> */}
    </div>
  );
}

export default App;
