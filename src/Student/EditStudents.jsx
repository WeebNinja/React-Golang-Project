import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const EditStudents = ({ student, onClose }) => {
  const [editedStudent, setEditedStudent] = useState(student);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State สำหรับแสดงโมดัลสำเร็จ

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({
      ...editedStudent,
      [name]: name === "Age" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/students/${student.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedStudent),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // ถ้าเซิร์ฟเวอร์ตอบกลับด้วยข้อมูลนักเรียนที่อัปเดตแล้ว
      // คุณสามารถดึงข้อมูลและจัดการตามที่เหมาะสม
      const updatedStudent = await response.json();
      console.log("ข้อมูลนักเรียนที่อัปเดต:", updatedStudent);
      setShowSuccessModal(true); // แสดงโมดัลสำเร็จ
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตนักเรียน:", error.message);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false); // ปิดโมดัลสำเร็จ
    window.location.reload(); // รีโหลดหน้า
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-8 rounded-md">
          <h2 className="text-2xl font-bold mb-4">แก้ไขนักเรียน</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block font-semibold mb-1">
                ชื่อ:
              </label>
              <input
                type="text"
                id="firstName"
                name="FirstName"
                value={editedStudent.FirstName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block font-semibold mb-1">
                นามสกุล:
              </label>
              <input
                type="text"
                id="lastName"
                name="LastName"
                value={editedStudent.LastName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block font-semibold mb-1">
                อายุ:
              </label>
              <input
                type="number"
                id="age"
                name="Age"
                value={editedStudent.Age}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="grade" className="block font-semibold mb-1">
                เกรด:
              </label>
              <input
                type="text"
                id="grade"
                name="Grade"
                value={editedStudent.Grade}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
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

export default EditStudents;
