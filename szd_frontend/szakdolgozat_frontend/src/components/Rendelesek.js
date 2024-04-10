import Card from 'react-bootstrap/Card';
import DataService from '../api/DataService';
import { useState } from 'react';

export default function Rendelesek(props) {
    const [rendelesek, setRendelesek] = useState([""]); 
    const DS = new DataService();
    const user = props.user;

    if (rendelesek[0] === "") {
        DS.get(`/api/user_rendelesei/${user.azon}`, getRendelesek);
    }

    function getRendelesek(data) {
        setRendelesek(data.data);
        console.log(data.data);
    }

    return (
        <Card style={{ width: "50rem" }}
            className="m-auto mt-3 p-4">
            <Card.Title className="text-center"><h1>Rendelesek</h1></Card.Title>
            <Card.Text className="text-muted">
                {rendelesek.map((elem, index) => <p key={index}>{elem.rend_szam}</p>)}
            </Card.Text>
            </Card>
    )
}