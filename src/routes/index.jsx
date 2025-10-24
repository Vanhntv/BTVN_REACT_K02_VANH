import { createBrowserRouter, RouterProvider } from "react-router";
import clientRoutes from "./clientRoutes";
import NotFoundPage from "../pages/client/NotFoundPage";
import adminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";

let router = createBrowserRouter([
  // client routes
  ...clientRoutes,
  ...adminRoutes,
  ...authRoutes,
  { path: "*", Component: NotFoundPage },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;