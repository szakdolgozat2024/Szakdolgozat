import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

function RendelesModal(props) {
    const reszletek = props.rendelesReszletei;
    console.log(props.rendelesReszletei);
  return (
    <>

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h1 className="m-2">Rendelés: {reszletek[0].rendeles}</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body><ListGroup variant="flush">{reszletek.map ((resz, index) => <ListGroup.Item><p key={index}><b>Elnevezés: </b>{resz.modellNev}<br/><b>Egységár:</b> {resz.ar}<br/><b>Termék szín: </b> {resz.szin}<br/><b>Vásárolt mennyiség:</b> {resz.mennyiseg}</p></ListGroup.Item>)}</ListGroup></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Vissza
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RendelesModal;