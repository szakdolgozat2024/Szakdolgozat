import AmountCounter from "./amountCounter";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function TermekReszletek(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div style={{ marginTop: "1vw", marginBottom: "1vw" }}>
      <Row>
        <Col xl={1}>
          <p className="fw-bold" style={{ marginBottom: "0.5vw" }}>
            Ár:
          </p>
        </Col>
        <Col xl={4}>
          <AmountCounter
            state={props.state}
            stateKey={props.stateKey}
            className="termekAmount"
            quantity={props.ar}
            minusAmount={1000}
            plusAmount={1000}
            quantityChange={props.quantityChange}
            minAmount={1}
            maxAmount={10000000}
            disabled={props.disabled}
          />
        </Col>
      </Row>
    </div>
  );
}
