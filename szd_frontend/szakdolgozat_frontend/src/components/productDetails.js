import Accordion from "react-bootstrap/Accordion";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import AmountCounter from "./amountCounter";
import Cookies from "js-cookie";

export default function ProductDetails(props) {
  const [termek, setTermek] = useState(0);
  const [quantity, setQuantity] = useState(1);

  function colorChange(params) {
    /* let elem = document.getElementById(params.target.id);
    elem.style.border = "10px solid #000"; */
    setTermek(params);
    setQuantity(1);
  }

  function amauntChange(params) {
    setQuantity(params);
  }

  function kosarba() {
    let kosar = Cookies.get("kosar");
    if (kosar === undefined) {
      kosar = {};
    } else {
      kosar = JSON.parse(kosar);
    }
    kosar[props.termekek[termek].ter_id] =
      (kosar[props.termekek[termek].ter_id] || 0) + quantity;
    Cookies.set("kosar", JSON.stringify(kosar));
  }

  return (
    <div>
      <h2 className="text-center">{props.name}</h2>
      <h5>{props.termekek[termek].ar + " Ft"}</h5>
      <p>{props.termekek[termek].leiras}</p>
      <p className="szinText">{"Szín: " + props.termekek[termek].szin}</p>
      <ToggleButtonGroup
        onChange={colorChange}
        type="radio"
        name="options"
        defaultValue={0}
      >
        {props.termekek.map((mod, i) => (
          <ToggleButton
            variant="dark"
            className="szinBtn rounded-circle"
            key={i}
            style={{
              backgroundColor: mod.szin,
              ...(termek === i
                ? { border: "3px solid #000" }
                : { border: "3px solid transparent" }),
            }}
            id={"tbg-radio-" + i}
            value={i}
          ></ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Container className="amountKosar">
        <Row>
          <Col className="mennyisegCol">
            <AmountCounter
              quantityChange={amauntChange}
              defaultValue={quantity}
              quantity={quantity}
              maxAmount={15}
            ></AmountCounter>
          </Col>
          <Col xs={0} sm={6} md={6} lg={7} xl={7} xxl={8} className="kosarCol">
            <Button onClick={kosarba} className="kosarba" variant="primary">
              Kosárba 🛒
            </Button>
          </Col>
        </Row>
      </Container>

      <Accordion defaultActiveKey="0">
        {/* defaultActiveKey automatikusan kinyitja a megadott elemet */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>További adatok</Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col lg={9}>Anyag:</Col>
              <Col>{props.termekek[termek].anyag}</Col>
            </Row>
            <Row>
              <Col lg={9}>Anyag:</Col>
              <Col>{props.termekek[termek].anyag}</Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
