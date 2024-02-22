import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // นำเข้า Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State เพื่อแสดง/ซ่อนรหัสผ่าน
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression for validating email
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    if (!validateEmail(email)) {
      setError("รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/users", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setShowSuccessModal(true);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น");
      } else {
        console.error("Error:", error);
        setError("Failed to register. Please try again.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Register
        </h1>
        <form>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              ชื่อ
            </label>
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="กรอกชื่อของคุณ"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 pr-10"
                placeholder="กรอกรหัสผ่านของคุณ"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye} // ใช้ไอคอนแสดง/ซ่อนรหัสผ่าน
                className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full hover:bg-blue-700"
            onClick={handleRegister}
          >
            Register
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <div className="text-center mt-4">
          <p>
            มีบัญชีอยู่แล้ว?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              เข้าสู่ระบบ
            </Link>
          </p>{" "}
          {/* เพิ่มลิงก์ไปยังหน้าเข้าสู่ระบบ */}
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-md flex flex-col items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-5xl text-green-500 mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">การสมัครสมาชิกสำเร็จ</h2>
            <p className="text-lg">บัญชีของคุณถูกสร้างเรียบร้อยแล้ว</p>
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

export default Register;
