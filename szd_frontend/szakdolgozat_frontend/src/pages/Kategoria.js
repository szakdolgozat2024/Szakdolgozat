import { useLocation, useParams } from "react-router-dom";
import Bejelentkezes from "./Bejelentkezes";
import Spinner from "react-bootstrap/esm/Spinner";
import DataService from "../api/DataService";
import { useEffect, useState } from "react";
import CostumCard from "../components/card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function Kategoria() {
  const [modellek, setModellek] = useState([""]);
  const locationPath = useLocation().pathname;
  console.log(useLocation());
  const pathsArray = locationPath.split("/");
  const kateg = decodeURIComponent(pathsArray[2]);
  const DS = new DataService();

  const [tolt, setTolt] = useState(true);
  useEffect(() => {
    DS.get("/api/adott_kategoria/" + kateg, getAdottModell);
  }, []);

  useEffect(() => {
    if (modellek[0] !== "") {
      setTolt(false);
    }
  }, [modellek]);


  function getAdottModell(data) {
    setModellek(data.data);
  }

  return (
    <>
      {tolt ? (
        <Spinner
          animation="border"
          className="m-auto loadingSpinner"
          id="spinner"
        />
      ) : (
        <div className="inter-medium text-center">
          <Breadcrumb>
            <Breadcrumb.Item href="/">kezdőlap</Breadcrumb.Item>
            <Breadcrumb.Item href="/kategoriak">kategóriák</Breadcrumb.Item>
            <Breadcrumb.Item active>{kateg}</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="inter-bold mb-5">{kateg}</h1>

          <Row xs={1} md={3} lg={3} className="g-4">
            {modellek.map((model, idx) => (
              <Col key={idx}>
                <CostumCard
                  cardClass="productCard"
                  bodyClass="productBody"
                  inCardGroup={true}
                  cardImage={model.kep == null ? "kepek/placeholder.png" : model.kep}
                  cardTitle={model.nev}
                  titleClass="inter-medium"
                  linkTo={"/termek/" + model.mod_id + "=" + model.nev} //link mint string Link komponenshez
                  routeData={{ id: model.mod_id, name: model.nev }} //object a routeoláshoz (ebből jön létre a link)
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
}
