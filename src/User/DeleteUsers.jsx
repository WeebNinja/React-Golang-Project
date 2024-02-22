import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const DeleteUsers = ({ onClose, userEmail }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userEmail}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("ผู้ใช้ถูกลบเรียบร้อยแล้ว");
      setIsDeleted(true);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบผู้ใช้:", error.message);
    }
  };

  const handleOKClick = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-md flex flex-col items-center">
        {isDeleted ? (
          <>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-5xl text-green-500 mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">ลบแล้ว!</h2>
            <p className="text-lg">ผู้ใช้ถูกลบเรียบร้อยแล้ว</p>
            <button
              onClick={handleOKClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              ตกลง
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">ยืนยันการลบ</h2>
            <p className="text-lg mb-4">
              คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                ยืนยัน
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                ยกเลิก
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteUsers;
