import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdminAdatok from "../components/adminAdatok";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import DataService from "../api/DataService";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import "./admin.css";
import Beszerzes from "../components/Beszerzes";
import RendelesekAdmin from "../components/RendelesekAdmin";
import FelhasznalokAdmin from "../components/FelhasznalokAdmin";
import KategoriakAdmin from "../components/KategoriakAdmin";

export default function Admin() {
  const DS = new DataService();
  const [state, setState] = useState({
    modellek: [""],
    ujModellLista: [],
    kategoriak: [""],
    szerkesztes: false,
    tolt: true,
    ujModell: false,
    valasztott: [[0, "", ""]],
    kereses: ""
  });

  useEffect(() => {
    DS.get("/api/osszes_modell", getMod);
    DS.get("/api/osszes_kategoria", getKat);
  }, []);

  useEffect(() => {
    if (state.modellek[0] !== "") {
      handleState("tolt", false);
    }
  }, [state.modellek]);

  function handleState(key, value) {
    setState((prevState) => ({ ...prevState, [key]: value }));
  }

  function getMod(data) {
    handleState("modellek", data.data);
  }

  function getKat(data) {
    handleState("kategoriak", data.data);
  }

  function handleValasztott(modell, modellNev) {
    handleState("szerkesztes", true);
    handleState("valasztott", [modell, modellNev]);
  }

  function modellKereses(kereses) {
    state.ujModellLista = [];
    if (kereses !== "") {
      state.modellek.forEach((modell) => {
        if (modell.nev.toLowerCase().includes(kereses.toLowerCase())) {
          state.ujModellLista.push(modell);
        }
      });
      return state.ujModellLista;
    }else{
      return state.modellek
    }

  }
  

  return (
    <div className="inter-regular">
      {!state.tolt ? (
        <Tabs
          defaultActiveKey="Modellek"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Modellek" title="Modellek kezelése">
            <div style={{ margin: "auto" }}>
              {state.szerkesztes ? (
                <>
                  <Button
                    as="input"
                    className="align-middle"
                    type="submit"
                    value="Vissza"
                    onClick={() => {
                      DS.get("/api/osszes_modell", getMod);
                      handleState("szerkesztes", false);
                      handleState("modellek", [""]);
                      handleState("tolt", true);
                    }}
                  />
                  <AdminAdatok
                    mod_id={state.valasztott[0]}
                    mod_nev={state.valasztott[1]}
                    kategoriak={state.kategoriak}
                  />
                </>
              ) : (
                <>
                  {state.ujModell ? (
                    <>
                      <Button
                        as="input"
                        className="align-middle"
                        type="submit"
                        value="Vissza"
                        onClick={() => {
                          DS.get("/api/osszes_modell", getMod);
                          handleState("ujModell", true);
                          handleState("ujModell", false);
                        }}
                      />
                      <AdminAdatok
                        ujModell={true}
                        kategoriak={state.kategoriak}
                      />
                    </>
                  ) : (
                    <>
                      <Form style={{ margin: "0.5vw" }}>
                        <Row>
                          <Col lg={10}>
                            <Form.Label className="fw-bold" column sm={2}>
                              Keresés:
                            </Form.Label>
                            <Form.Control
                              style={{ width: "30%" }}
                              placeholder="Modell neve"
                              onChange={(e)=>{handleState("kereses",e.target.value)}}
                            />
                          </Col>
                          <Col
                            style={{ textAlign: "center", marginTop: "auto" }}
                          >
                            <Button
                              onClick={() => handleState("ujModell", true)}
                              style={{ width: "100%" }}
                            >
                              Új Modell hozzáadása
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            {Object.keys(state.modellek[0]).map((key) => (
                              <th key={key}>{key}</th>
                            ))}
                            <th>Szerkesztés</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modellKereses(state.kereses).map((model, index) => (
                            <tr key={index}>
                              <td>{model.mod_id}</td>
                              <td>{model.nev}</td>
                              <td>{model.leiras}</td>
                              <td>{model.kategoria}</td>
                              <td>{model.gyarto}</td>
                              <td>
                                <Button
                                  as="input"
                                  className="align-middle"
                                  style={{ width: "100%", color: "black" }}
                                  type="submit"
                                  variant="outline-warning"
                                  value="Szerkesztés"
                                  onClick={() =>
                                    handleValasztott(model.mod_id, model.nev)
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  )}
                </>
              )}
            </div>
          </Tab>
          <Tab eventKey="Kategoriak" title="Kategóriák kezelése">
            <KategoriakAdmin />
          </Tab>
          <Tab eventKey="Felhasznalok" title="Felhasználókezelés">
            <FelhasznalokAdmin />
          </Tab>
          <Tab eventKey="Rendelesek" title="Rendelések">
            <RendelesekAdmin />
          </Tab>
          <Tab eventKey="Beszerzés" title="Beszerzés">
            <Beszerzes />
          </Tab>
        </Tabs>
      ) : (
        <Spinner
          animation="border"
          className="m-auto loadingSpinner"
          id="spinner"
        />
      )}
    </div>
  );
}
