import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

function VasarloLayout(props) {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light mb-5">
        <div className="container-fluid">
          <a className="ms-5 navbar-brand" href="/">
            LOGO
          </a>
          <button className="navbar-toggler">
            <NavDropdown title="Menü">
              <NavDropdown.Item href="#action1">
                <Link to="/" className="nav-link">
                  Kezdőoldal
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action2">
                <Link to="/kategoriak" className="nav-link">
                  Kategóriák
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action2">
              <Link to="/felhasznalo" className="nav-link">
              Felhasználó
            </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action2">
              {props.user.hozzaferes ? (
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              ) : (
                <Link to="/kosar" className="nav-link">
                  Kosár
                </Link>
              )}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <input
              type="text" className="ms-2 me-2 "
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`/kereses/${e.target.value}`)
              }
            />
              <Button className="ms-2 me-2 btn btn-primary">Keresés</Button>
              
            </NavDropdown>
          </button>
          <div className="text-end">
          <ul className="nav navbar-collapse">
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
            <input
              type="text"
              placeholder="Keresés"
              className="m-2 p-1 border border-1 rounded"
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`/kereses/${e.target.value}`)
              }
            />

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
