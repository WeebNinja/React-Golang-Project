import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const EditStudents = ({ student, onClose }) => {
  const [editedStudent, setEditedStudent] = useState(student);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for showing success modal

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
      // Assuming the server responds with the updated student data,
      // you can retrieve it and handle it accordingly
      const updatedStudent = await response.json();
      console.log("Updated student data:", updatedStudent);
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error("Error updating student:", error.message);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false); // Close the success modal
    window.location.reload(); // Reload the page
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-8 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block font-semibold mb-1">
                First Name:
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
                Last Name:
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
                Age:
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
                Grade:
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

export default EditStudents;
