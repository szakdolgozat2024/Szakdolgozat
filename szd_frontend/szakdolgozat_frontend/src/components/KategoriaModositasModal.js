import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function KategoriaModositasModal(props) {

  return (
    <>

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h1 className="m-2">Módosítás: {props.kivalasztottKat.kat_id}</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Kategória neve</label>
          <input
            type="text"
            placeholder={props.kivalasztottKat.kategoria_nev}
            className="form-control"
            onChange={(e) => props.setKatNev(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Mégse
          </Button>
          <Button variant="success" onClick={props.modositasRogzites}>
            Módosítás
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default KategoriaModositasModal;