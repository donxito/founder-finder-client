/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/auth.service";
import { FaEnvelope, FaLock, FaUserCircle, FaInfoCircle, FaUser, FaPhoneAlt } from 'react-icons/fa';



function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const navigate = useNavigate();


  const handleEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail((event.target as HTMLInputElement).value);
  };
  const handlePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword((event.target as HTMLInputElement).value);
  };
  const handleName = (event: React.FormEvent<HTMLInputElement>) => {
    setName((event.target as HTMLInputElement).value);
  };
  const handleUsername = (event: React.FormEvent<HTMLInputElement>)=> {
    setUsername((event.target as HTMLInputElement).value);
  }
  const handleAbout = (event: React.FormEvent<HTMLInputElement>) => {
    setAbout((event.target as HTMLInputElement).value);
  }

  const handlePhoneNumber = (event: React.FormEvent<HTMLInputElement>) => {
    setPhoneNumber((event.target as HTMLInputElement).value);
  }

  const handleSignupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Send the requestBody object to the backend
    const requestBody = {
      email: email,
      password: password,
      name: name,
      username: username || undefined,  // Send username only if it is provided
      about: about || undefined,         // Send about only if it is provided
      phoneNumber: phoneNumber || undefined,
    };

    authService
      .signup(requestBody) 
      .then((response) => {
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      });
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
            onChange={handleEmail}
          
        />
        </div>

        <div className="flex items-center mb-4">
        <span className="mr-2">
          <FaLock/>
          </span>
        <input
            type="password"
            name="password"
            placeholder="******"
            value={password}
            onChange={handlePassword}
           
        />
        </div>

        <div className="flex items-center mb-4">
        <span className="mr-2">
          <FaUserCircle/>
          </span>
        <input
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={handleName}
            
        />
        </div>

          <div className="flex items-center mb-4">
        <span className="mr-2">
          <FaUser/>
          </span>
        <input
            type="text"
            name="username"
            placeholder="Your username"
            value={username}
            onChange={handleUsername}
        />
        <span className="badge-outline badge-primary">&nbsp;Optional</span>
        </div>

        <div className="flex items-center mb-4">
        <span className="mr-2">
          <FaInfoCircle/>
          </span>
        <input
            type="text"
            name="about"
            placeholder="About you"
            value={about}
            onChange={handleAbout}
          />
          <span className="badge-outline badge-primary">&nbsp;Optional</span>
          </div>

          <div className="flex items-center mb-4">
        <span className="mr-2">
          <FaPhoneAlt/>
          </span>
        <input
            type="number"
            name="phoneNumber"
            placeholder="Your phone number"
            value={phoneNumber}
            onChange={handlePhoneNumber}
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