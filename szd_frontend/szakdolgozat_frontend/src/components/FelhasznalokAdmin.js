import Card from "react-bootstrap/Card";
import DataService from "../api/DataService";
import { useEffect, useState } from "react";

export default function FelhasznalokAdmin() {
  const DS = new DataService();
  const [felhasznalok, setFelhasznalok] = useState([""]);

  useEffect(() => {
    DS.get("/api/osszes_user", getFelhasznalok);
  }, []);

  function getFelhasznalok(data) {
    setFelhasznalok(data.data);
  }

  function felhasznaloTorles(event) {
    DS.delete(`/api/user_torles/${event.target.id}`);
    DS.get("/api/osszes_user", getFelhasznalok);
  }

  async function felhasznaloTorlesId(id) {
    DS.delete(`/api/user_torles/` + id);
  }

  function vasarlovaTesz(event) {
    let kivalaszottFelhasznalo = felhasznalok[event.target.id].azon;
    console.log(kivalaszottFelhasznalo);
    DS.put("/api/user_update_hozzaferes/" + kivalaszottFelhasznalo, {
      hozzaferes: 0,
    });
    DS.get("/api/osszes_user", getFelhasznalok);
  }

  async function adminnaTesz(event) {
    let kivalaszottFelhasznalo = felhasznalok[event.target.id].azon;
    DS.put("/api/user_update_hozzaferes/" + kivalaszottFelhasznalo, {
      hozzaferes: 1,
    });
    DS.get("/api/osszes_user", getFelhasznalok);
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Felhasználók</Card.Title>
        </Card.Body>
        <Card.Text>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Azonosító</th>
                <th>Név</th>
                <th>Email</th>
                <th>Cím</th>
                <th>Hozzáférés</th>
              </tr>
            </thead>
            <tbody>
              {felhasznalok.map((user, index) => (
                <tr key={index}>
                  <td>{user.azon}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.cim}</td>
                  <td>{user.hozzaferes ? "admin" : "vásárló"}</td>
                  <td>
                    {user.hozzaferes ? (
                      <td>
                        <button
                          id={index}
                          onClick={vasarlovaTesz}
                          className="btn btn-success"
                        >
                          Vásárlóvá tesz
                        </button>
                      </td>
                    ) : (
                      <td>
                        <button
                          id={index}
                          onClick={adminnaTesz}
                          className="btn btn-success"
                        >
                          Adminná tesz
                        </button>
                      </td>
                    )}
                  </td>
                  <td>
                    <button
                      id={user.azon}
                      onClick={felhasznaloTorles}
                      className="btn btn-danger"
                    >
                      Törlés
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Text>
      </Card>
    </div>
  );
}
