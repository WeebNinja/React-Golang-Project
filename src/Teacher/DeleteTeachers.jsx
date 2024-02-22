import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const DeleteTeachers = ({ onClose, teacherID }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/teachers/${teacherID}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("ลบครูเรียบร้อยแล้ว");
      setIsDeleted(true);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบครู:", error.message);
    }
  };

  const handleCloseModal = () => {
    setIsDeleted(false);
    onClose();
    window.location.reload();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-8 rounded-md">
          <h2 className="text-2xl font-bold mb-4">ลบครู</h2>
          <p className="mb-4">คุณแน่ใจหรือไม่ว่าต้องการลบครูนี้?</p>
          <div className="flex justify-end">
            <button
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              ลบ
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>

      {isDeleted && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md flex flex-col items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-5xl text-green-500 mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">สำเร็จ!</h2>
            <p className="text-lg">ครูถูกลบออกแล้ว</p>
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

export default DeleteTeachers;
