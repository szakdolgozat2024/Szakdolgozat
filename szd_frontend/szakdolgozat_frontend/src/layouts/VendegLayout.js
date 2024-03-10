import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function VendegLayout() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <a className="ms-5 navbar-brand" href="/kezdolap">
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
        <input type="text" placeholder="Keresés" className=""/>
        
        <li className="nav-item">
          <Link to="/bejelentkezes" className="nav-link">
            Bejelentkezés
          </Link>
        </li>
      </ul>
        </div>
      </nav>
      <article>
        <Outlet />
      </article>
    </div>
  );
}

export default VendegLayout;
