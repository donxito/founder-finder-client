import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        setEmail(target.value);
    };

    const handlePassword = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        setPassword(target.value);
    };

    const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestBody = { email, password };
        const payload = {
            email: requestBody.email, 
            password: requestBody.password,
        };

        authService
            .login(payload)
            .then((response) => {
                storeToken(response.data.authToken);
                authenticateUser();
                navigate("/");
            })
            .catch((error) => {
                const errorDescription = error.response?.data?.message || "An error occurred";
                setErrorMessage(errorDescription);
            });
    };

    return (
        <div className="LoginPage p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <label className="block mb-2">Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleEmail}
                />
                <label className="block mb-2">Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="**********"
                    value={password}
                    onChange={handlePassword}
                />
                <button type="submit" className="btn mt-4">Login</button>
            </form>
            {errorMessage && <p className="error-message mt-4">{errorMessage}</p>}
            <p className="mt-4">Do not have an account yet?</p>
            <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </div>
    );
}

export default LoginPage;
