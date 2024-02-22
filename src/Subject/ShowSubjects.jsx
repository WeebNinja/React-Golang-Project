import React, { useState, useEffect } from "react";

import { HiPencilAlt, HiPlusCircle, HiSearch, HiTrash } from "react-icons/hi";
import InsertSubjects from "./InsertSubjects";
import EditSubjects from "./EditSubjects";
import DeleteSubjects from "./DeleteSubjects";

const ShowSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subjectIDToDelete, setSubjectIDToDelete] = useState(null);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectsPerPage, setSubjectsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/subjects");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setShowEditModal(true);
  };

  const handleDelete = (subjectID) => {
    setSubjectIDToDelete(subjectID);
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

  const filteredSubjects = subjects.filter((subject) => {
    return (
      subject.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastSubject = currentPage * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const currentSubjects = filteredSubjects.slice(
    indexOfFirstSubject,
    indexOfLastSubject
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredSubjects.length / subjectsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">รายการวิชา</h1>
      <div className="flex items-center border border-gray-300 rounded p-1 mb-5">
        <input
          type="text"
          placeholder="ค้นหาด้วยชื่อหรือคำอธิบาย"
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
        <HiPlusCircle className="inline-block w-4 h-4 mr-1" /> เพิ่ม
      </button>
      {isLoading && <p className="text-gray-600">กำลังโหลด...</p>}
      {error && <p className="text-red-600">ข้อผิดพลาด: {error}</p>}
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ชื่อ</th>
            <th className="border p-2">คำอธิบาย</th>
            <th className="border p-2">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {currentSubjects.map((subject) => (
            <tr key={subject.ID} className="text-center">
              <td className="border p-2">{subject.Name}</td>
              <td className="border p-2">{subject.Description}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(subject)}
                >
                  <HiPencilAlt className="inline-block w-4 h-4 mr-1" /> แก้ไข
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(subject.ID)}
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
        <EditSubjects
          subject={selectedSubject}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteSubjects
          subjectID={subjectIDToDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      {showInsertModal && (
        <InsertSubjects onClose={() => setShowInsertModal(false)} />
      )}
    </div>
  );
};

export default ShowSubjects;
