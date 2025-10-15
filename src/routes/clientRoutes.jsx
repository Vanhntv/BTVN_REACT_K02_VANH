import LayoutClient from "../layouts/LayoutClient";
import HomePage from "../pages/client/HomePage";
import TodosDetailPage from "../pages/client/TodosDetailPage";
import ImportantPage from "../pages/client/ImportantPage";
import { Navigate } from "react-router-dom";

const clientRoutes = [
  {
    path: "/",
    Component: LayoutClient,
    children: [
      { index: true, element: <Navigate to={"/todos"} /> },
      { path: "todos", Component: HomePage },
      // Dynamic route
      { path: "todos/:id", Component: TodosDetailPage },
      { path: "important", Component: ImportantPage },
    ],
  },
];

{
  /* <LayoutClient>
    <HomePage />
</LayoutClient> */
}
export default clientRoutes;
screenX;