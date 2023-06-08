import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [location, setLocation] = useState("login");

  const locationChange = (e) => {
    setLocation(e.target.dataset.target);
  };

  return (
    <div className="App">
      <nav>
        <button onClick={locationChange} data-target="login">
          Log in
        </button>
        <button onClick={locationChange} data-target="register">
          Register
        </button>
      </nav>
      <div>{location === "login" ? <Login /> : null}</div>
      <div>{location === "register" ? <Register /> : null}</div>
    </div>
  );
}

export default App;
