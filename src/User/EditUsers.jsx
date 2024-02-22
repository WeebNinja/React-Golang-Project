import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const EditUsers = ({ user, onClose }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedUser = await response.json();
      console.log("ข้อมูลผู้ใช้ที่อัปเดต:", updatedUser);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตผู้ใช้:", error.message);
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
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-8 rounded-md">
          <h2 className="text-2xl font-bold mb-4">แก้ไขผู้ใช้</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="Name" className="block font-semibold mb-1">
                ชื่อ:
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={editedUser.Name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="Email" className="block font-semibold mb-1">
                อีเมล:
              </label>
              <input
                type="Email"
                id="Email"
                name="Email"
                value={editedUser.Email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="Password" className="block font-semibold mb-1">
                รหัสผ่าน:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} 
                  id="Password"
                  name="Password"
                  value={editedUser.Password}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full pr-10"
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                บันทึก
              </button>
              <button
                type="button"
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
            <p className="text-lg">ข้อมูลได้รับการอัปเดตเรียบร้อยแล้ว</p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUsers;