import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const EditTeachers = ({ teacher, onClose }) => {
  const [editedTeacher, setEditedTeacher] = useState({
    ...teacher,
    Age: parseInt(teacher.Age), // แปลงค่า Age เป็น integer เมื่อโหลดข้อมูลครั้งแรก
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "Age" ? parseInt(value) : value; // แปลงค่า Age เป็น integer เมื่อมีการเปลี่ยนแปลง
    setEditedTeacher({
      ...editedTeacher,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/teachers/${teacher.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedTeacher),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedTeacher = await response.json();
      console.log("Updated teacher data:", updatedTeacher);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating teacher:", error.message);
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
          <h2 className="text-2xl font-bold mb-4">Edit Teacher</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block font-semibold mb-1">
                First Name:
              </label>
              <input
                type="text"
                id="FirstName"
                name="FirstName"
                value={editedTeacher.FirstName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block font-semibold mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="LastName"
                name="LastName"
                value={editedTeacher.LastName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block font-semibold mb-1">
                Age:
              </label>
              <input
                type="number"
                id="Age"
                name="Age"
                value={editedTeacher.Age}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block font-semibold mb-1">
                Subject:
              </label>
              <input
                type="text"
                id="Subject"
                name="Subject"
                value={editedTeacher.Subject}
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
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
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
            <h2 className="text-2xl font-bold mb-4">Success!</h2>
            <p className="text-lg">Data has been updated successfully.</p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTeachers;
