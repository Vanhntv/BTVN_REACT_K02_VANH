import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerAuth } from "../../api/apiAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const payload = {
        userName: data.userName,
        email: data.email,
        password: data.password,
      };
      await registerAuth(payload);
      toast.success("Đăng ký thành công!");
      nav("/auth/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-pink-200">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8 drop-shadow-md">
          Tạo tài khoản mới
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            type="text"
            placeholder="Tên người dùng"
            {...register("userName", { required: "Tên không được để trống" })}
            className="w-full px-4 py-3 rounded-2xl border border-pink-300 bg-white/60 placeholder-pink-400 focus:ring-2 focus:ring-pink-300 outline-none transition"
          />
          {errors.userName && (
            <p className="text-red-500 text-sm">{errors.userName.message}</p>
          )}

          <input
            type="email"
            placeholder="Email của bạn"
            {...register("email", { required: "Email không được để trống" })}
            className="w-full px-4 py-3 rounded-2xl border border-pink-300 bg-white/60 placeholder-pink-400 focus:ring-2 focus:ring-pink-300 outline-none transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
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
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            {...register("confirmPassword", {
              required: "Xác nhận mật khẩu không được để trống",
              validate: (val) =>
                val === watch("password") || "Mật khẩu không khớp",
            })}
            className="w-full px-4 py-3 rounded-2xl border border-pink-300 bg-white/60 placeholder-pink-400 focus:ring-2 focus:ring-pink-300 outline-none transition"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 text-pink-600 rounded border-gray-300 focus:ring-pink-300"
            />
            <span className="ml-2 text-gray-700 text-sm">
              Tôi đồng ý với{" "}
              <Link to="/term-policy" className="text-pink-600 hover:underline">
                điều khoản
              </Link>
            </span>
          </div>

          <button
            type="submit"
            disabled={!agree || submitting}
            className={`w-full py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-md transition-all duration-300 ${
              !agree || submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          <p className="text-center text-gray-500 mt-4 text-sm">
            Đã có tài khoản?{" "}
            <Link
              to="/auth/login"
              className="text-pink-600 font-medium hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
