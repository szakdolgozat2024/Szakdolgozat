import { useEffect, useState } from "react";
import DataService from "../api/DataService";
import Card from "react-bootstrap/Card";
import RendelesAdminModal from "./RendelesAdminModal";

export default function RendelesekAdmin() {
  const DS = new DataService();
  const [rendelesek, setRendelesek] = useState([""]);

  //modal kezelesek
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rendelesReszletei, setRendelesReszletei] = useState([""]);
  const [modalGombSzoveg, setModalGombSzoveg] = useState("Rendben");
  const [kivalasztottRendeles, setKivalasztottRendeles] = useState({});

  useEffect(() => {
    DS.get("/api/osszes_rendeles", getRendelesek);
  }, []);

  function getRendelesek(data) {
    setRendelesek(data.data);
  }

  function rendelesTorles(event) {
    DS.delete(`/api/rendelestorles/${event.target.id}`);
    DS.get("/api/osszes_rendeles", getRendelesek);
  }

  function rendelesReszletezes(event) {
    const elem = rendelesek[event.target.id];
    setKivalasztottRendeles(elem)
    let allapot = elem.allapot;
    if (allapot === 0) {
      setModalGombSzoveg("Becsomagol");
    } else if (allapot === 1) {
      setModalGombSzoveg("Átadás a futárnak");
    } else if (allapot === 2) {
      setModalGombSzoveg("Kézbesít");
    } else if (allapot === 3) {
      setModalGombSzoveg("Rendben");
    }
    
    DS.get(`/api/rendelestermekei/${elem.rend_szam}`, getRendelesReszletei);

    handleShow();

  }

  function getRendelesReszletei(data) {
    setRendelesReszletei(data.data);
    console.log(data.data);
  }

  function csomagallapot(szam) {
    //  0 – feldolgozás alatt,1 – csomagolva , 2 - átadva a futárnak, 3 - kézbesítve
    if (szam === 0) {
      return "Feldolgozás alatt";
    } else if (szam === 1) {
      return "Csomagolva";
    } else if (szam === 2) {
      return "Átadva a futárnak";
    } else if (szam === 3) {
      return "Kézbesítve";
    }
  }

  const csomagfeldolgoz = () => {
    if (kivalasztottRendeles.allapot < 3) {
      DS.put('/api/update_csomag/' + kivalasztottRendeles.csom_azon, {
        allapot: kivalasztottRendeles.allapot + 1
      })
      DS.get("/api/osszes_rendeles", getRendelesek);
    }
    
    handleClose();
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Rendelések</Card.Title>
          <Card.Text>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Rendelés száma</th>
                  <th>Megrendelő azonosító</th>
                  <th>Megrendelés név</th>
                  <th>Csomag</th>
                  <th>Csomag állapota</th>
                  <th>Rendelés rögzítve</th>
                  <th>Rendelés kiszállítva</th>
                </tr>
              </thead>
              <tbody>
                {rendelesek.map((rendeles, idx) => (
                  <tr key={idx}>
                    <td>{rendeles.rend_szam}</td>
                    <td>{rendeles.user}</td>
                    <td>{rendeles.userNev}</td>
                    <td>{rendeles.csomag}</td>
                    <td>{csomagallapot(rendeles.allapot)}</td>
                    <td>{rendeles.kelt}</td>
                    <td>{rendeles.kiszallitva}</td>
                    <td>
                      <button
                        id={idx}
                        type="button"
                        className="btn btn-primary"
                        onClick={rendelesReszletezes}
                      >
                        Csomagkezelés
                      </button>
                    </td>
                    <td>
                      {rendeles.kiszallitva === null ? (
                        <button
                        id={rendeles.rend_szam}
                        onClick={rendelesTorles}
                        className="btn btn-danger"
                      >
                        Törlés
                      </button>
                      ) : null}
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Text>
        </Card.Body>
      </Card>
      <RendelesAdminModal show={show} handleClose={handleClose} rendelesReszletei={rendelesReszletei} modalGombSzoveg={modalGombSzoveg} csomagfeldolgoz={csomagfeldolgoz}/>
    </div>
  );
}
