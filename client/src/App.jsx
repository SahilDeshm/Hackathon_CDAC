import React from "react";
import { BrowserRouter as Router ,  Routes , Route   } from "react-router-dom";
import Home from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login1";
import ShiftingContactForm from "./pages/Create_Review";
import FlipNavWrapper from "./Navbar/Navbar";
function App() {
     return(
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/create_review" element={<ShiftingContactForm />}/>
          <Route path = "/register" element={<Register/>} /> 
          <Route path = "/home" element={<FlipNavWrapper/>} /> 
        </Routes>
      </Router>
     )
}

export default App
