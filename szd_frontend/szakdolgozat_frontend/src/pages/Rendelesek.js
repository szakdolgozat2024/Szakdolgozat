import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import DataService from "../api/DataService";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import RendelesModal from "../components/RendelesModal";

export default function Rendelesek(props) {
  const [rendelesek, setRendelesek] = useState([""]);
  const [rendelesReszletei, setRendelesReszletei] = useState([""]);
  const DS = new DataService();
  const user = props.user;

  //modal kezelesek
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(() => {
    console.log(user);
    DS.get(`/api/user_rendelesei/${user.azon}`, getRendelesek);
  }, []);

  function getRendelesek(data) {
    setRendelesek(data.data);
  }
  function rendelesTorles(event) {
    DS.delete(`/api/rendelestorles/${event.target.id}`);
    DS.get(`/api/user_rendelesei/${user.azon}`, getRendelesek);
  }

  function rendelesReszletezes(event) {
    DS.get(`/api/rendelestermekei/${event.target.id}`, getRendelesReszletei);

    handleShow();
  }

  function getRendelesReszletei(data) {
    setRendelesReszletei(data.data);
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

  return (
    <Card className="m-auto mt-3 p-4">
      <Card.Title className="text-center">
        <h1 className="inter-bold">Rendelések</h1>
      </Card.Title>
      <Card.Text className="text-muted">
        <ListGroup variant="flush">
          {rendelesek.map((elem, index) => (
            <ListGroup.Item
              style={{ cursor: "pointer" }}
              className="text-start"
              key={index}
            >
              <p className="ms-5 ps-5" key={index}>
                <b>Rendelés száma:</b> {elem.rend_szam} <br />
                <b>Csomag azonosító:</b> {elem.csomag} <br /> <b>Kelt: </b>
                {elem.kelt} <br /> <b>Csomag állapota:</b> {csomagallapot(elem.allapot)}
                <br /> <b>Kiszállítva:</b> {elem.kiszallitva}
              </p>
              <div className="text-sm-end text-center">
                
                {elem.kiszallitva === null ? (
                  <Button
                  className="ms-3 m-2 "
                  variant="danger"
                  key={index}
                  id={elem.rend_szam}
                  onClick={rendelesTorles}
                >
                  Rendelés törlése
                </Button>
                ) : null}

                <Button
                  className="ms-3 m-2 "
                  id={elem.rend_szam}
                  onClick={rendelesReszletezes}
                >
                  Részletek megtekintése
                </Button>
                
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Text>
      <RendelesModal
        show={show}
        handleClose={handleClose}
        rendelesReszletei={rendelesReszletei}
      />
    </Card>
  );
}
