import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";


/**
 * Propsok AmountCounterhöz: 
 *
 * @prop {number} [minAmount=1] - A minimum amount, amit a gombokra kattintva beállítható
 * @prop {number} [maxAmount=10] - A maximum amount, amit a gombokra kattintva beállítható
 * @prop {function} quantityChange - A függvény, amelyet meghív a szám változásakor. Egy paramétert ad át neki.
 * @prop {number} [quantity=1] - A kezdeti összeg 
 * @prop {number} [minusAmount=1] - Az aktuális összegből kivonandó érték, amikor a '-' gombot nyomják
 * @prop {number} [plusAmount=1] - Az aktuális összeghez hozzáadandó érték, amikor a '+' gombot nyomják
 * @prop {boolean} [disabled=false] - A counter kikapcsolása, ha igaz
 * 
 */

export default function AmountCounter(props) {
  function quantityChange(params) {
    if (params < (props.minAmount || 1)) {
        props.stateSet(props.minAmount || 1); 
    } else if(params > (props.maxAmount || 10)) {
      props.stateSet(props.maxAmount || 10); 
    }else {
        props.stateSet(props.stateKey, params);
    }
  }
  return (
    <InputGroup className="mb-3 termekAmount">
      <Button
        disabled={props.disabled}
        onClick={() => quantityChange(props.quantity - (props.minusAmount || 1))}
        variant="outline-secondary"
        id="button-addon1"
      >
        -
      </Button>
      <Form.Control
        disabled={props.disabled}
        className="termekAmountText"
        value={props.quantity}
        onChange={e => quantityChange(Number(e.target.value))} 
      />
      <Button
        disabled={props.disabled}
        onClick={() => quantityChange(props.quantity + (props.plusAmount || 1))}
        variant="outline-secondary"
        id="button-addon1"
      >
        +
      </Button>
    </InputGroup>
  );
}
