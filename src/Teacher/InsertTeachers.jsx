import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const InsertTeachers = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    subject: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: name === "age" ? parseInt(value) : value,
    };
    setFormData(updatedFormData);
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("New teacher inserted successfully");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error inserting new teacher:", error.message);
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
          <h2 className="text-2xl font-bold mb-4">Insert Teacher</h2>
          <form onSubmit={handleInsert}>
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-sm font-bold mb-2"
              >
                First Name
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
                htmlFor="last_name"
                className="block text-sm font-bold mb-2"
              >
                Last Name
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
                Age
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
              <label htmlFor="subject" className="block text-sm font-bold mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
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
                Insert
              </button>
              <button
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
            <p className="text-lg">Data added successfully.</p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InsertTeachers;
