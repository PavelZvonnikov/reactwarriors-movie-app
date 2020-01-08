import React from "react";

import { Login } from "./Login/Login";
import { User } from "./User";

export const Header = ({ updateUser, user, updateSessionID }) => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a href="#" className="nav-link">
              Home
            </a>
          </li>
        </ul>
        {user ? (
          <User user={user} />
        ) : (
          <Login updateUser={updateUser} updateSessionID={updateSessionID} />
        )}
      </div>
    </nav>
  );
};
