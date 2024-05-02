import "./productContainer.css";
import DataService from "../api/DataService";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import CostumCard from "./card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function ProductContainer(props) {
  const images = [
    "kepek/fur1.jpg",
    "kepek/fur2.jpg",
    "kepek/fur3.jpg",
    "kepek/fur4.jpg",
    "kepek/fur5.jpg",
    "kepek/fur6.jpg",
    "kepek/fur7.jpg",
    "kepek/fur8.jpg",
    "kepek/fur9.jpg",
    "kepek/fur10.jpg"
  ];


  
  return (
    <div className={props.btsCol + " productContainer m-auto"}>
      <Row xs={1} md={3} lg={3} className="g-4">
        {props.modellek.map((model, idx) => (
          <Col key={idx}>
            <CostumCard
              cardClass="productCard text-center"            
              bodyClass="productBody"
              inCardGroup={true}
              cardImage={images[idx]}
              cardTitle={model.nev}
              titleClass="inter-medium"
              linkTo={"/termek/"+ model.mod_id+"="+model.nev} 
              routeData={{"id":model.mod_id, "name":model.nev}} 
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
