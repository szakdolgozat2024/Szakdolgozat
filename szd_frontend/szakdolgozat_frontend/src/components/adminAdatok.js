import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import DataService from "../api/DataService";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import AmountCounter from "./amountCounter";
import Modal from "react-bootstrap/Modal";
import htmlColorNames from "../colors";
import axios from "../api/axios";

export default function AdminAdatok(props) {
  const DS = new DataService();
  const [state, setState] = useState({
    besorolas: true,
    modell: true,
    termek: true,
    kategoriak: [""],
    modellek: [""],
    kategoria: undefined,
    tolt: false,
    ar: undefined,
    show: false,
    szin: undefined,
    termekindex: [0, -1],
    ujModell: props.ujModell,
  });
  useEffect(() => {
    if (props.ujModell) {
      handleState("szin", "Aliceblue");
    }
    else if (
      state.szin === undefined ||
      state.termekindex[1] !== state.termekindex[0]
    ) {
      handleState("szin", state.modellek[state.termekindex[0]].szin);
    } else {
      handleState("szin", state.szin);
    }
    if (props.ujModell) {
      handleState("ar", 0);
    }
    else if (
      state.ar === undefined ||
      state.termekindex[1] !== state.termekindex[0]
    ) {
      handleState("ar", parseInt(state.modellek[state.termekindex[0]].ar));
    } else {
      handleState("ar", state.ar);
    }
  }, [state.modellek, state.termekindex]);

  function handleState(key, value) {
    setState((prevState) => ({ ...prevState, [key]: value }));
  }

  if (state.modellek[0] === "") {
    props.ujModell ? (handleState("modellek", ["defined"])) : (DS.get(
      "/api/modell_termekei/" + props.mod_id + "/" + props.mod_nev,
      getTer
    ))
    DS.get("/api/osszes_kategoria", getKat);
  } else if (
    (state.modellek[0] !== "" || state.kategoriak[0] !== "") &&
    state.tolt == false
  ) {
    handleState("tolt", true);
  }
  function getTer(data) {
    handleState("modellek", data.data);
  }

  function getKat(data) {
    handleState("kategoriak", data.data);
  }

  return (
    <div>
      {state.ujModell ? (
        <>
          <h1 style={{ textAlign: "center" }}>Új modell</h1>
          <Card className="szerkElem " style={{ width: "90%"}}>
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
                <Form.Select
                  value={state.kategoria}
                  onChange={(e) => {
                    handleState(
                      "kategoria",
                      e.target.options[
                        e.target.options.selectedIndex
                      ].getAttribute("kat_id")
                    );
                    handleState("kategoria", e.target.value);
                  }}
                  disabled={state.besorolas}
                >
                  {state.kategoriak.map((kat, index) => (
                    <option kat_id={kat.kat_id} key={index}>
                      {kat.kategoria_nev}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button
                as="input"
                style={{ float: "right" }}
                variant="primary"
                type="submit"
                value="Mentés"
                disabled={state.besorolas}
                onClick={(event) => {
                  event.preventDefault();
                  axios({
                    method: "put",
                    url: "/api/update_modell_kategoria",
                    data: {
                      mod_id: props.mod_id,
                      kategoria: state.kategoria,
                    },
                  });
                }}
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
                  
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
              <Form.Group
                controlId="formFile"
                className="mb-3 fw-bold adminForm"
              >
                <Form.Label>Modell képei:</Form.Label>
                <Form.Control disabled={state.modell} type="file" />
              </Form.Group>
              <Container>
                <Row className="adminGallery">
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
                <Form.Select
                  
                  onChange={(e) =>
                    handleState("termekindex", [
                      e.target.options.selectedIndex,
                      state.termekindex[0],
                    ])
                  }
                  disabled={state.termek}
                >
                  {state.modellek.map((model, key) => (
                    <option key={key}>{model.ter_id}</option>
                  ))}
                </Form.Select>
                <div style={{ marginTop: "1vw", marginBottom: "1vw" }}>
                  <Row>
                    <Col xl={1}>
                      <p className="fw-bold" style={{ marginBottom: "0.5vw" }}>
                        Ár:
                      </p>
                    </Col>
                    <Col xl={4}>
                      <AmountCounter
                        state={state}
                        stateSet={handleState}
                        stateKey={"ar"}
                        className="termekAmount"
                        quantity={state.ar}
                        minusAmount={1000}
                        plusAmount={1000}
                        quantityChange={1000}
                        minAmount={1}
                        maxAmount={10000000}
                        disabled={state.termek}
                      />
                    </Col>
                  </Row>
                </div>
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
                  <Form.Select
                    onChange={(e) => handleState("szin", e.target.value)}
                    disabled={state.termek}
                  >
                    {Object.entries(htmlColorNames).map(([name, value]) => (
                      <option key={value} value={name}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm={2}>
                  {}
                  <div
                    style={{
                      border: "1px solid black",
                      width: "100%",
                      height: "100%",
                      background: state.szin,
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
                onClick={() => handleState("show", true)}
                as="input"
                variant="danger"
                style={{ float: "right", marginRight: "10px" }}
                type="submit"
                value="Termék törlése"
                disabled={state.termek}
              />
              <Button
                as="input"
                style={{ float: "right", marginRight: "10px" }}
                variant="success"
                type="submit"
                value="Új termék"
                disabled={state.termek}
              />
            </Card.Body>
          </Card>
          <Modal
            show={state.show}
            onHide={() => handleState("show", false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Termék törlése</Modal.Title>
            </Modal.Header>
            <Modal.Body>Biztosan törölni szeretné a terméket?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => handleState("show", false)}
              >
                Igen
              </Button>
              <Button
                variant="primary"
                onClick={() => handleState("show", false)}
              >
                Nem
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
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
                <Form.Select
                  value={state.kategoria || state.modellek[0].kategoria_nev}
                  onChange={(e) => {
                    handleState(
                      "kategoria",
                      e.target.options[
                        e.target.options.selectedIndex
                      ].getAttribute("kat_id")
                    );
                    handleState("kategoria", e.target.value);
                  }}
                  disabled={state.besorolas}
                >
                  {state.kategoriak.map((kat, index) => (
                    <option kat_id={kat.kat_id} key={index}>
                      {kat.kategoria_nev}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button
                as="input"
                style={{ float: "right" }}
                value="Mentés"
                variant="primary"
                type="submit"
                disabled={state.besorolas}
                onClick={(event) => {
                  event.preventDefault();
                  axios({
                    method: "put",
                    url: "/api/update_modell_kategoria",
                    data: {
                      mod_id: props.mod_id,
                      kategoria: state.kategoria,
                    },
                  });
                }}
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
              <Form.Group
                controlId="formFile"
                className="mb-3 fw-bold adminForm"
              >
                <Form.Label>Modell képei:</Form.Label>
                <Form.Control disabled={state.modell} type="file" />
              </Form.Group>
              <Container>
                <Row className="adminGallery">
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
                <Form.Select
                  defaultValue={state.modellek[0].ter_id}
                  onChange={(e) =>
                    handleState("termekindex", [
                      e.target.options.selectedIndex,
                      state.termekindex[0],
                    ])
                  }
                  disabled={state.termek}
                >
                  {state.modellek.map((model, key) => (
                    <option key={key}>{model.ter_id}</option>
                  ))}
                </Form.Select>
                <div style={{ marginTop: "1vw", marginBottom: "1vw" }}>
                  <Row>
                    <Col xl={1}>
                      <p className="fw-bold" style={{ marginBottom: "0.5vw" }}>
                        Ár:
                      </p>
                    </Col>
                    <Col xl={4}>
                      <AmountCounter
                        state={state}
                        stateSet={handleState}
                        stateKey={"ar"}
                        className="termekAmount"
                        quantity={state.ar}
                        minusAmount={1000}
                        plusAmount={1000}
                        quantityChange={1000}
                        minAmount={1}
                        maxAmount={10000000}
                        disabled={state.termek}
                      />
                    </Col>
                  </Row>
                </div>
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
                  <Form.Select
                    defaultValue={state.modellek[state.termekindex[0]].szin}
                    onChange={(e) => handleState("szin", e.target.value)}
                    disabled={state.termek}
                  >
                    <option value={state.modellek[state.termekindex[0]].szin}>
                      {state.modellek[state.termekindex[0]].szin}
                    </option>
                    {Object.entries(htmlColorNames).map(([name, value]) => (
                      <option key={value} value={name}>
                        {name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm={2}>
                  {}
                  <div
                    style={{
                      border: "1px solid black",
                      width: "100%",
                      height: "100%",
                      background: state.szin,
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
                onClick={() => handleState("show", true)}
                as="input"
                variant="danger"
                style={{ float: "right", marginRight: "10px" }}
                type="submit"
                value="Termék törlése"
                disabled={state.termek}
              />
              <Button
                as="input"
                style={{ float: "right", marginRight: "10px" }}
                variant="success"
                type="submit"
                value="Új termék"
                disabled={state.termek}
              />
            </Card.Body>
          </Card>
          <Modal
            show={state.show}
            onHide={() => handleState("show", false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Termék törlése</Modal.Title>
            </Modal.Header>
            <Modal.Body>Biztosan törölni szeretné a terméket?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => handleState("show", false)}
              >
                Igen
              </Button>
              <Button
                variant="primary"
                onClick={() => handleState("show", false)}
              >
                Nem
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}
