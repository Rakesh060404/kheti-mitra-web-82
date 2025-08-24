import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Replace with real signup API call
        if (email && password) {
            localStorage.setItem("authToken", "demo-token");
            navigate("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl mb-6 text-center">Sign Up</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full mb-6 p-2 border rounded"
                    required
                />
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
                    Sign Up
                </button>
                <div className="mt-4 text-center">
                    <a href="/login" className="text-blue-600 underline">Already have an account? Login</a>
                </div>
            </form>
        </div>
    );
};

export default Signup;