import SideMenu from "../components/sideMenu";
import ProductContainer from "../components/productContainer";
import { useEffect, useState } from "react";
import DataService from "../api/DataService";
import Spinner from "react-bootstrap/esm/Spinner";
import "./mainpage.css";

export default function MainPage(props) {
  const DS = new DataService();
  const [state, setState] = useState({
    modellek: [""],
    tolt: true,
  })

  function handleState(key, value) {
    setState({ ...state, [key]: value });
  }

  useEffect(() => {
    DS.get("/api/osszes_modell_termekkel", getKat);
  }, []);
  if (state.modellek[0] !== "" && state.tolt == true) {
    handleState("tolt", false);
  }
  function getKat(data) {
    handleState("modellek", data.data);
  }

  return (
    <main className="text-center">
      <div className="mainContent mx-auto mt-20 p-80">
        <div className="row content">
          {!state.tolt ? (
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
