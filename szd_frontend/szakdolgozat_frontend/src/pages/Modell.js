import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ProductDetails from "../components/productDetails";
import DataService from "../api/DataService";
import { useLocation } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

import "./modell.css";
import Spinner from "react-bootstrap/esm/Spinner";

export default function Modell(props) {
  const locationPath = useLocation().pathname;
  const pathsArray = locationPath.split("/");
  const mod_id = decodeURIComponent(pathsArray[2].split("=")[0]);
  const mod_nev = decodeURIComponent(pathsArray[2].split("=")[1]);
  const DS = new DataService();
  const [state, setState] = useState({tolt: false, termekek: [""], termekreszletek:{"init":false} });

  function handleState(key, value) {
    setState({ ...state, [key]: value });
  }

  if (state.termekek[0] === "") {
    DS.get("/api/modell_termekei/"+mod_id+"/"+mod_nev, getKat);
  } else if (state.termekek[0] !== "" && state.tolt == false) {
    handleState("tolt", true);
  }

  if (state.termekek[0] !== "" && state.termekreszletek.init == false) {
    state.termekreszletek.init = true;
    for (let index = 0; index < state.termekek.length; index++) {
      let termek = state.termekek[index].ter_id
      DS.get("/api/termek_tulajdonsagai/"+termek, getTer);
    }
  }

  function getKat(data) {
    handleState("termekek", data.data);
    console.log(state.termekek);
  }

  function getTer(data) {
    let meglevo = state.termekreszletek;
    for (let index = 0; index < data.data.length; index++) {
      meglevo[data.data[index].azonosito] = data.data[index];
    }
    handleState("termekreszletek", meglevo);
    console.log(state.termekreszletek);
  }
  

  return (
    <div>
    {state.tolt ? (<Container fluid="true" className="ModellContainer h-60">
    <Row className="ModellRow">
      <Col xs={8} key={1}  className="ModellKepek">
        <Carousel>
          {state.termekek.map((mod, i) => (
            <Carousel.Item key={i}>
              <img alt="" src="https://www.archiproducts.com/images/sharingimage/1390.jpg"></img>
              <Carousel.Caption>{mod.szin}</Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col className="ModellAdatok">
        <ProductDetails name={mod_nev} termekek={state.termekek} vendeg={props.vendeg}/>
        <Alert className="mt-3" id="alert" variant="danger" style={{display: 'none'}}>
          Kosárba tétel előtt jelentkezz be vagy regisztrálj!
        </Alert>
      </Col>
    </Row>
  </Container>) : (<Spinner animation="border" className="m-auto loadingSpinner" id="spinner"/>)}
  </div>
  );
}
