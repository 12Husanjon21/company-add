import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://45.138.158.137:92/api/auths/sign-in",
        {
          login,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          alert("Muvaffaqiyatli kirildi! 🚀");
          navigate("/dashboard"); // Kirgandan keyin boshqa sahifaga o'tish
        } else {
          alert("Token olinmadi, noto‘g‘ri javob qaytdi!");
        }
      }
    } catch (error) {
      alert("Login yoki parol noto‘g‘ri!");
      console.error("Login xatosi:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center backimg">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Вход</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="login"
            >
              Логин
            </label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
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
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex flex-col gap-y-6 justify-between">
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Регистрация
            </Link>
            <div className="flex justify-center border-t-[1px] border-gray-300 pt-3">
              <button
                type="submit"
                className="bg-[#7CB305] hover:bg-[#96bb6c] cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? "Bходит..." : "Вход"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
