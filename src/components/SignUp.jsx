import React, { useState } from "react";
import { Link } from "react-router-dom"; // react-router to'g'ri bo'lishi kerak
import axios from "axios";

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    login: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://45.138.158.137:92/api/auths/sign-up",
        formData,
        {
          headers: {
            "Content-Type": "text/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Token:", response.data.token);
        localStorage.setItem("token", response.data.token); // Tokenni saqlash
        alert("Ro'yxatdan o'tish muvaffaqiyatli!");
      } else {
        setError("Ro'yxatdan o'tishda xatolik yuz berdi.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Tarmoq xatosi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen backimg">
      <div className="bg-white px-8 py-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Регистрация</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Ф.И.О
            </label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Введите Ф.И.О"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="login"
            >
              Логин
            </label>
            <input
              id="login"
              type="text"
              value={formData.login}
              onChange={handleChange}
              placeholder="Введите логин"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex flex-col gap-y-6 justify-between">
            <Link
              to="/signin"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Вход
            </Link>
            <div className="flex justify-center border-t-[1px] border-gray-300 pt-3">
              <button
                type="submit"
                className={`bg-[#7CB305] hover:bg-[#96bb6c] cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Yuklanmoqda..." : "Регистрировать"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
