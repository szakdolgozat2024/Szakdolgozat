import Card from "react-bootstrap/Card";
import DataService from "../api/DataService";
import { useEffect, useState } from "react";

export default function KategoriakAdmin() {
    const DS = new DataService();
    const [kategoriak, setKategoriak] = useState([""]);

    useEffect(() => {
        DS.get("/api/osszes_kategoria", getKat)
    }, []);
  function getKat(data) {
    setKategoriak(data.data);
  }


  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Kategoriák</Card.Title>
        </Card.Body>
        <Card.Text>
          <table className="table table-striped">
            <thead>
              <tr>
              <th>Id</th>
                <th>Kategória név</th>
              </tr>
            </thead>
            <tbody>
              {kategoriak.map((kat, index) => (
                <tr key={index}>
                <td>{kat.kat_id}</td>
                  <td>{kat.kategoria_nev}</td>
                  <td>
                    <button 
                      id={index}
                      className="btn btn-primary"
                      
                    >
                      Módosítás
                    </button>
                  </td>
                  <td>
                    <button 
                      id={index}
                      className="btn btn-danger"
                      onClick={(event) => DS.delete(`/api/kategoria_torles/${event.target.id}`)}
                    >
                      Törlés
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
