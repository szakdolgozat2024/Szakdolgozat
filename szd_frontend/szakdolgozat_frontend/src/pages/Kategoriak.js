import { useContext, useEffect, useState } from "react"
import DataService from "../api/DataService";
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";

export default function Kategoriak(){    
    const DS = new DataService();
    const [kategoriak, setKategoriak] = useState([""]);

    useEffect(() => {
        DS.get("/api/kategoria_nevek", getKat)
    }, []);
    if (kategoriak[0] !== "") {
        document.getElementById("spinner").style.display = "none";
    }
    function getKat(data){
        setKategoriak(data.data);
    }


    return (
        <div className="inter-medium text-center">
        <h1 className="inter-bold katCim">Kategóriák</h1>
        <ul className="list-group list-group-flush">
        <Spinner animation="border" className="m-auto loadSpinner" id="spinner"/>
            {kategoriak.map((kat, index) => (<li className="list-group-item kategoriaItem" key={index}><Link to={`/kategoriak/${kat.kategoria_nev}`}>{kat.kategoria_nev}</Link></li>))}
        </ul>
        </div>
    )
}