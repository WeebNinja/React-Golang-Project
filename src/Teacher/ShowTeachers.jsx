import React, { useState, useEffect } from "react";
import { HiPencilAlt, HiPlusCircle, HiSearch, HiTrash } from "react-icons/hi"; // เพิ่มไอคอนแบบตัวอักษรสำเร็จรูป
import InsertTeachers from "./InsertTeachers";
import EditTeachers from "./EditTeachers";
import DeleteTeachers from "./DeleteTeachers";

const ShowTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teacherIDToDelete, setTeacherIDToDelete] = useState(null);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State เก็บหน้าปัจจุบัน
  const [teachersPerPage, setTeachersPerPage] = useState(10); // State เก็บจำนวนครูต่อหน้า
  const [searchTerm, setSearchTerm] = useState(""); // State เก็บคำค้นหา

  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://localhost:5000/teachers");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setShowEditModal(true);
  };

  const handleDelete = (teacherID) => {
    setTeacherIDToDelete(teacherID);
    setShowDeleteModal(true);
  };

  const handleInsert = () => {
    setShowInsertModal(true);
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      teacher.ID.toString().includes(searchTerm) ||
      teacher.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.Age.toString().includes(searchTerm) ||
      teacher.Subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredTeachers.length / teachersPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Teachers List</h1>
      <div className="flex items-center border border-gray-300 rounded p-1 mb-5">
        <input
          type="text"
          placeholder="Search by ID, First Name, Last Name, Age, Subject"
          className="p-2 flex-1 outline-none"
          value={searchTerm}
          onChange={handleSearch}
        />
        <HiSearch className="w-8 h-8 mr-1" />
      </div>

      <button
        onClick={handleInsert}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        <HiPlusCircle className="inline-block w-4 h-4 mr-1" />
        Insert
      </button>
      {isLoading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTeachers.map((teacher) => (
            <tr key={teacher.ID} className="text-center">
              <td className="border p-2">{teacher.FirstName}</td>
              <td className="border p-2">{teacher.LastName}</td>
              <td className="border p-2">{teacher.Age}</td>
              <td className="border p-2">{teacher.Subject}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(teacher)}
                >
                  <HiPencilAlt className="inline-block w-4 h-4 mr-1" /> Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(teacher.ID)}
                >
                  <HiTrash className="inline-block w-4 h-4 mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => changePage(number)}
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
              currentPage === number && "bg-gray-400"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      {showEditModal && (
        <EditTeachers
          teacher={selectedTeacher}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteTeachers
          teacherID={teacherIDToDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      {showInsertModal && (
        <InsertTeachers onClose={() => setShowInsertModal(false)} />
      )}
    </div>
  );
};

export default ShowTeachers;
