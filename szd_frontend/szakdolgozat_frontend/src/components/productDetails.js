import Accordion from "react-bootstrap/Accordion";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { useState } from "react";

export default function ProductDetails(props) {
const [termek, setTermek] = useState(0);

function colorChange(params) {
    /* let elem = document.getElementById(params.target.id);
    elem.style.border = "10px solid #000"; */
    setTermek(params.target.value);
}

  return (
    <div>
      <h3 className="text-center">{props.name}</h3>
      <Accordion defaultActiveKey="0">
        {/* defaultActiveKey automatikusan kinyitja a megadott elemet */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Tulajdonságok</Accordion.Header>
          <Accordion.Body>
            <ToggleButtonGroup onChange={(event, changeValue) => colorChange(changeValue)} type="radio" name="options" defaultValue={0}>
              {props.termekek.map((mod, i) => (
                  <ToggleButton className="szinBtn" key={i} style={{backgroundColor: mod.szin}} id={"tbg-radio-" + i} value={i}>
                    
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <h5>{"Anyag: "+props.termekek[termek].anyag}</h5>
            <h5>{"Anyag: "+props.termekek[termek].ar+" "}</h5>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Leírás</Accordion.Header>
          <Accordion.Body><p>{props.termekek[termek].leiras}</p></Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Dániel</Accordion.Header>
          <Accordion.Body>
            A Dániel[1] férfinév héber eredetű (דָּנִיּאל Dáníjjél), jelentése:
            Isten a bírám.[2] A kereszténység felvétele előtt a magyarságnak
            volt egy Dan személyneve, mely később összeolvadt a Dániel névvel.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
