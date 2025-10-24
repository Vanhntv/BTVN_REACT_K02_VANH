import { Children, Component } from "react";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LayoutAuth from "../layouts/LayoutAuth";
import AuthRoute from "./protectedRoute/AuthRoute";

const authRoutes = [
  {
    path: "auth",
    element: (
      <AuthRoute>
        <LayoutAuth />
      </AuthRoute>
    ),
    children: [
      { path: "register", Component: RegisterPage },
      { path: "login", Component: LoginPage },
    ],
  },
];

export default authRoutes;
