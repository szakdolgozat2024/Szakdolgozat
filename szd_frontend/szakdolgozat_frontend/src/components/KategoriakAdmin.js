import Card from "react-bootstrap/Card";
import DataService from "../api/DataService";
import { useEffect, useState } from "react";
import KategoriaModositasModal from "./KategoriaModositasModal";
import UjKategoriaModal from "./UjKategoriaModal";

export default function KategoriakAdmin() {
  const DS = new DataService();
  const [kategoriak, setKategoriak] = useState([""]);

  //modositas modal kezelesek
  const [showModositas, setShowModositas] = useState(false);
  const handleCloseModositas = () => setShowModositas(false);
  const handleShowModositas = () => setShowModositas(true);

  //uj kateg. modal kezelesek
  const [showUj, setShowUj] = useState(false);
  const handleCloseUj = () => setShowUj(false);
  const handleShowUj = () => setShowUj(true);

  const [katnev, setKatNev] = useState("");
  const [kivalasztottKat, setKivalasztottKat] = useState("");

  useEffect(() => {
    DS.get("/api/osszes_kategoria", getKat);
  }, []);
  function getKat(data) {
    setKategoriak(data.data);
  }
  const ujKategoria = () => {
    DS.post("/api/uj_kategoria", {
      kategoria_nev: katnev,
    });

    DS.get("/api/osszes_kategoria", getKat);
    handleCloseUj();
  };

  const katTorles = (event) => {
    DS.delete(`/api/kategoria_torles/${event.target.id}`);
    DS.get("/api/osszes_kategoria", getKat);
  };

  const kategoriaModositas = (event) => {
    setKivalasztottKat(kategoriak[event.target.id]);
    handleShowModositas();
  }

  const modositasRogzites = () => {
    DS.put(`/api/update_kategoria/${kivalasztottKat.kat_id}`, {
      kategoria_nev: katnev,
    })
    DS.get("/api/osszes_kategoria", getKat);
    handleCloseModositas();
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Kategoriák</Card.Title>
          <button className="btn btn-primary m-2 ms-0" onClick={handleShowUj}>
            Új kategória
          </button>
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
                      onClick={kategoriaModositas}
                    >
                      Módosítás
                    </button>
                  </td>
                  <td>
                    <button
                      id={kat.kat_id}
                      className="btn btn-danger"
                      onClick={katTorles}
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
      <KategoriaModositasModal
        show={showModositas}
        handleClose={handleCloseModositas}
        kivalasztottKat={kivalasztottKat}
        modositasRogzites={modositasRogzites}
        setKatNev={setKatNev}
      />
      <UjKategoriaModal
        show={showUj}
        handleClose={handleCloseUj}
        ujKategoria={ujKategoria}
        setKatNev={setKatNev}
      />
    </div>
  );
}
