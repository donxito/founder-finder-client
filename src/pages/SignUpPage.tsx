/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/auth.service";
import { FaEnvelope, FaLock, FaUserCircle, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';
import { FormField, Button, Form, Input, TextArea } from 'semantic-ui-react'

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
      // Create an object representing the request body
      const requestBody = {
        email,
        password,
        name,
        about: about || undefined, // Send about only if it is provided
        phoneNumber: phoneNumber || undefined,
      };
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
      await authService.signup(requestBody);
      setLoading(false);
      navigate("/login");
     } catch (error: any) {     
      setLoading(false);
      setError(error.response?.data.message);
    }
  };

  return (

    <div className="SignUpPage p-6 bg-white shadow-md rounded-md max-w-xl mx-auto my-20">
   <h1 className="text-2xl font-bold mb-7">Register</h1>
      <Form onSubmit={handleSignupSubmit}>
        
        <FormField className="flex items-center mb-4">
          <span className="mr-2">
            <FaEnvelope className="text-customBlue"/>
          </span>
          <Input
            type="text"
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField className="flex items-center mb-4">
          <span className="mr-2">
            <FaLock className="text-customBlue"/>
          </span>
          <Input
            type="password"
            name="password"
            placeholder="******"
            value={password}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField className="flex items-center mb-4">
          <span className="mr-2">
            <FaUserCircle className="text-customBlue"/>
          </span>
          <Input
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField className="flex items-center mb-4">
          <span className="mr-2">
            <FaInfoCircle className="text-customBlue" />
          </span>
          <Form>
          <TextArea
            name="about"
            placeholder="Write a short bio about yourself"
            rows={10}
            cols={60}
            value={about}
            onChange={handleInputChange}
          />
          </Form>
          <span className="badge-outline badge-primary ml-2">&nbsp;Optional</span>
        </FormField>
        

        <FormField className="flex items-center mb-4">
          <span className="mr-2">
            <FaPhoneAlt className="text-customBlue" />
          </span>
          <Input
            type="tel"
            name="phoneNumber"
            placeholder="Your phone number"
            value={phoneNumber}
            onChange={handleInputChange}
          />
          <span className="badge-outline badge-primary ml-2">&nbsp;Optional</span>
        </FormField>

        <div className="mb-2">
          <Button type="submit" className="btn mt-4" basic color="blue" content="Blue"  disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        <div className="mt-8">
          <p>Already have an account?</p>
        </div>
        <Link to="/login" className="btn btn-active btn-secondary hover:text-customCyan">
          Login 
        </Link>
      </Form>
    </div>

  );
}

export default SignupPage;
