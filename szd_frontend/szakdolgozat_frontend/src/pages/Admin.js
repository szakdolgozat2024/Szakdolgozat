import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TermekAdatok from "../components/termekAdatok";
import ListGroup from "react-bootstrap/ListGroup";
import DataService from "../api/DataService";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import "./admin.css";

export default function Admin() {
  const DS = new DataService();
  const [modellek, setModellek] = useState([""]);
  const [tolt, setTolt] = useState(false);
  const [szerkesztes, setSzerkesztes] = useState(false);
  const [valasztott, setValasztott] = useState([0, ""]);

  if (modellek[0] === "") {
    DS.get("/api/osszes_modell", getKat);
  } else if (modellek[0] !== "" && tolt == false) {
    setTolt(true);
  }
  function getKat(data) {
    setModellek(data.data);
  }

  function handleValasztott(modell, modellNev) {
    setSzerkesztes(true);
    setValasztott([modell, modellNev]);
  }

  return (
    <div>
      {tolt ? (
        <Tabs
          defaultActiveKey="Modellek"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Modellek" title="Modellek kezelése">
            <div style={{ margin: "auto" }}>
              {szerkesztes ? (
                <>
                  <Button
                    as="input"
                    className="align-middle"
                    
                    type="submit"
                    value="Vissza"
                    onClick={() => setSzerkesztes(false)}
                  />
                  <TermekAdatok mod_id={valasztott[0]} mod_nev={valasztott[1]} />
                </>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      {Object.keys(modellek[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                      <th>Szerkesztés</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modellek.map((model, index) => (
                      <tr>
                        <td>{model.mod_id}</td>
                        <td>{model.nev}</td>
                        <td>{model.leiras}</td>
                        <td>{model.kategoria}</td>
                        <td>{model.gyarto}</td>
                        <td>
                          <Button
                            as="input"
                            className="align-middle"
                            style={{ width: "100%" }}
                            type="submit"
                            value="✏"
                            onClick={() => handleValasztott(model.mod_id, model.nev)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </Tab>
          <Tab eventKey="Kategoriak" title="Kategóriák kezelése">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Tab>
          <Tab eventKey="Felhasznalok" title="Felhasználókezelés">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Tab>
          <Tab eventKey="Rendelesek" title="Rendelések">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
