import { Link, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
  return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <a className="ms-5 navbar-brand" href="#">LOGO</a>
       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
       </button>
            <ul className="nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Kezdőoldal</Link>
                </li>
                <li className="nav-item">
                    <Link to="/kategoriak" className="nav-link">Kategóriák</Link>
                </li>
                <input type="text" placeholder="Keresés"/>
                <li className="nav-item">
                    <Link to="/felhasznalo" className="nav-link">Felhasználó</Link>
                </li>
                <li className="nav-item">
                    <Link to="/kosar" className="nav-link">Kosár</Link>
                </li>
            </ul>
       </nav>
       <article>
           <Outlet />
       </article>
    </div>
  );
}

export default Layout;