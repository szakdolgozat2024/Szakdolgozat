import { useLocation } from "react-router-dom";
import { useState } from "react";
import DataService from "../api/DataService";
import ProductContainer from "../components/productContainer";
import { Spinner } from "react-bootstrap";


export default function Kereses(props) {
    const locationPath = useLocation().pathname;
    const searchWord = decodeURIComponent(locationPath.split("/")[2]);
  
    const DS = new DataService();
    const [state, setState] = useState({
      modellek: [""],
      tolt: false,
    });
  
    function handleState(key, value) {
      setState({ ...state, [key]: value });
    }
  
    if (state.modellek[0] === "") {
      DS.get("/api/modell_kereses/" + searchWord, getKat);
    } else if (state.modellek[0] !== "" && state.tolt == false) {
      handleState("tolt", true);
    }
    function getKat(data) {
      handleState("modellek", data.data);
    }
  
    return (<>
      {state.tolt ? (
          <ProductContainer modellek={state.modellek}></ProductContainer>
      ):(<Spinner animation="border" className="m-auto loadingSpinner" id="spinner"/>)}
      </>
    );
  }
