import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { FormField, Button, Form, Input } from "semantic-ui-react";
import { FaEnvelope, FaLock } from "react-icons/fa";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

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
        const errorDescription =
          error.response?.data?.message || "An error occurred";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage p-6 bg-white shadow-md rounded-md max-w-md mx-auto my-20">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <Form onSubmit={handleLoginSubmit}>
        <FormField className="flex items-center mb-4">
          <span className="mr-2">
            <FaEnvelope className="text-customBlue" />
          </span>
          <Input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={handleEmail}
          />
        </FormField>

        <FormField className="flex items-center mb-4">
          <span className="mr-2">
            <FaLock className="text-customBlue" />
          </span>
          <Input
            type="password"
            name="password"
            placeholder="**********"
            value={password}
            onChange={handlePassword}
          />
        </FormField>

        <div className="mb-2">
          <Button
            type="submit"
            className="btn mt-4"
            basic
            color="blue"
            content="Login"
          >
            Login
          </Button>
        </div>

        {errorMessage && <p className="error-message mt-4">{errorMessage}</p>}

        <div className="mt-8">
          <p>Do not have an account yet?</p>
        </div>
        <Link
          to="/register"
          className="btn btn-active btn-secondary hover:text-customCyan"
        >
          Register
        </Link>
      </Form>
    </div>
  );
}

export default LoginPage;
