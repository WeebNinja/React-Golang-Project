import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const InsertSubjects = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      const response = await fetch("http://localhost:5000/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("เพิ่มวิชาใหม่เรียบร้อยแล้ว");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("ข้อผิดพลาดในการเพิ่มวิชาใหม่:", error.message);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-8 rounded-md">
          <h2 className="text-2xl font-bold mb-4">เพิ่มวิชา</h2>
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
              <label
                htmlFor="description"
                className="block text-sm font-bold mb-2"
              >
                คำอธิบาย
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
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
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md flex flex-col items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-5xl text-green-500 mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">สำเร็จ!</h2>
            <p className="text-lg">ข้อมูลได้รับการเพิ่มเรียบร้อยแล้ว</p>
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

export default InsertSubjects;
