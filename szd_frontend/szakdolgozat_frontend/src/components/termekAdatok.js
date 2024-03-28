import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import DataService from "../api/DataService";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function TermekAdatok(props) {
  const DS = new DataService();
  const [modellek, setModellek] = useState([""]);
  const [tolt, setTolt] = useState(false);
  const [besorolasDisabled, setBesorolasDisabled] = useState(true);
  const [moellDisabled, setModellDisabled] = useState(true);

  if (modellek[0] === "") {
    DS.get(
      "/api/modell_termekei/" + props.mod_id + "/" + props.mod_nev,
      getKat
    );
  } else if (modellek[0] !== "" && tolt == false) {
    setTolt(true);
  }
  function getKat(data) {
    setModellek(data.data);
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{props.mod_nev}</h1>
      <Card className="szerkElem" style={{ width: "90%" }}>
        <Card.Body>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="szrekesztés"
            style={{ float: "right" }}
            onClick={() => setBesorolasDisabled(!besorolasDisabled)}
          />
          <Card.Title>Besorolás</Card.Title>

          <Form.Group style={{ width: "50%" }} className="mb-3">
            <Form.Label className="fw-bold">Kategória:</Form.Label>
            <Form.Select disabled={besorolasDisabled}>
              <option>kat 1</option>
              <option>kat 2</option>
              <option>kat 3</option>
            </Form.Select>
          </Form.Group>
          <Button
            as="input"
            style={{ float: "right" }}
            type="submit"
            value="Mentés"
            disabled={besorolasDisabled}
          />
        </Card.Body>
      </Card>
      <Card className="szerkElem" style={{ width: "90%" }}>
        <Card.Body>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="szrekesztés"
            style={{ float: "right" }}
            onClick={() => setModellDisabled(!moellDisabled)}
          />
          <Card.Title>Modell</Card.Title>
          <Form.Group
            style={{ width: "50%" }}
            as={Row}
            className="mb-3"
            controlId="formModell"
          >
            <Form.Label className="fw-bold" column sm={2}>
              Modell név:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                disabled={moellDisabled}
                type="email"
                placeholder={props.mod_nev}
              />
            </Col>
          </Form.Group>
          <Button
            disabled={moellDisabled}
            as="input"
            style={{ float: "right" }}
            type="submit"
            value="Mentés"
          />
        </Card.Body>
      </Card>
    </div>
  );
}
