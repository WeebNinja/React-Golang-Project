import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const InsertStudents = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    grade: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false); // State เพื่อควบคุมการแสดงโมดัลสำเร็จ

  const handleChange = (e) => {
    const { name, value } = e.target;
    // ตรวจสอบว่าฟิลด์เป็นอายุและแปลงค่าเป็นจำนวนเต็ม
    const newValue = name === "age" ? parseInt(value) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("เพิ่มนักเรียนใหม่เรียบร้อยแล้ว");
      setShowSuccessModal(true); // แสดงโมดัลสำเร็จเมื่อข้อมูลถูกเพิ่มเรียบร้อย
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเพิ่มนักเรียนใหม่:", error.message);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false); // ปิดโมดัลสำเร็จ
    window.location.reload(); // รีโหลดหน้า
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-8 rounded-md">
          <h2 className="text-2xl font-bold mb-4">เพิ่มนักเรียน</h2>
          <form onSubmit={handleInsert}>
            {/* ฟอร์มสำหรับการเพิ่มนักเรียนใหม่ */}
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block text-sm font-bold mb-2"
              >
                ชื่อ
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block text-sm font-bold mb-2"
              >
                นามสกุล
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-bold mb-2">
                อายุ
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="grade" className="block text-sm font-bold mb-2">
                เกรด
              </label>
              <input
                type="text"
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 w-full"
                required
              />
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
      {/* โมดัลสำเร็จ */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md flex flex-col items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-5xl text-green-500 mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">สำเร็จ!</h2>
            <p className="text-lg">เพิ่มข้อมูลเรียบร้อยแล้ว</p>
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

export default InsertStudents;
