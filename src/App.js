// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./Components/Pages/sidebar";
import "./tailwind.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Dashboard</p>
        <Sidebar />
      </header>
    </div>
  );
}

export default App;
