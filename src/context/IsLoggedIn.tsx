
import { useContext } from "react";
import { AuthContext } from "./auth.context";
import { Navigate } from "react-router-dom";

function IsLoggedIn({children}: React.PropsWithChildren<unknown>) {

    const{isLoggedIn} = useContext(AuthContext);


    // if the user is not logged in, redirect to login page
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    } else {  // else can stay
        return children;
    }

}

export default IsLoggedIn;

