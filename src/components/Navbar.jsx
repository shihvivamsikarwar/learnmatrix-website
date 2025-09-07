import React, { useState, useEffect } from "react";
import "./Navbar.css";
import DarkModeToggle from "./DarkModeToggle";
import Dropdown from "./Dropdown";
import ScrollSpy from "./ScrollSpy";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const activeLink = ScrollSpy();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">Learnmatrix</div>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a
            href="#subjects"
            className={activeLink === "subjects" ? "active" : ""}
          >
            Subjects
          </a>
          <a
            href="#training"
            className={activeLink === "training" ? "active" : ""}
          >
            Training
          </a>
          <a href="#career" className={activeLink === "career" ? "active" : ""}>
            Career Hub
          </a>
          <Dropdown />
          <a
            href="#pricing"
            className={activeLink === "pricing" ? "active" : ""}
          >
            Pricing
          </a>

          {user ? (
            <>
              {user.photoURL && (
                <img src={user.photoURL} alt="User" className="user-avatar" />
              )}
              <span className="user-name">
                {user.displayName || user.email}
              </span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/signin")}>Sign In</button>
              <button onClick={() => navigate("/signup")}>Sign Up</button>
            </>
          )}

          <DarkModeToggle />
        </nav>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
