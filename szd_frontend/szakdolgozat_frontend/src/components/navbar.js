import NavComponent from "./NavComponent";
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="ms-5 navbar-brand" href="#">LOGO</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <NavComponent bootstrapListaElem="nav-item active">ABC</NavComponent>
                    <NavComponent bootstrapListaElem="nav-item">teszt</NavComponent>
                    <NavComponent bootstrapListaElem="nav-item">12aaa</NavComponent>
                    <NavComponent bootstrapListaElem="nav-item">hijk</NavComponent>
                </ul>
            </div>
        </nav>
    )
}