import { useContext, useState } from "react"
import DataService from "../api/DataService";
import Spinner from 'react-bootstrap/Spinner';
import { Link, useParams } from "react-router-dom";

export default function Kategoriak(){    
    const DS = new DataService();
    const [kategoriak, setKategoriak] = useState([""]);
    const { kateg } = useParams();
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
            {kategoriak.map((kat, index) => (<li className="list-group-item" key={index}><Link to={`/kategoriak/${kat.kategoria_nev}`}>{kat.kategoria_nev}</Link></li>))}
        </ul>
        </div>
    )
}