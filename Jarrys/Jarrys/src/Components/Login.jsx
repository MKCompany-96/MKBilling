import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Accepts both email & username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!identifier || !password) {
      setError("Please enter your email/username and password.");
      return;
    }

    setError("");

    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }), // Send identifier instead of email
    });

    const data = await res.json();
    if (res.ok) navigate("/home");
    else setError(data.error);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome back</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text" // Changed from email to text to accept both
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button onClick={handleLogin}>Sign in</button>
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="redirect-link">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
