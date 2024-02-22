import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faGraduationCap,
  faChalkboardTeacher,
  faEnvelope,
  faSignOutAlt,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({}) => {
  let Links = [
    { name: "HOME", link: "/ShowDashboard", icon: faHome },
    { name: "USERS", link: "/ShowUsers", icon: faUsers },
    { name: "STUDENTS", link: "/ShowStudents", icon: faGraduationCap },
    { name: "SUBJECTS", link: "/ShowSubjects", icon: faSitemap },
    { name: "TEACHERS", link: "/ShowTeachers", icon: faChalkboardTeacher },
  ];
  let [open, setOpen] = useState(false);
  let [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    // Show logout confirmation modal
    setShowModal(true);
  };

  const handleLogoutConfirm = () => {
    // Redirect to home page
    window.location.href = "/";
  };

  const handleLogoutCancel = () => {
    // Close the logout confirmation modal
    setShowModal(false);
  };

  return (
    <div className="shadow-md w-full top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* logo section */}
        <Link to="/ShowDashboard">
          <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
            <span>SCHOOL</span>
          </div>
        </Link>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        ></div>
        {/* link items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li
              className="md:ml-8 md:my-0 my-7 font-semibold flex items-center"
              key={link.name}
            >
              <Link
                to={link.link}
                className="text-gray-800 hover:text-blue-400 duration-500 flex items-center"
              >
                <FontAwesomeIcon icon={link.icon} className="mr-2" />
                {link.name}
              </Link>
            </li>
          ))}
          <li className="md:ml-8 md:my-0 my-7 font-semibold">
            <button
              onClick={handleLogout}
              className="btn bg-red-500 text-white py-2 px-2 font-bold rounded"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleLogoutConfirm}
                className="btn bg-red-500 text-white py-2 px-4 font-bold rounded mr-4"
              >
                Logout
              </button>
              <button
                onClick={handleLogoutCancel}
                className="btn bg-gray-300 text-gray-800 py-2 px-4 font-bold rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
