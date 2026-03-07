import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name) {
      alert("Enter name");
      return;
    }

    localStorage.setItem("user", name);
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login Page</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Continue</button>
    </div>
  );
};

export default Login;