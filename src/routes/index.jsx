import { createBrowserRouter, RouterProvider } from "react-router";
import clientRoutes from "./clientRoutes";
import NotFoundPage from "../pages/client/NotFoundPage";

let router = createBrowserRouter([
  // client routes
  ...clientRoutes,

  { path: "*", Component: NotFoundPage },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;