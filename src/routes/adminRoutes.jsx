import LayoutAdmin from "../layouts/LayoutAdmin";
import ManageTodos from "../pages/admin/todos/ManageTodos";
import TodoForm from "../pages/admin/todos/TodoForm";
import PrivateRoute from "./protectedRoute/PrivateRoute";

const adminRoutes = [
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <LayoutAdmin />
      </PrivateRoute>
    ),
    children: [
      { path: "todos", Component: ManageTodos },
      { path: "todos/add", Component: TodoForm },
      { path: "todos/update/:id", Component: TodoForm },
    ],
  },
];

export default adminRoutes;
