import { Route, Routes } from "react-router-dom";
import { SignupPage } from "./routes/signup/SignupPage";
import { LoginPage } from "./routes/login/LoginPage";
import { LandingPage } from "./routes/landing/LandingPage";
import { OnboardingPage } from "./routes/onboarding/OnboardingPage";
import { UnprotectedRoute } from "./layouts/UnprotectedRoute";
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import { AuthenticationProvider } from "./context/authenticationContext";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <AuthenticationProvider>
      <UserProvider>
        <Routes>
          <Route element={<UnprotectedRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </AuthenticationProvider>
  );
}

export default App;
