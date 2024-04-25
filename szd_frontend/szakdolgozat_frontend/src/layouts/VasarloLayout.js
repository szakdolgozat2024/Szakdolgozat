import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

function VasarloLayout(props) {
  const navigate = useNavigate();
  const [kereses, setKereses] = useState("");

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light mb-5">
        <div className="container-fluid">
          <a className="ms-5 navbar-brand" href="/">
            LOGO
          </a>
          
          <div className="text-end">
            <ul className="nav collapse navbar-collapse">
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
                placeholder="Keress itt..."
                className="m-2 p-1 me-0 border border-1 rounded-start"
                onChange={(e) => setKereses(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && navigate(`/kereses/${e.target.value}`)
                }
              />
              <Button className="m-2 ms-0 p-1 btn btn-secondary rounded-0 rounded-end pe-2 ps-2" onClick={() => navigate(`/kereses/${kereses}`)}>Keresés</Button>

              <li className="nav-item">
                <Link to="/felhasznalo" className="nav-link">
                  Felhasználó <br />
                  <i className="text-muted">(Név: {props.user.name})</i>
                </Link>
              </li>
              <li className="nav-item">
                {props.user.hozzaferes ? (
                  <Link to="/admin" className="nav-link">
                    Admin
                  </Link>
                ) : (
                  <Link to="/kosar" className="nav-link position-relative me-2 " style={{ backgroundColor: "lightgray" , borderRadius: "5px", color: "black"}}>
                    Kosár
                    <span class="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger">
                      {props.kosarMenny}
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <button className="navbar-toggler">
            <NavDropdown title="Menü" className="p-1">
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
              <NavDropdown.Divider/>
              <div className="text-center">
              <input
                type="text"
                placeholder="Keress itt..."
                className="ms-2 me-2  p-2 border border-1 rounded"
                onChange={(e) => setKereses(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && navigate(`/kereses/${e.target.value}`)
                }
              />
              <Button className="ms-2 me-2 mt-2 p-2 btn btn-secondary" onClick={() => navigate(`/kereses/${kereses}`)}>Keresés</Button>
              </div>
              </NavDropdown>
          </button>
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
