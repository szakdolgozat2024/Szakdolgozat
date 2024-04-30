import SideMenu from "../components/sideMenu";
import ProductContainer from "../components/productContainer";
import { useState } from "react";
import DataService from "../api/DataService";
import Spinner from "react-bootstrap/esm/Spinner";
import "./mainpage.css";

export default function MainPage(props) {
  const DS = new DataService();
  const [state, setState] = useState({
    modellek: [""],
    tolt: false,
  })

  function handleState(key, value) {
    setState({ ...state, [key]: value });
  }

  if (state.modellek[0] === "") {
    DS.get("/api/osszes_modell_termekkel", getKat);
  } else if (state.modellek[0] !== "" && state.tolt == false) {
    handleState("tolt", true);
  }
  function getKat(data) {
    handleState("modellek", data.data);
  }

  return (
    <main className="text-center">
      <div className="mainContent mx-auto mt-20 p-80">
        <div className="row content">
          {state.tolt ? (
            <>              
              <ProductContainer
                btsCol="col-11"
                modellek={state.modellek}
              ></ProductContainer>
            </>
          ) : (
            <Spinner
              animation="border"
              className="m-auto loadingSpinner"
              id="spinner"
            />
          )}
        </div>
      </div>
    </main>
  );
}
