import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import axios from "../api/axios";
import { useEffect, useState } from "react";

export default function Kosar() {
  const [tartalom, setTartalom] = useState([""]);

  if (tartalom[0] === "") {
    kosarLekerdezes();
  }

  function vegosszeg() {
    let osszeg = 0;
    tartalom.forEach(elem => {
      osszeg += parseFloat(elem.ar);
    });
    return osszeg;
  }

  function getkosar() {
    let kosar = Cookies.get("kosar");
    if (kosar === undefined) {
      kosar = {};
    } else {
      kosar = JSON.parse(kosar);
    }
    return kosar;
  }

  function kosarTorles() {
    Cookies.remove("kosar");
    setTartalom([""]);
    window.location.reload();
  }
  async function kosarLekerdezes() {
    let kosar = getkosar();
    const list = [];
    for (const elem in kosar) {
      await axios.get("/api/adott_termek/" + elem).then((response) => {
        let adat = response.data[0];
        adat.mennyiseg = kosar[elem];
        list.push(adat);
        
      });
    }
    setTartalom(list);
    console.log(tartalom);
  }

  return (
    <div className="container mt-5 mb-5 text-center m-auto ">
    
      <Card
        style={{ width: "50rem" }}
        className="m-auto"
        onClick={kosarLekerdezes}
      >
        <Card.Body>
          <Card.Title>
            <h1 className="m-2">Kosár</h1>
          </Card.Title>
          <Card.Text className="text-muted" onClick={kosarLekerdezes}>
            <p id="eltunik">Itt jelenik meg a kosár tartalma.</p>
            <table className="table-borderless  w-100 m-3" id="tabla">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Termék</th>
                  <th scope="col">Szín</th>
                  <th scope="col">Mennyiség</th>
                  <th scope="col">Ár</th>
                </tr>
              </thead>
              <tbody>
                {tartalom.map((elem, index) => (
                  <tr>
                    <th scope="row">#{index + 1}</th>
                    <td>{elem.nev}</td>
                    <td>{elem.szin}</td>
                    <td>{elem.mennyiseg}</td>
                    <td>{parseFloat(elem.ar)} Ft</td>
                  </tr>
                ))}
              </tbody>
              
            </table>
          </Card.Text>
          <div className="text-end">
          <p className="me-3"><b>Végösszeg:</b> {vegosszeg()} Ft</p>
            <Button variant="danger" onClick={kosarTorles}>
              Kosár törlése
            </Button>
            <Button variant="primary m-2" >
              Tovább a fizetéshez
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
