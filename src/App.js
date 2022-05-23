import logo from './logo.svg';
import './App.css';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import Profile from './views/Profile/Profile';
import HomePage from './views/HomePage/HomePage';
import { Navigate, Route, Outlet, Routes, BrowserRouter as Router } from "react-router-dom";

function AppWrapper() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AppWrapper />
      </Router>
    </div>
  );
}

export default App;
