import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "react-bootstrap/Accordion";
import DataService from "../api/DataService";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import "./modell.css";

export default function Modell(props) {
  const DS = new DataService();
  const [modellek, setModellek] = useState([""]);
  if (modellek[0] === "") {
    DS.get("/api/modell_termekei/"+props.product, getKat);
  }

  function getKat(data) {
    setModellek(data.data);
  }

  return (
    <Container fluid="true" className="ModellContainer h-60">
      <Row className="ModellRow">
        <Col xs={8} key={1}  className="ModellKepek">
          <Carousel>
            {modellek.map((mod, i) => (
              <Carousel.Item key={i}>
                <img alt="" src="https://www.archiproducts.com/images/sharingimage/1390.jpg"></img>
                <Carousel.Caption>{mod.szin}</Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col className="ModellAdatok">
          <h3 className="text-center">Adatok</h3>
          <Accordion defaultActiveKey="none">
            {/* defaultActiveKey automatikusan kinyitja a megadott elemet */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Tulajdonságok</Accordion.Header>
              <Accordion.Body>
                <ButtonGroup>
                <DropdownButton
                  as={ButtonGroup}
                  title="válassz színt"
                  id="bg-nested-dropdown"
                > 
                  {modellek.map((mod, index) => (
                    <Dropdown.Item key={index} eventKey="1">{mod.szin}</Dropdown.Item>
                  ))}
                </DropdownButton>
                <h5>{1000}{"Ft"}</h5>
                </ButtonGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>További Adatok</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Dániel</Accordion.Header>
              <Accordion.Body>
                A Dániel[1] férfinév héber eredetű (דָּנִיּאל Dáníjjél),
                jelentése: Isten a bírám.[2] A kereszténység felvétele előtt a
                magyarságnak volt egy Dan személyneve, mely később összeolvadt a
                Dániel névvel.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}
