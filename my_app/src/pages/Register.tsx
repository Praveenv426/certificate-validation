import { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await register({ username, password });
    if (res.ok) {
      navigate("/login");
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 bg-gray-100"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 bg-gray-100"
        required
      />
      <button className="w-full bg-blue-500 text-white p-2">Register</button>
    </form>
  );
};

export default Register;
