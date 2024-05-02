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
  const [state, setState] = useState({
    termek: 0,
    quantity: 1
  });
  
  function handleState(key, value) {
    setState((prevState) => ({ ...prevState, [key]: value }));
  }

  function colorChange(params) {
    /* let elem = document.getElementById(params.target.id);
    elem.style.border = "10px solid #000"; */
    handleState("termek", params);
    handleState("quantity", 1);
  }

  function amauntChange(params) {
    handleState("quantity", params);
  }

  function kosarba() {
    if (props.vendeg) {
      document.getElementById("alert").style.display = "block";
    } else {
      let kosar = Cookies.get("kosar");
    if (kosar === undefined) {
      kosar = {};
    } else {
      kosar = JSON.parse(kosar);
    }
    kosar[props.termekek[state.termek].ter_id] =
      (kosar[props.termekek[state.termek].ter_id] || 0) + state.quantity;
    Cookies.set("kosar", JSON.stringify(kosar));
    props.setKosarMenny(props.kosarMenny + state.quantity);
    }
  }

  return (
    <div>
      <h2 className="text-center inter-bold">{props.name}</h2>
      <h5 className="productProperties inter-bold">{props.termekek[state.termek].ar + " Ft"}</h5>
      <p className="productProperties inter-regular">{props.termekek[state.termek].leiras}</p>
      <p className="szinText productProperties inter-medium">{"Szín: " + props.termekek[state.termek].szin}</p>
      <ToggleButtonGroup
        onChange={colorChange}
        type="radio"
        name="options"
        defaultValue={0}
        id="colorBtnGroup"
      >
        {props.termekek.map((mod, i) => (
          <ToggleButton
            variant="dark"
            className="szinBtn rounded-circle"
            key={i}
            style={{
              backgroundColor: mod.szin,
              ...(state.termek === i
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
              state={state}
              stateSet={handleState}
              stateKey={"quantity"}
              
              quantity={state.quantity}
              minusAmount={1}
              plusAmount={1}
              minAmount={1}
              maxAmount={10}
            ></AmountCounter>
          </Col>
          <Col xs={12} sm={12} md={12} lg={7} xl={7} xxl={8} className="kosarCol">
            <Button onClick={kosarba} className="kosarba inter-medium text-white" variant="primary">
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
              <Col lg={9} xs={6} sm={6} md={6}>Anyag:</Col>
              <Col>{props.termekek[state.termek].anyag}</Col>
            </Row>
            <Row>
              <Col lg={9} xs={6} sm={6} md={6}>Anyag:</Col>
              <Col>{props.termekek[state.termek].anyag}</Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
