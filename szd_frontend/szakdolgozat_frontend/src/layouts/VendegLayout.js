import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

function VendegLayout() {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <div className="container-fluid">
        <a className="ms-5 navbar-brand" href="/">
        LOGO
      </a>
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
              type="text" className="ms-2 me-2 mb-2 p-1 border border-1 rounded" 
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`/kereses/${e.target.value}`)
              }
            />
              <Button className="ms-2 me-2 btn btn-success text-center ">Keresés</Button>
              </div>
              
              

            </NavDropdown>
          </button>
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
              placeholder="Keresés"
              className="m-2 p-1 border border-1 rounded"
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`/kereses/${e.target.value}`)
              }
            />
        
        <li className="nav-item">
          <Link to="/bejelentkezes" className="nav-link">
            Bejelentkezés
          </Link>
        </li>
      </ul>
      </div>
        </div>
      </nav>
      <article className="container">
        <Outlet />
      </article>
      <footer className="text-center pb-4 pt-2 bg-secondary-subtle">
        <p>Készítette: Kun-Székely Bence és Szendefi Krisztofer Dániel</p>
        <p className="text-secondary fw-light fst-italic">@All rights reserved (except those that are not)</p>
      </footer>
    </div>
  );
}

export default VendegLayout;
