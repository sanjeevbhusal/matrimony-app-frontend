import { Route, Routes } from "react-router-dom";
import SignupPage from "./routes/signup/SignupPage";
import LoginPage from "./routes/login/LoginPage";
import { LandingPage } from "./routes/landing/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
