import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State เพื่อกำหนดการแสดงรหัสผ่าน
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setShowSuccessModal(true);
      } else {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้ง");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้ง");
      } else {
        console.error("เกิดข้อผิดพลาด:", error);
        setError("การยืนยันตัวตนล้มเหลว โปรดลองอีกครั้ง");
      }
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/ShowDashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <img
          src="https://img.freepik.com/free-vector/cute-cat-computer-cartoon-icon-illustration-animal-technology-icon-concept-isolated-flat-cartoon-style_138676-2929.jpg"
          alt="Computer"
          className="mx-auto mb-4 rounded-full w-64 h-64"
        />
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          เข้าสู่ระบบ
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              อีเมล
            </label>
            <input
              type="email"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="กรอกอีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              รหัสผ่าน
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="กรอกรหัสผ่านของคุณ"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full hover:bg-blue-700"
            onClick={handleLogin}
          >
            เข้าสู่ระบบ
          </button>
          <p className="text-center mt-4">
            ยังไม่มีบัญชี?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              ลงทะเบียนที่นี่
            </Link>
          </p>
        </form>
      </div>
      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-md flex flex-col items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-5xl text-green-500 mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">เข้าสู่ระบบสำเร็จ</h2>
            <p className="text-lg">คุณเข้าสู่ระบบเรียบร้อยแล้ว</p>
            <button
              onClick={handleCloseModal}
              className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
