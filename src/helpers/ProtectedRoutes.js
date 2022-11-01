import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const loggedIn = localStorage.getItem("token");
    return loggedIn;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
  return isAuth ? <Outlet/> : <Navigate to="/signin"/>
};

export default ProtectedRoutes;
