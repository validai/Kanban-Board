import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    setLoginCheck(!!auth.loggedIn());
  }, []);

  return (
    <div className="nav">
      <div className="nav-title">
        <Link to="/">Krazy Kanban Board</Link>
      </div>
      <ul>
        {loginCheck ? (
          <>
            <li className="nav-item">
              <button>
                <Link to="/login">Login</Link>
              </button>
            </li>
            <li className="nav-item">
              <button onClick={() => auth.logout()}>Logout</button>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default Navbar;