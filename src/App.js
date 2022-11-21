import SignUp from "./views/SignUp/SignUp";
import SignIn from "./views/SignIn/SignIn";
import Profile from "./views/Profile/Profile";
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar1 from "./layouts/NavBar/NavBar1";
import Landing from "./views/Landing/Landing";
import WapButton from "./components/WapButton/WapButton";
import Separador from "./components/Separador/Separador";
import Footer from "./components/Footer/Footer";
import Clases from "./views/Clases/Clases";
import ProtectedRoutes from "./helpers/ProtectedRoutes";
import Rutina from "./views/Rutina/Rutina";
import RegistroStaff from "./views/RegistroStaff/RegistroStaff";
import GruposMusculares from "./views/GruposMusculares/GruposMusculares";

function AppWrapper() {
  return (
    <div>
      <div>
        <NavBar1/>
      </div>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/clases" element={<Clases />} />
          <Route element={<ProtectedRoutes />}>
              <Route path="/profile/" element={<Profile />} />
              <Route path="/rutina/" element={<Rutina />} />
              <Route path="/registro-staff/" element={<RegistroStaff />} />
              <Route path="/grupos-musculares/" element={<GruposMusculares />} />
            </Route>
        </Routes>
      </Container>
      <WapButton />
      <Separador />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div>
      <Router>
        <AppWrapper />
      </Router>
    </div>
  );
}

export default App;
