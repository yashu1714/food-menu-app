import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfileMenu = ({ theme, toggleTheme }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <button className="nav-btn" onClick={() => setOpen(!open)}>
        👤 Profile
      </button>
      <div className={`profile-dropdown ${open ? "show" : ""}`}>

        {user && (
          <div className="profile-user">
            <img
              src={user.photoURL || "https://i.pravatar.cc/100"}
              alt="avatar"
              className="profile-avatar"
            />
            <p className="profile-email" title={user.email}>
              {user.email}
            </p>
          </div>
        )}
        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        {user && (
          <>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link to="/favorites" onClick={() => setOpen(false)}>
              Favorites ❤️
            </Link>

            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {!user && (
          <Link to="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
