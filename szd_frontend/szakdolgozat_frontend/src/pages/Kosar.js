import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import KosarModal from "../components/KosarModal";
import DataService from "../api/DataService";

export default function Kosar(props) {
  const [tartalom, setTartalom] = useState([""]);
  const navigate = useNavigate();
  const DS = new DataService();

  //modal kezelesek
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    kosarLekerdezes();
  }, []);

  const rendelesRogzites = async () => {
    await feltoltes();
    kosarTorles();
    handleClose();
  }

  const feltoltes = async () => {
    DS.post("/api/rendelesrogzites", {
      user: props.user.azon,
    })
      tartalom.forEach(elem => {
      DS.post("/api/rendelestetelrogzites", {
        termek: elem.ter_id,
        mennyiseg: elem.mennyiseg
      })
    })
  }

  function vegosszeg() {
    let osszeg = 0;
    tartalom.forEach(elem => {
      osszeg += (parseFloat(elem.ar) * elem.mennyiseg);
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
    kosarLekerdezes();
    props.setKosarMenny(0);
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

  function fizetes(){
    if (vegosszeg() > 0) {
      handleShow();
    } else {
      document.getElementById("alert").style.display = "block";
    }

  }

  return (
    <div className="container mt-5 mb-5 text-center m-auto ">
    
      <Card
      lassName="m-auto mt-3 p-4"
        onClick={kosarLekerdezes}
      >
        <Card.Body>
          <Card.Title>
            <h1 className="m-2">Kosár</h1>
          </Card.Title>
          <Card.Text className="text-muted" onClick={kosarLekerdezes}>
            <p id="eltunik">Itt jelenik meg a kosár tartalma.</p>
            <table className="table-borderless w-100  " id="tabla">
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
                    <td>{parseFloat(elem.ar) * elem.mennyiseg} Ft</td>
                  </tr>
                ))}
              </tbody>
              
            </table>
          </Card.Text>
          <div className="text-sm-end text-center">
          <p className="me-3 text-end"><b>Végösszeg:</b> {vegosszeg()} Ft</p>
            <Button variant="danger" onClick={kosarTorles}>
              Kosár törlése
            </Button>
            <Button variant="primary m-2" onClick={fizetes}>
              Tovább a fizetéshez
            </Button>
          </div>
        </Card.Body>
        <Alert className="m-3" id="alert" variant="danger" style={{display: 'none'}}>
          A kosár üres, előbb vásárolj valalmit!
        </Alert>
      </Card>
      <KosarModal show = {show} handleClose = {handleClose} rendelesRogzites = {rendelesRogzites}/>
    </div>
  );
}
