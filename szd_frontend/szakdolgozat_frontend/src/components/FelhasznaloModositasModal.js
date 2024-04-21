import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FelhasznaloModositasModal(props) {
  
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="m-2">Felhasználó módosítása:</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="m-3">
        <p>
          <b>Név: </b>
          <input
            type="text"
            placeholder={props.user.name}
            className="form-control"
            onChange={(e) => {
              props.setName(e.target.value);
            }}
          ></input>
        </p>
        <p>
          <b>Email: </b>
          <input
            type="text"
            placeholder={props.user.email}
            className="form-control"
            onChange={(e) => {
                props.setEmail(e.target.value);
            }}
          ></input>
        </p>
        <p>
          <b>Cim: </b>
          <input
            type="text"
            placeholder={props.user.cim}
            className="form-control"
            onChange={(e) => {
                props.setCim(e.target.value);
            }}
          ></input>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.handleClose}>
          Mégse
        </Button>
        <Button variant="success" onClick={props.mentesKezeles}>
          Mentés
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FelhasznaloModositasModal;
