import { useLocation } from "react-router-dom";
import { useState } from "react";
import DataService from "../api/DataService";
import ProductContainer from "../components/productContainer";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";

export default function Kereses(props) {
  const locationPath = useLocation().pathname;
  const searchWord = decodeURIComponent(locationPath.split("/")[2]);

  const DS = new DataService();
  const [state, setState] = useState({
    modellek: [],
    tolt: false,
  });

  function handleState(key, value) {
    setState({ ...state, [key]: value });
  }

  useEffect(() => {
    DS.get("/api/modell_kereses/" + searchWord, getKat);
  }, [locationPath, searchWord]);

  function getKat(data) {
    setState((prevState) => ({
      ...prevState,
      modellek: data.data,
      tolt: true,
    }));
  }

  return (
    <>
      {state.tolt ? (
        <ProductContainer modellek={state.modellek}></ProductContainer>
      ) : (
        <Spinner
          animation="border"
          className="m-auto loadingSpinner"
          id="spinner"
        />
      )}
    </>
  );
}
