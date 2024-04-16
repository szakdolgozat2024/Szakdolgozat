import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function KosarModal(props) {

  return (
    <>

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h1 className="m-2">Fizetés</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>Biztos véglegesíted a rendelésed?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Még vásárlok!
          </Button>
          <Button variant="success" onClick={props.rendelesRogzites}>
            Véglegesítés
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default KosarModal;