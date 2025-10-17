import LayoutAdmin from "../layouts/LayoutAdmin";
import ManageTodos from "../pages/admin/todos/ManageTodos";
import TodoForm from "../pages/admin/todos/TodoForm";

const adminRoutes = [
  {
    path: "admin",
    Component: LayoutAdmin,
    children: [
      { path: "todos", Component: ManageTodos },
      { path: "todos/add", Component: TodoForm },
      { path: "todos/update/:id", Component: TodoForm },
    ],
  },
];

export default adminRoutes;
