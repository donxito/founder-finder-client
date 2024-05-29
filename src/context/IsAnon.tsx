import { useContext } from "react";
import { AuthContext } from "./auth.context";
import { Navigate } from "react-router-dom";

type IsAnonProps = {
    children: React.ReactNode;
};
function IsAnon({children}: IsAnonProps) {

    const{isLoggedIn} = useContext(AuthContext);

    if (isLoggedIn) {
        return <Navigate to={`/`}/>;
    } else {
        return children;
    }

}

export default IsAnon;