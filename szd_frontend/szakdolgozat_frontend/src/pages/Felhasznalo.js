import { useState } from "react";
import DataService from "../api/DataService";
import Bejelentkezes from "./Bejelentkezes";
import Cookies from "js-cookie";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import Rendelesek from "./Rendelesek";
import FelhasznaloModositasModal from "../components/FelhasznaloModositasModal";

export default function Felhasznalo() {
  const navigate = useNavigate();
  const DS = new DataService();

  const [user, setUser] = useState("");
  if (user === "") {
    let tryuser = getUser();
    if (tryuser != {}) {
      DS.get(
        `/api/bejelentkezett_user/${tryuser.email}/${tryuser.password}`,
        getBejelentkezettUser
      );
    }
  } else {
    document.getElementById("spinner").style.display = "none";
  }

  
  //modal kezelesek
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cim, setCim] = useState("");

  function mentesKezeles () {
    let locname = name;
    let locemail = email;
    let loccim = cim;
    console.log(name, email, cim);
    console.log(user.name, user.email, user.cim);

    if (name === "") {
      locname = user.name;
    }
    if (email === "") {
      locemail = user.email;
    }
    if (cim === "") {
      loccim = user.cim;
    }

    adatok_modosit(locname, locemail, loccim);

    setName("");
    setEmail("");
    setCim("");
    getUser();
    handleClose();
  }

  function getBejelentkezettUser(data) {
    console.log(data.data[0]);
    setUser(data.data[0]);
  }

  function getUser() {
    let tryuser = Cookies.get("bejelentkezett_user");
    if (tryuser === undefined) {
      tryuser = {};
    } else {
      tryuser = JSON.parse(tryuser);
    }
    return tryuser;
  }

  function kijelentkezes() {
    Cookies.remove("bejelentkezett_user");
    window.location.reload();
  }

  function adatok_modosit(nev, email, cim) {
    DS.delete("/api/user_torles/" + user.azon);
    DS.post("/api/uj_user_azonositoval", {
      azon: user.azon,
      name: nev,
      email: email,
      password: user.password,
      cim: cim,
      hozzaferes: user.hozzaferes,
    });
    let tryuser = getUser();
    DS.get(
      `/api/bejelentkezett_user/${tryuser.email}/${tryuser.password}`,
      getBejelentkezettUser
    );
  }
  return (
    <div className="container mt-5 mb-5 text-center m-auto">
      <Card className="m-auto mt-5 p-4">
        <Card.Title>
          <h1 className="m-2">Felhasználói adatok</h1>
        </Card.Title>
        <Spinner animation="border" className="m-auto" id="spinner" />
        <Card.Body className="text-start ps-5">
          <p>
            <b>Név: </b>
            {user.name}
          </p>
          <p>
            <b>Email: </b>
            {user.email}
          </p>
          <p>
            <b>Cím: </b>
            {user.cim}
          </p>
          {user.hozzaferes ? (
            <p>
              <b>Hozzáférés: </b>admin
            </p>
          ) : (
            ""
          )}
        </Card.Body>
        <div className="text-sm-end container m-auto mb-4">
          <button className="btn btn-primary ms-3 m-2 " onClick={handleShow}>
            Módosítás
          </button>
          <button className="btn btn-danger ms-3 m-2 " onClick={kijelentkezes}>
            Kijelentkezés
          </button>
        </div>
      </Card>
      {user.hozzaferes ? " " : <Rendelesek user={user} />}
      <FelhasznaloModositasModal
        show={show}
        handleClose={handleClose}
        user={user}
        adatok_modosit={adatok_modosit}
        setName={setName}
        setEmail={setEmail}
        setCim={setCim}
        mentesKezeles={mentesKezeles}
      />
    </div>
  );
}
