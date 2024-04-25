import { useState } from "react";
import DataService from "../api/DataService";
import Card from "react-bootstrap/Card";

export default function RendelesekAdmin() {
    const DS = new DataService();
    const [rendelesek, setRendelesek] = useState([""]);

    if (rendelesek[0] === "") {
        DS.get("/api/osszes_rendeles", getRendelesek);
    }

    function getRendelesek(data) {
        setRendelesek(data.data);
    }

    function rendelesTorles(event) {
      DS.delete(`/api/rendelestorles/${event.target.id}`);
      DS.get("/api/osszes_rendeles", getRendelesek);
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
                  <th>Megrendelő</th>
                  <th>Csomag</th>
                  <th>Rendelés rögzítve</th>
                  <th>Rendelés kiszállítva</th>
                </tr>
              </thead>
              <tbody>
                {rendelesek.map((rendeles, idx) => (
                  <tr key={idx}>
                    <td>{rendeles.rend_szam}</td>
                    <td>{rendeles.user}</td>
                    <td>{rendeles.csomag}</td>
                    <td>{rendeles.kelt}</td>
                    <td>{rendeles.kiszallitva}</td>
                    <td><button id={rendeles.rend_szam} onClick={rendelesTorles} className="btn btn-danger">Törlés</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Text>
        </Card.Body>
      </Card>
        </div>
    )
}