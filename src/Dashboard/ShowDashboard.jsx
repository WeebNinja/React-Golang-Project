import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGraduationCap,
  faBookOpen,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";

const ShowDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:5000/users");
        setUserCount(userResponse.data.length);

        const studentResponse = await axios.get(
          "http://localhost:5000/students"
        );
        setStudentCount(studentResponse.data.length);

        const subjectResponse = await axios.get(
          "http://localhost:5000/subjects"
        );
        setSubjectCount(subjectResponse.data.length);

        const teacherResponse = await axios.get(
          "http://localhost:5000/teachers"
        );
        setTeacherCount(teacherResponse.data.length);

        setLoading(false);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">แดชบอร์ด</h1>
      {loading ? (
        <p>กำลังโหลด...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Link to="/showusers" className="no-underline">
            <div className="bg-blue-200 p-4 rounded-md flex flex-col items-center justify-center shadow-md transform hover:scale-105 transition-transform duration-300">
              <FontAwesomeIcon icon={faUser} className="text-4xl mb-2" />
              <h2 className="text-xl font-bold mb-2">ผู้ใช้</h2>
              <p className="text-3xl font-bold">{userCount}</p>
            </div>
          </Link>
          <Link to="/showstudents" className="no-underline">
            <div className="bg-green-200 p-4 rounded-md flex flex-col items-center justify-center shadow-md transform hover:scale-105 transition-transform duration-300">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-4xl mb-2"
              />
              <h2 className="text-xl font-bold mb-2">นักเรียน</h2>
              <p className="text-3xl font-bold">{studentCount}</p>
            </div>
          </Link>
          <Link to="/showsubjects" className="no-underline">
            <div className="bg-yellow-200 p-4 rounded-md flex flex-col items-center justify-center shadow-md transform hover:scale-105 transition-transform duration-300">
              <FontAwesomeIcon icon={faBookOpen} className="text-4xl mb-2" />
              <h2 className="text-xl font-bold mb-2">วิชา</h2>
              <p className="text-3xl font-bold">{subjectCount}</p>
            </div>
          </Link>
          <Link to="/showteachers" className="no-underline">
            <div className="bg-red-200 p-4 rounded-md flex flex-col items-center justify-center shadow-md transform hover:scale-105 transition-transform duration-300">
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                className="text-4xl mb-2"
              />
              <h2 className="text-xl font-bold mb-2">ครู</h2>
              <p className="text-3xl font-bold">{teacherCount}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShowDashboard;
