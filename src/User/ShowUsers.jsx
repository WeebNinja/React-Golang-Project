import React, { useState, useEffect } from "react";

import { HiPencilAlt, HiPlusCircle, HiSearch, HiTrash } from "react-icons/hi";
import InsertUsers from "./InsertUsers";
import EditUsers from "./EditUsers";
import DeleteUsers from "./DeleteUsers";

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIDToDelete, setUserIDToDelete] = useState(null);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = (userEmail) => {
    setUserIDToDelete(userEmail);
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

  const filteredUsers = users.filter((user) => {
    return (
      user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">รายชื่อผู้ใช้</h1>
      <div className="flex items-center border border-gray-300 rounded p-1 mb-5">
        <input
          type="text"
          placeholder="ค้นหาตามชื่อหรืออีเมล"
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
            <th className="border p-2">อีเมล</th>
            <th className="border p-2">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.ID} className="text-center">
              <td className="border p-2">{user.Name}</td>
              <td className="border p-2">{user.Email}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(user)}
                >
                  <HiPencilAlt className="inline-block w-4 h-4 mr-1" /> แก้ไข
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(user.Email)}
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
        <EditUsers
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteUsers
          userEmail={userIDToDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      {showInsertModal && (
        <InsertUsers onClose={() => setShowInsertModal(false)} />
      )}
    </div>
  );
};

export default ShowUser;
