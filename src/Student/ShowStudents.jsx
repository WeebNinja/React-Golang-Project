import React, { useState, useEffect } from "react";
import EditStudents from "./EditStudents";
import DeleteStudents from "./DeleteStudents";
import InsertStudents from "./InsertStudents";
import { HiPencilAlt, HiPlusCircle, HiSearch, HiTrash } from "react-icons/hi"; // เพิ่มไอคอนแบบตัวอักษรสำเร็จรูป

const ShowStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentIDToDelete, setStudentIDToDelete] = useState(null);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State เก็บหน้าปัจจุบัน
  const [studentsPerPage, setStudentsPerPage] = useState(10); // State เก็บจำนวนนักเรียนต่อหน้า
  const [searchTerm, setSearchTerm] = useState(""); // State เก็บคำค้นหา

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/students");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleDelete = (studentID) => {
    setStudentIDToDelete(studentID);
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

  const filteredStudents = students.filter((student) => {
    return (
      student.ID.toString().includes(searchTerm) ||
      student.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.Age.toString().includes(searchTerm) ||
      student.Grade.toString().includes(searchTerm)
    );
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredStudents.length / studentsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">รายชื่อนักเรียน</h1>
      <div className="flex items-center border border-gray-300 rounded p-1 mb-5">
        <input
          type="text"
          placeholder="ค้นหาตามรหัส, ชื่อ, นามสกุล, อายุ, ระดับชั้น"
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
        เพิ่ม
      </button>
      {isLoading && <p className="text-gray-600">กำลังโหลด...</p>}
      {error && <p className="text-red-600">ข้อผิดพลาด: {error}</p>}
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ชื่อ</th>
            <th className="border p-2">นามสกุล</th>
            <th className="border p-2">อายุ</th>
            <th className="border p-2">เกรด</th>
            <th className="border p-2">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.ID} className="text-center">
              <td className="border p-2">{student.FirstName}</td>
              <td className="border p-2">{student.LastName}</td>
              <td className="border p-2">{student.Age}</td>
              <td className="border p-2">{student.Grade}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(student)}
                >
                  <HiPencilAlt className="inline-block w-4 h-4 mr-1" /> แก้ไข
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(student.ID)}
                >
                  <HiTrash className="inline-block w-4 h-4 mr-1" /> ลบ
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
        <EditStudents
          student={selectedStudent}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteStudents
          studentID={studentIDToDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      {showInsertModal && (
        <InsertStudents onClose={() => setShowInsertModal(false)} />
      )}
    </div>
  );
};

export default ShowStudents;
