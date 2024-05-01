import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function VendegLayout() {
  const navigate = useNavigate();
  const [kereses, setKereses] = useState("");
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5 inter-bold">
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
                className="m-2 p-1 me-0 border border-1 rounded-start inter-medium border-dark"
                onChange={(e) => setKereses(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && navigate(`/kereses/${e.target.value}`)
                }
              />
              <Button
                className="m-2 ms-0 p-1 border border-1 border-dark btn btn-dark rounded-0 rounded-end pe-2 ps-2 inter-medium text-white"
                onClick={() => navigate(`/kereses/${kereses}`)}
              >
                Keresés
              </Button>

              <li className="nav-item">
                <Link to="/bejelentkezes" className="nav-link">
                  Bejelentkezés
                </Link>
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
                <Link to="/bejelentkezes" className="nav-link">
                  Bejelentkezés
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
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
                <Button
                  className="ms-2 me-2 mt-2 p-2 btn btn-secondary"
                  onClick={() => navigate(`/kereses/${kereses}`)}
                >
                  Keresés
                </Button>
              </div>
            </NavDropdown>
          </button>
        </div>
      </nav>
      <article className="container">
        <Outlet />
      </article>
      <footer className="text-center pb-4 pt-2 bg-secondary-subtle">
        <p>Készítette: Kun-Székely Bence és Szendefi Krisztofer Dániel</p>
        <p className="text-secondary fw-light fst-italic">
          @All rights reserved (except those that are not)
        </p>
      </footer>
    </div>
  );
}

export default VendegLayout;
