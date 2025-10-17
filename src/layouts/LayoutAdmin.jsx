import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, ListTodo, PlusCircle, LogOut } from "lucide-react";

const LayoutAdmin = () => {
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Công việc", icon: ListTodo, path: "/admin/todos" },
  ];

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn rời admin")) {
      navigate("/todos");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100">
      {/* SIDEBAR */}
      <aside className="w-64 p-4 flex flex-col gap-6 shadow-lg bg-white/80 backdrop-blur-md rounded-tr-3xl rounded-br-3xl m-2">
        <h1 className="text-2xl font-bold text-pink-600 text-center mb-4">
          🌸 Vanhhh Todo
        </h1>

        <nav className="flex flex-col gap-4">
          {menu.map(({ name, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `group flex flex-col items-center justify-center py-4 rounded-2xl shadow-md transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-pink-400 to-purple-300 text-white scale-105 shadow-lg"
                    : "bg-white text-pink-600 hover:bg-pink-50 hover:scale-105"
                }`
              }
            >
              <Icon className="w-6 h-6 mb-1 transition-transform group-hover:scale-125" />
              <span className="text-sm font-medium">{name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex flex-col items-center justify-center py-4 rounded-2xl bg-white text-pink-500 hover:bg-gradient-to-r hover:from-pink-300 hover:to-purple-300 hover:text-white shadow-md transition-all duration-300"
          >
            <LogOut className="w-6 h-6 mb-1" />
            <span className="text-sm font-medium">Về Client</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
