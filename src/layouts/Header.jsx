import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-xl font-medium transition-colors ${
      location.pathname === path
        ? "bg-pink-500 text-white shadow-md"
        : "text-pink-600 hover:bg-pink-100"
    }`;

  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (!confirmed) return;

    localStorage.clear();
    sessionStorage.clear();

    toast.success("Đăng xuất thành công");

    navigate("/auth/login");
  };

  return (
    <header className="bg-pink-50 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-2xl font-bold text-pink-600 tracking-wide">
          🌸 Vanhhh Todo
        </div>

        <nav>
          <ul className="flex space-x-3">
            <li>
              <Link to="/" className={linkClass("/")}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/todos" className={linkClass("/todos")}>
                Công việc
              </Link>
            </li>
            <li>
              <Link to="/important" className={linkClass("/important")}>
                Quan trọng
              </Link>
            </li>
            <li>
              <Link to="/admin/todos" className={linkClass("/admin/todos")}>
                ADMIN
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className=" text-pink-600 hover:text-pink-700 transition-colors duration-200"
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
