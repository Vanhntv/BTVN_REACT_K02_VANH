import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAuth } from "../../api/apiAuth";

const LoginPage = () => {
  const nav = useNavigate();
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await loginAuth({
        email: data.email,
        password: data.password,
      });

      const user = response.user || response.data?.user;
      const token = response.accessToken || response.data?.accessToken;

      if (!user || !token) throw new Error("Đăng nhập thất bại!");

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(user));
      storage.setItem("accessToken", token);

      toast.success("Đăng nhập thành công!");
      nav("/todos");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-pink-200">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8 drop-shadow-md">
          Đăng nhập
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            type="email"
            placeholder="Email của bạn"
            {...register("email", {
              required: "Email không được để trống",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không hợp lệ",
              },
            })}
            className="w-full px-4 py-3 rounded-2xl border border-pink-300 bg-white/60 placeholder-pink-400 focus:ring-2 focus:ring-pink-300 outline-none transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Mật khẩu"
            {...register("password", {
              required: "Mật khẩu không được để trống",
              minLength: { value: 6, message: "Mật khẩu >= 6 ký tự" },
              maxLength: { value: 20, message: "Mật khẩu <= 20 ký tự" },
            })}
            className="w-full px-4 py-3 rounded-2xl border border-pink-300 bg-white/60 placeholder-pink-400 focus:ring-2 focus:ring-pink-300 outline-none transition"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 text-pink-600 rounded border-gray-300 focus:ring-pink-300"
            />
            <span className="ml-2 text-gray-700 text-sm">
              Ghi nhớ đăng nhập
            </span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-md transition-all duration-300 ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <p className="text-center text-gray-500 mt-4 text-sm">
            Chưa có tài khoản?{" "}
            <Link
              to="/auth/register"
              className="text-pink-600 font-medium hover:underline"
            >
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
