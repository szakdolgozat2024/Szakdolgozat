import { useLocation, useParams } from "react-router-dom";
import Bejelentkezes from "./Bejelentkezes";
import Spinner from "react-bootstrap/esm/Spinner";
import DataService from "../api/DataService";
import { useState } from "react";
import CostumCard from "../components/card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default function Kategoria() {
  const [modellek, setModellek] = useState([""]);
  const locationPath = useLocation().pathname;
  const pathsArray = locationPath.split("/");
  const kateg = decodeURIComponent(pathsArray[2]);
  const DS = new DataService();
  if (modellek[0] === "") {
    DS.get("/api/adott_kategoria/" + kateg, getAdottModell);
  } else {
    document.getElementById("spinner").style.display = "none";
  }

  const images = [
    "https://backend.orbitvu.com/sites/default/files/image/cover-FURNITURE-studio%20%281%29_0.jpg",
    "https://www.archiproducts.com/images/sharingimage/1390.jpg",
  ];

  function getAdottModell(data) {
    setModellek(data.data);
  }

  return (
    <div>
    <Breadcrumb>
      <Breadcrumb.Item href="/">kezdőlap</Breadcrumb.Item>
      <Breadcrumb.Item href="/kategoriak">
        kategóriák
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{kateg}</Breadcrumb.Item>
    </Breadcrumb>
      <h1>{kateg}</h1>
      <Spinner animation="border" className="m-auto" id="spinner" />
      <Row xs={1} md={3} lg={3} className="g-4">
        {modellek.map((model, idx) => (
          <Col key={idx}>
            <CostumCard
              cardClass="productCard"
              bodyClass="productBody"
              inCardGroup={true}
              cardImage={images[0]}
              cardTitle={model.nev}
              linkTo={"termek/" + model.mod_id + "=" + model.nev} //link mint string Link komponenshez
              routeData={{ id: model.mod_id, name: model.nev }} //object a routeoláshoz (ebből jön létre a link)
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
