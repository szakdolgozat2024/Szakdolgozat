import SideMenu from "../components/sideMenu";
import ProductContainer from "../components/productContainer";
import { useState } from "react";
import DataService from "../api/DataService";
import Spinner from "react-bootstrap/esm/Spinner";
import "./mainpage.css";

export default function MainPage(props) {
  const DS = new DataService();
  const [modellek, setModellek] = useState([""]);
  const [tolt, setTolt] = useState(false);

  if (modellek[0] === "") {
    DS.get("/api/osszes_modell", getKat);
  } else if (modellek[0] !== "" && tolt == false) {
    setTolt(true);
  }
  function getKat(data) {
    setModellek(data.data);
  }

  return (
    <main className="text-center">
      <div className="mainContent mx-auto mt-20 p-80">
        <div className="row content">
          {tolt ? (
            <>
              <SideMenu btsCol="col-1"></SideMenu>
              <ProductContainer
                btsCol="col-11"
                modellek={modellek}
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
