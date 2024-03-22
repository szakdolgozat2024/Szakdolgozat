import Accordion from "react-bootstrap/Accordion";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function ProductDetails(props) {
  const [termek, setTermek] = useState(0);
  const [quantity, setQuantity] = useState(1);

  function colorChange(params) {
    /* let elem = document.getElementById(params.target.id);
    elem.style.border = "10px solid #000"; */
    setTermek(params);
    console.log(props);
  }

  function quantityChange(params) {
    if (params > 0) {
      setQuantity(params);
    }
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
      <div className="d-flex align-items-center termekAmount amountSetter">
        <InputGroup className="mb-3">
          <Button variant="outline-secondary" id="button-addon1">
            -
          </Button>
          <Form.Control 
          
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
          />
          <Button variant="outline-secondary" id="button-addon1">
            +
          </Button>
        </InputGroup>
        <Button className="kosarba" variant="primary">Kosárba 🛒</Button>
      </div>

      <Accordion defaultActiveKey="0">
        {/* defaultActiveKey automatikusan kinyitja a megadott elemet */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>További adatok</Accordion.Header>
          <Accordion.Body>
            <p>{"Anyag: " + props.termekek[termek].anyag}</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
