import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import DataService from "../api/DataService";

export default function Beszerzes() {
  const DS = new DataService();
  const [beszerzesek, setBeszerzesek] = useState([""]);
  const [mennyiseg, setMennyiseg] = useState(0);
  const [modellek, setModellek] = useState([""]);
  const [termekek, setTermekek] = useState([""]);
  const [modell, setModell] = useState("");
  const [termek, setTermek] = useState("");

  useEffect(() => {
    DS.get("/api/beszerzesek", getBeszerzesek);
    DS.get("/api/osszes_modell", getModellek);
  }, []);

  if (mennyiseg < 0) {
    setMennyiseg(0);
  }

  function getBeszerzesek(data) {
    setBeszerzesek(data.data);
  }

  function getModellek(data) {
    setModellek(data.data);
  }

  const modellKivalasztva = (e) => {
    setModell(modellek[e.target.value]);
    document.getElementsByClassName("termekValaszto")[0].disabled = false;
    DS.get(
      "/api/modell_termekei/" +
        modellek[e.target.value].mod_id +
        "/" +
        modellek[e.target.value].nev,
      getTermekek
    );
  };

  function getTermekek(data) {
    setTermekek(data.data);
  }

  function formSubmit(e) {
    e.preventDefault();
    if (mennyiseg <= 0 || termek === "" || modell === "") {
        document.getElementById("alert").style.display = "block";
    } else {
        document.getElementById("alert").style.display = "none";
      console.log(termek.ter_id, mennyiseg);
      DS.post("/api/uj_beszerzes", {
        termek: termek.ter_id,
        mennyiseg: mennyiseg,
      });
      DS.get("/api/beszerzesek", getBeszerzesek);
    }
  }

  return (
    <div>
      <Card className="w-25 m-auto mb-4">
        <form className="m-3" onSubmit={formSubmit}>
          <label htmlFor="beszerzes modellValaszto" className="form-label">
            Modell név:
          </label>
          <select
            className="form-select modellValaszto"
            id="inputGroupSelect01"
            onChange={modellKivalasztva}
          >
            <option selected>Válasszon modellt...</option>
            {modellek.map((model, idx) => (
              <option value={idx}>{model.nev}</option>
            ))}
          </select>
          <label htmlFor="beszerzes termekValaszto" className="form-label">
            Termék:
          </label>
          <select
            className="form-select termekValaszto"
            id="inputGroupSelect01"
            onChange={(e) => setTermek(termekek[e.target.value])}
            disabled
          >
            <option selected>Válasszon terméket...</option>

            {termekek.map((termek, idx) => (
              <option value={idx}>
                id: {termek.ter_id}, szín: {termek.szin}, anyag: {termek.anyag}
              </option>
            ))}
          </select>
          <label htmlFor="beszerzes" className="form-label">
            Mennyiség:
          </label>
          <input
            type="number"
            value={mennyiseg}
            className="form-control mennyiseg mb-3 w-25 "
            onChange={(e) => setMennyiseg(e.target.value)}
          />
          <div
            class="alert alert-danger"
            id="alert"
            role="alert"
            style={{ display: "none" }}
          >
            Előbb állítsa be a modellt és a terméket! A mennyiség nem lehet 0!
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-success m-3 ">
              Hozzáad
            </button>
          </div>
        </form>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Beszerzések</Card.Title>
          <Card.Text>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Termék</th>
                  <th>Kelt</th>
                  <th>Mennyiség</th>
                </tr>
              </thead>
              <tbody>
                {beszerzesek.map((beszerzes, idx) => (
                  <tr key={idx}>
                    <td>{beszerzes.termek}</td>
                    <td>{beszerzes.kelt}</td>
                    <td>{beszerzes.mennyiseg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
