import { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate(); // ✅ important

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                form
            );

            alert(res.data.message);

            // ✅ redirect to login page after success
            navigate("/login");

        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    return (
        <div className="register-container">

            <div className="register-card">

                <h2>Create Account ✨</h2>
                <p>Sign up to get started</p>

                <form onSubmit={handleSubmit}>

                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Register</button>

                </form>

            </div>

        </div>
    );
}

export default Register;