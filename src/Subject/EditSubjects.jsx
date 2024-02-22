import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const EditSubjects = ({ subject, onClose }) => {
  const [editedSubject, setEditedSubject] = useState(subject);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSubject({
      ...editedSubject,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/subjects/${subject.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedSubject),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedSubject = await response.json();
      console.log("ข้อมูลวิชาที่อัปเดต:", updatedSubject);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("ข้อผิดพลาดในการอัปเดตวิชา:", error.message);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-8 rounded-md">
          <h2 className="text-2xl font-bold mb-4">แก้ไขวิชา</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="Name" className="block font-semibold mb-1">
                ชื่อ:
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={editedSubject.Name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="Description" className="block font-semibold mb-1">
                คำอธิบาย:
              </label>
              <textarea
                id="Description"
                name="Description"
                value={editedSubject.Description}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full min-h-10 max-h-32 resize-y"
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

export default EditSubjects;
