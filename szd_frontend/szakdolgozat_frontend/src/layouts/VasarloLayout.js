import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VasarloLayout(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm !== "") {
      navigate(`/search/${searchTerm}`);
    }
  }, [searchTerm, navigate]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="ms-5 navbar-brand" href="/">
            LOGO
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="nav">
            <li className="nav-item ">
              <Link to="/" className="nav-link">
                Kezdőoldal
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/kategoriak" className="nav-link">
                Kategóriák
              </Link>
            </li>
            <input type="text" onKeyDown={(e) => e.key === "Enter" && navigate(`/search/${searchTerm}`)} onChange={e => setSearchTerm(e.target.value)} placeholder="Keresés" className="" />

            <li className="nav-item">
              <Link to="/felhasznalo" className="nav-link">
                Felhasználó
              </Link>
            </li>
            <li className="nav-item">
              {props.user.hozzaferes ? (
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              ) : (
                <Link to="/kosar" className="nav-link">
                  Kosár
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <article className="container">
        <Outlet />
      </article>
      <footer className="text-center pb-4 pt-2 bg-secondary-subtle">
        <p className="font-italic">
          Készítette: Kun-Székely Bence és Szendefi Krisztofer Dániel
        </p>
      </footer>
    </div>
  );
}

export default VasarloLayout;
