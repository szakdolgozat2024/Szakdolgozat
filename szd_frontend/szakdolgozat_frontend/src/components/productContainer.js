import "./productContainer.css";
import DataService from "../api/DataService";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import CostumCard from "./card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function ProductContainer(props) {


  
  return (
    <div className={props.btsCol + " productContainer m-auto"}>
      <Row xs={1} md={3} lg={3} className="g-4">
        {props.modellek.map((model, idx) => (
          <Col key={idx}>
            <CostumCard
              cardClass="productCard text-center"            
              bodyClass="productBody"
              cardImage={model.kep == null ? "/kepek/placeholder.png" : model.kep}
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
