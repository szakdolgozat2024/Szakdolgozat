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
import Alert from "react-bootstrap/Alert";

export default function AdminAdatok(props) {
  const DS = new DataService();
  const [state, setState] = useState({
    besorolas: true,
    modell: true,
    termek: true,
    kategoriak: [""],
    termekek: [""],
    kategoria_nev: "",
    kategoria: undefined,
    tolt: false,
    ar: undefined,
    show: false,
    szin: undefined,
    termekindex: [0, -1],
    ujModell: props.ujModell,
    alert: false,
    alertmessage: "",
    ujmodellnev: "",
    ujModellgyarto: "",
    ujModellleiras: "",
  });
  useEffect(() => {
    if (props.ujModell) {
      handleState("szin", "Aliceblue");
    } else if (
      state.szin === undefined ||
      state.termekindex[1] !== state.termekindex[0]
    ) {
      handleState("szin", state.termekek[state.termekindex[0]].szin);
    } else {
      handleState("szin", state.szin);
    }
    if (props.ujModell) {
      handleState("ar", 0);
    } else if (
      state.ar === undefined ||
      state.termekindex[1] !== state.termekindex[0]
    ) {
      handleState("ar", parseInt(state.termekek[state.termekindex[0]].ar));
    } else {
      handleState("ar", state.ar);
    }
  }, [state.termekek, state.termekindex]);

  function handleState(key, value) {
    setState((prevState) => ({ ...prevState, [key]: value }));
  }

  if ((state.termekek[0] === "" || state.termekek[0] == "defined") && !props.ujModell) {
    DS.get(
      "/api/modell_termekei/" + props.mod_id + "/" + props.mod_nev,
      getTer
    );
    DS.get("/api/osszes_kategoria", getKat);
  } else if (state.termekek[0] == "" && props.ujModell) {
    handleState("termekek", ["defined"]);
    DS.get("/api/osszes_kategoria", getKat);
  }
   else if (
    (state.termekek[0] !== "" || state.kategoriak[0] !== "") &&
    state.tolt == false
  ) {
    handleState("tolt", true);
  }
  function getTer(data) {
    handleState("termekek", data.data);
  }

  function getKat(data) {
    handleState("kategoriak", data.data);
  }

  return (
    <div>
      {state.alert && (
        <Alert variant="success" style={{ margin: "1vh" }}>
          {state.alertmessage}
        </Alert>
      )}
      {state.ujModell ? (
        <>
          <h1 style={{ textAlign: "center" }}>Új modell</h1>

          <Card className="szerkElem" style={{ width: "90%" }}>
            <Card.Body>
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="szerkesztés"
                style={{ float: "right" }}
                onClick={() => {
                  handleState("modell", !state.modell);
                  handleState("kategoria", state.kategoriak[0].kat_id);
                }}
              />
              <Card.Title>Modell létrehozása</Card.Title>

              <Form.Group className="mb-3 adminForm">
                <Form.Label className="fw-bold">Kategória:</Form.Label>
                <Form.Select
                  value={state.kategoria_nev}
                  onChange={(e) => {
                    handleState(
                      "kategoria",
                      e.target.options[
                        e.target.options.selectedIndex
                      ].getAttribute("kat_id")
                    );
                    handleState("kategoria_nev", e.target.value);
                  }}
                  disabled={state.modell}
                >
                  {state.kategoriak.map((kat, index) => (
                    <option kat_id={kat.kat_id} key={index}>
                      {kat.kategoria_nev}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

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
                    onChange={(e) => handleState("ujmodellnev", e.target.value)}
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
                    onChange={(e) =>
                      handleState("ujModellgyarto", e.target.value)
                    }
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
                  onChange={(e) =>
                    handleState("ujModellleiras", e.target.value)
                  }
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
            </Card.Body>
          </Card>
          <Button
            as="input"
            disabled={
              state.ujmodellnev.length < 1 ||
              state.ujModellgyarto.length < 1 ||
              state.ujModellleiras.length < 1
            }
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              marginTop: "1vw",
            }}
            type="submit"
            value="Mentés és feltöltés"
            onClick={() => {
              DS.post("/api/uj_modell", {
                nev: state.ujmodellnev,
                kategoria: state.kategoria,
                gyarto: state.ujModellgyarto,
                leiras: state.ujModellleiras,
              });
              handleState("alertmessage", "Új modell feltöltve");
              handleState("alert", true);
            }}
          />
        </>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>{props.mod_nev}</h1>
          <Card className="szerkElem" style={{ width: "90%" }}>
            <Card.Body>
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="szerkesztés"
                style={{ float: "right" }}
                onClick={() => handleState("besorolas", !state.besorolas)}
              />
              <Card.Title>Besorolás</Card.Title>

              <Form.Group className="mb-3 adminForm">
                <Form.Label className="fw-bold">Kategória:</Form.Label>
                <Form.Select
                  value={state.kategoria_nev}
                  onChange={(e) => {
                    handleState(
                      "kategoria",
                      e.target.options[
                        e.target.options.selectedIndex
                      ].getAttribute("kat_id")
                    );
                    handleState("kategoria_nev", e.target.value);
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
            </Card.Body>
          </Card>
          <Card className="szerkElem" style={{ width: "90%" }}>
            <Card.Body>
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="szerkesztés"
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
                    onChange={(e) => handleState("ujmodellnev", e.target.value)}
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
                    placeholder={state.termekek[0].gyarto}
                    onChange={(e) =>
                      handleState("ujModellgyarto", e.target.value)
                    }
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
                  value={state.termekek[0].leiras}
                  as="textarea"
                  rows={3}
                  onChange={(e) =>
                    handleState("ujModellleiras", e.target.value)
                  }
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
            </Card.Body>
          </Card>
          <Button
            as="input"
            disabled={
              state.ujmodellnev.length < 1 ||
              state.ujModellgyarto.length < 1 ||
              state.ujModellleiras.length < 1
            }
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              marginTop: "1vw",
            }}
            type="submit"
            value="Mentés és feltöltés"
            onClick={() => {
              DS.put("/api/update_modell/" + props.mod_id, {
                nev: state.ujmodellnev,
                kategoria: state.kategoria,
                gyarto: state.ujModellgyarto,
                leiras: state.ujModellleiras,
              });
              handleState("alertmessage", "Új modell feltöltve");
              handleState("alert", true);
            }}
          />
          <Card className="szerkElem" style={{ width: "90%" }}>
            <Card.Body>
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="szerkesztés"
                style={{ float: "right" }}
                onClick={() => handleState("termek", !state.termek)}
              />
              <Card.Title>Modell termékei</Card.Title>

              <Form.Group className="mb-3 adminForm">
                <Form.Label className="fw-bold">termék (id):</Form.Label>
                <Form.Select
                  defaultValue={state.termekek[0].ter_id}
                  onChange={(e) =>
                    handleState("termekindex", [
                      e.target.options.selectedIndex,
                      state.termekindex[0],
                    ])
                  }
                  disabled={state.termek}
                >
                  {state.termekek.map((model, key) => (
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
                    defaultValue={state.termekek[state.termekindex[0]].szin}
                    onChange={(e) => handleState("szin", e.target.value)}
                    disabled={state.termek}
                  >
                    <option value={state.termekek[state.termekindex[0]].szin}>
                      {state.termekek[state.termekindex[0]].szin}
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
