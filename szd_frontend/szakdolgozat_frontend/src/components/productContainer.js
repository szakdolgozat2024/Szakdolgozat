import Product from "./product"
import "./productContainer.css"
import DataService from "../api/DataService";
import Spinner from 'react-bootstrap/Spinner';
import { useState } from "react";

function sorMegjelenito(index) {
    if (index % 2 === 0) {
        
    }
}

export default function ProductContainer(props) {
    const  images = ["https://backend.orbitvu.com/sites/default/files/image/cover-FURNITURE-studio%20%281%29_0.jpg", "https://www.archiproducts.com/images/sharingimage/1390.jpg"]
    const DS = new DataService();
    const [modellek, setModellek] = useState([""]);
    if (modellek[0] === "") {
        DS.get("/api/osszes_modell", getKat)
    } else {
        document.getElementById("spinner").style.display = "none";
    }
    function getKat(data){
        setModellek(data.data);
    }

    return(
        <div className={props.btsCol+" productContainer"}>
        <Spinner animation="border" className="m-auto" id="spinner"/>
            {modellek.map((mod, index) => <div className="row">
                <Product key={index} link={mod.nev} bgimage={images[0]} btsCol="col-4"/><Product bgimage={images[1]} btsCol="col-8"/> 
            </div>)}
    </div>
    )
}