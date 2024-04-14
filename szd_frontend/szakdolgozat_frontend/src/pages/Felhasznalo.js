import { useState } from "react";
import DataService from "../api/DataService";
import Bejelentkezes from "./Bejelentkezes";
import Cookies from "js-cookie";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import Rendelesek from "./Rendelesek";

export default function Felhasznalo(){

    const navigate = useNavigate();
    const DS = new DataService();
  const [user, setUser] = useState("");
  if (user === "") {
    let tryuser = getUser();
    if (tryuser != {}) {
      DS.get(`/api/bejelentkezett_user/${tryuser.email}/${tryuser.password}`, getBejelentkezettUser);
    }
  } else {
    document.getElementById("spinner").style.display = "none";
}

  function getBejelentkezettUser(data) {
    console.log(data.data[0]);
    setUser(data.data[0]);
  }

  function getUser() {
    let tryuser = Cookies.get("bejelentkezett_user");
    if (tryuser === undefined) {
      tryuser = {};
    } else {
      tryuser = JSON.parse(tryuser);
    }
    return tryuser;
  }


  function kijelentkezes(){
    Cookies.remove("bejelentkezett_user");
    window.location.reload();
  }
    return (
        <div className="container mt-5 mb-5 text-center m-auto">
            <Card style={{ width: "50rem" }}
            className="m-auto">
                <Card.Title><h1 className="m-2">Felhasználói adatok</h1></Card.Title>
                <Spinner animation="border" className="m-auto" id="spinner"/>
                <Card.Body className="text-start ps-5">
                    <p><b>Név: </b>{user.name}</p>
                    <p><b>Email: </b>{user.email}</p>
                    <p><b>Hozzáférés: </b>{user.hozzaferes?"admin":"vásárló"}</p>
                </Card.Body>            
                <div className="text-end container m-auto mb-4">
            <button className="btn btn-danger" onClick={kijelentkezes}>Kijelentkezés</button>
            </div>
            </Card>
            <Rendelesek user = {user}/>
            
            
            
            


        </div>
    )
}