import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ProductDetails from "../components/productDetails";
import DataService from "../api/DataService";
import { useLocation } from "react-router-dom";


import "./modell.css";
import Spinner from "react-bootstrap/esm/Spinner";

export default function Modell(props) {
  const [tolt, setTolt] = useState(false);
  const locationPath = useLocation().pathname;
  const pathsArray = locationPath.split("/");
  const mod_id = decodeURIComponent(pathsArray[2].split("=")[0]);
  const mod_nev = decodeURIComponent(pathsArray[2].split("=")[1]);
  const DS = new DataService();
  const [termekek, setTermekek] = useState([""]);
  if (termekek[0] === "") {
    DS.get("/api/modell_termekei/"+mod_id+"/"+mod_nev, getKat);
    console.log(termekek);
  } else if (termekek[0] !== "" && tolt == false) {
    setTolt(true)
  }

  function getKat(data) {
    setTermekek(data.data);
  }

  

  return (
    <div>
    {tolt ? (<Container fluid="true" className="ModellContainer h-60">
    <Row className="ModellRow">
      <Col xs={8} key={1}  className="ModellKepek">
        <Carousel>
          {termekek.map((mod, i) => (
            <Carousel.Item key={i}>
              <img alt="" src="https://www.archiproducts.com/images/sharingimage/1390.jpg"></img>
              <Carousel.Caption>{mod.szin}</Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col className="ModellAdatok">
        <ProductDetails name={mod_nev} termekek={termekek}/>
      </Col>
    </Row>
  </Container>) : (<Spinner animation="border" className="m-auto loadingSpinner" id="spinner"/>)}
  </div>
  );
}
