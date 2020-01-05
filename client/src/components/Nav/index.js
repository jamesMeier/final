import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import AuthService from "../AuthService";
import { Link } from "react-router-dom";
import style from "./style.css";

function Nav() {
  const [store] = useStoreContext();

  const Auth = new AuthService();

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              Cart
            </Link>
          </li>
          <li className="nav-item">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a className="nav-link" href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
      <a className="navbar-brand" href="/">
        Bamazon 2.0 <sub>(Powered by Best Buy)</sub>
      </a>
      {showNavigation()}
      {store.loading ? (
        <a className="navbar-brand ml-auto">Loading...</a>
      ) : (
        <></>
      )}
    </nav>
  );
}

export default Nav;
