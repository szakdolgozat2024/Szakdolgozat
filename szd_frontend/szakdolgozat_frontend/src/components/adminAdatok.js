import Card from "react-bootstrap/Card";
import { useState } from "react";
import DataService from "../api/DataService";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import TermekReszletek from "./adminTermekReszletek";
import Modal from "react-bootstrap/Modal";

export default function TermekAdatok(props) {
  const DS = new DataService();
  const [state, setState] = useState({
    besorolas: true,
    modell: true,
    termek: true,
    modellek: [""],
    tolt: false,
    ar: 1000,
    show: false,
  });

  function handleState(key, value) {
    setState({ ...state, [key]: value });
  }

  if (state.modellek[0] === "") {
    DS.get(
      "/api/modell_termekei/" + props.mod_id + "/" + props.mod_nev,
      getKat
    );
  } else if (state.modellek[0] !== "" && state.tolt == false) {
    handleState("tolt", true);
  }
  function getKat(data) {
    handleState("modellek", data.data);
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
            onClick={() => handleState("besorolas", !state.besorolas)}
          />
          <Card.Title>Besorolás</Card.Title>

          <Form.Group className="mb-3 adminForm">
            <Form.Label className="fw-bold">Kategória:</Form.Label>
            <Form.Select disabled={state.besorolas}>
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
            disabled={state.besorolas}
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
            onClick={() => handleState("modell", !state.modell)}
          />
          <Card.Title>Modell</Card.Title>
          <Form.Group
            as={Row}
            className="mb-3 adminForm"
            controlId="formModell"
          >
            <Form.Label className="fw-bold" column sm={2}>
              Modell név:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                disabled={state.modell}
                type="email"
                placeholder={props.mod_nev}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 adminForm"
            controlId="formModell"
          >
            <Form.Label className="fw-bold" column sm={2}>
              Gyártó:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                disabled={state.modell}
                type="email"
                placeholder={state.modellek[0].gyarto}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className="mb-3 adminForm fw-bold"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Leirás:</Form.Label>
            <Form.Control
              disabled={state.modell}
              value={state.modellek[0].leiras}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3 fw-bold adminForm">
            <Form.Label>Modell képei:</Form.Label>
            <Form.Control disabled={state.modell} type="file" />
          </Form.Group>
          <Container>
            <Row classname="adminGallery">
              <Col xs={4} md={2}>
                <Image
                  className="adminKep"
                  src={
                    props.Image ||
                    "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg"
                  }
                  rounded
                  fluid
                />
              </Col>
              <Col xs={4} md={2}>
                <Image
                  className="adminKep"
                  src={
                    props.Image ||
                    "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg"
                  }
                  rounded
                  fluid
                />
              </Col>
              <Col xs={4} md={2}>
                <Image
                  className="adminKep"
                  src={
                    props.Image ||
                    "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg"
                  }
                  rounded
                  fluid
                />
              </Col>
            </Row>
          </Container>
          <Button
            disabled={state.modell}
            as="input"
            style={{ float: "right" }}
            type="submit"
            value="Mentés"
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
            onClick={() => handleState("termek", !state.termek)}
          />
          <Card.Title>Modell termékei</Card.Title>

          <Form.Group className="mb-3 adminForm">
            <Form.Label className="fw-bold">termék (id):</Form.Label>
            <Form.Select disabled={state.termek}>
              {state.modellek.map((model, key) => (
                <option key={key}>{model.ter_id}</option>
              ))}
            </Form.Select>
            <TermekReszletek
              ar={state.ar}
              state={state}
              sateKey="ar"
              quantityChange={() => setState}
              disabled={state.termek}
            ></TermekReszletek>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3 adminForm"
            controlId="formModell"
          >
            <Form.Label className="fw-bold" column sm={2}>
              Anyag:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                disabled={state.termek}
                type="email"
                placeholder={props.mod_nev}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 adminForm">
            <Form.Label className="fw-bold">szín:</Form.Label>
            <Col sm={10}>
              <Form.Select disabled={state.termek}>
                <option>oranje</option>
                <option>blah</option>
                <option>blok</option>
              </Form.Select>
            </Col>
            <Col sm={2}>
              {}
              <div
                style={{
                  border: "1px solid black",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "orange",
                }}
              ></div>
            </Col>
          </Form.Group>
          {/* =============== Gombok ================ */}

          <Button
            as="input"
            style={{ float: "right" }}
            type="submit"
            value="Mentés"
            disabled={state.termek}
          />
          <Button
            onClick={()=> handleState("show", true)}
            as="input"
            variant="danger"
            style={{ float: "right", marginRight: "10px" }}
            type="submit"
            value="Termék törlése"
            disabled={state.termek}
          />
        </Card.Body>
      </Card>
      <Modal
        show={state.show}
        onHide={()=> handleState("show", false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Termék törlése</Modal.Title>
        </Modal.Header>
        <Modal.Body>Biztosan törölni szeretné a terméket?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>handleState("show", false)}>
            Igen
          </Button>
          <Button variant="primary" onClick={()=>handleState("show", false)}>Nem</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
