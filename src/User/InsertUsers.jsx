import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const InsertUsers = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("ผู้ใช้ใหม่ถูกเพิ่มเรียบร้อยแล้ว");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเพิ่มผู้ใช้ใหม่:", error.message);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-8 rounded-md">
          <h2 className="text-2xl font-bold mb-4">เพิ่มผู้ใช้</h2>
          <form onSubmit={handleInsert}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2">
                ชื่อ
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                อีเมล
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
              >
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border rounded-md px-4 py-2 w-full pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent border-transparent focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                เพิ่ม
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md flex flex-col items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-5xl text-green-500 mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">สำเร็จ!</h2>
            <p className="text-lg">เพิ่มข้อมูลสำเร็จ</p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InsertUsers;
