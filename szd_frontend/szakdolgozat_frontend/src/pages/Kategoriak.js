import { useState } from "react"
import DataService from "../api/DataService";
import Spinner from 'react-bootstrap/Spinner';

export default function Kategoriak(){    
    const DS = new DataService();
    const [kategoriak, setKategoriak] = useState([""]);
    if (kategoriak[0] === "") {
        DS.get("/api/kategoria_nevek", getKat)
    } else {
        document.getElementById("spinner").style.display = "none";
    }
    function getKat(data){
        setKategoriak(data.data);
    }


    return (
        <div >
        <h1>Kategóriák</h1>
        <ul className="list-group list-group-flush">
        <Spinner animation="border" className="m-auto" id="spinner"/>
            {kategoriak.map((kat, index) => <li className="list-group-item" key={index}>{kat.kategoria_nev}</li>)}
        </ul>
        </div>
    )
}