import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { ProfileView } from "@/views/profile/ProfileView";

const LoginView = lazy(() => import("@/views/auth/LoginView"));
const RegisterView = lazy(() => import("@/views/auth/RegisterView"));
const HomeView = lazy(() => import("@/views/home/HomeView"));
const NotFoundView = lazy(() => import("@/views/not-found/NotFoundView"));

export const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomeView />} />
            <Route path="/profile/:username" element={<ProfileView />} />
          </Route>

          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
