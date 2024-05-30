/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/auth.service";
import { FaEnvelope, FaLock, FaUserCircle, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';


function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "name":
        setName(value);
        break;
      case "about":
        setAbout(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSignupSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const requestBody = {
        email,
        password,
        name,
        about: about || undefined, // Send about only if it is provided
        phoneNumber: phoneNumber || undefined,
      };

      await authService.signup(requestBody);
      setLoading(false);
     } catch (error: any) {     navigate("/login");

      setLoading(false);
      setError(error.response?.data.message);
    }
  };

  return (
    <div className="SignUpPage p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-7">Sign Up</h1>
      <form onSubmit={handleSignupSubmit}>
        <div className="flex items-center mb-4">
          <span className="mr-2">
            <FaEnvelope />
          </span>
          <input
            type="text"
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-4">
          <span className="mr-2">
            <FaLock />
          </span>
          <input
            type="password"
            name="password"
            placeholder="******"
            value={password}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-4">
          <span className="mr-2">
            <FaUserCircle />
          </span>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center mb-4">
          <span className="mr-2">
            <FaInfoCircle />
          </span>
          <textarea
            name="about"
            placeholder="Write a short bio about yourself"
            rows={4}
            cols={40}
            value={about}
            onChange={handleInputChange}
          />
          <span className="badge-outline badge-primary">&nbsp;Optional</span>
        </div>

        <div className="flex items-center mb-4">
          <span className="mr-2">
            <FaPhoneAlt />
          </span>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Your phone number"
            value={phoneNumber}
            onChange={handleInputChange}
          />
          <span className="badge-outline badge-primary">&nbsp;Optional</span>
        </div>

        <div className="mb-2">
          <button type="submit" className="btn mt-4" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        <div className="mb-2">
          <p>Already have an account?</p>
        </div>
        <Link to="/login" className="btn btn-active btn-secondary">
          Login
        </Link>
      </form>
    </div>
  );
}

export default SignupPage;
