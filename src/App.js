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
import Navbar from "./layouts/NavBar/Navbar";
import Landing from "./views/Landing/Landing";
import WapButton from "./components/WapButton/WapButton";
import Separador from "./components/Separador/Separador";
import Footer from "./components/Footer/Footer";

function AppWrapper() {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
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
