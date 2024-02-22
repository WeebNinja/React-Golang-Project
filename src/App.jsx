import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import React from "react";
import ShowStudents from "./Student/ShowStudents";
import Navbar from "./Navbar/Navbar";
import ShowUser from "./User/ShowUsers";
import ShowTeachers from "./Teacher/ShowTeachers";
import ShowSubjects from "./Subject/ShowSubjects";
import ShowDashboard from "./Dashboard/ShowDashboard";
import Register from "./Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/showstudents/*"
          element={
            <>
              <Navbar />
              <ShowStudents />
            </>
          }
        />
        <Route
          path="/showusers/*"
          element={
            <>
              <Navbar />
              <ShowUser />
            </>
          }
        />
        <Route
          path="/showteachers/*"
          element={
            <>
              <Navbar />
              <ShowTeachers />
            </>
          }
        />
        <Route
          path="/showsubjects/*"
          element={
            <>
              <Navbar />
              <ShowSubjects />
            </>
          }
        />
        <Route
          path="/Showdashboard/*"
          element={
            <>
              <Navbar />
              <ShowDashboard />
            </>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
