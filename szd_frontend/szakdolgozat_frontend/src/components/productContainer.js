import Product from "./product";
import "./productContainer.css";
import DataService from "../api/DataService";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import CostumCard from "./card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function ProductContainer(props) {
  const images = [
    "https://backend.orbitvu.com/sites/default/files/image/cover-FURNITURE-studio%20%281%29_0.jpg",
    "https://www.archiproducts.com/images/sharingimage/1390.jpg",
  ];
  const DS = new DataService();
  const [modellek, setModellek] = useState([""]);

  if (modellek[0] === "") {
    
    DS.get("/api/osszes_modell", getKat);
  } else {
    document.getElementById("spinner").style.display = "none";
  }

  function getKat(data) {
    setModellek(data.data);
  }

  return (
    <div className={props.btsCol + " productContainer"}>
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
              linkTo={"termek/"+ model.mod_id+"="+model.nev} //link mint string Link komponenshez
              routeData={{"id":model.mod_id, "name":model.nev}} //object a routeoláshoz (ebből jön létre a link)
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
