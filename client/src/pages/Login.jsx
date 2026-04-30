import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            if (res.data?.token) {
                localStorage.setItem("token", res.data.token);
                alert("Login successful");
                navigate("/templates");
            } else {
                alert("Invalid response");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h2>Welcome Back 👋</h2>
                <p>Login to continue</p>

                <form onSubmit={handleLogin}>

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>

                </form>

                <p className="bottom-text">
                    Don’t have an account?
                    <span onClick={() => navigate("/register")}> Register</span>
                </p>

            </div>

        </div>
    );
}

export default Login;