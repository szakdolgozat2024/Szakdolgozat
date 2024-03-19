import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ProductDetails from "../components/productDetails";
import DataService from "../api/DataService";


import "./modell.css";

export default function Modell(props) {
  const DS = new DataService();
  const [termekek, setTermekek] = useState([""]);
  if (termekek[0] === "") {
    DS.get("/api/modell_termekei/"+props.product, getKat);
  }

  function getKat(data) {
    setTermekek(data.data);
  }

  

  return (
    <Container fluid="true" className="ModellContainer h-60">
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
          <ProductDetails {...props} termekek={termekek}/>
        </Col>
      </Row>
    </Container>
  );
}
