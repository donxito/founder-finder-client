import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function GoogleAuthCallback() {
  const navigate = useNavigate();
  const { storeToken, googleAuthenticateUser } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      storeToken(token);
      googleAuthenticateUser();
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, storeToken, googleAuthenticateUser]);

  return <div>Loading...</div>;
}

export default GoogleAuthCallback;
