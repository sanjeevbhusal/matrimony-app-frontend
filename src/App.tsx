import { Route, Routes } from "react-router-dom";
import { SignupPage } from "./routes/signup/SignupPage";
import { LoginPage } from "./routes/login/LoginPage";
import { LandingPage } from "./routes/landing/LandingPage";
import { OnboardingPage } from "./routes/onboarding/OnboardingPage";
import { PublicRoute } from "./layouts/PublicRoute";
import { PrivateRoute } from "./layouts/PrivateRoute";
import { AuthenticationProvider } from "./context/authenticationContext";
import { ResetPasswordPage } from "./routes/resetPassword/ResetPasswordPage";
import { ForgotPassword } from "./routes/forgot-password/ForgotPassword";

function App() {
  return (
    <AuthenticationProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route
            path="/dashboard"
            element={<h1>This is dashboard page</h1>}
          ></Route>
        </Route>
      </Routes>
    </AuthenticationProvider>
  );
}

export default App;
