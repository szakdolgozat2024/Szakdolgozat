import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cookies from 'js-cookie';

export default function Kosar(){
  function getkosar() { //félkész, nem kéne 2 ugyanolyan id formátum {temek_id, mennyiseg}
      let kosar = Cookies.get("kosar");
      kosar = kosar.split(";");
      for (let i = 0; i < kosar.length; i++) {
        kosar[i] = JSON.parse(kosar[i]);
      }
      console.log(kosar);
  }

    return (
        <div className='container mt-5 mb-5 text-center m-auto '>
            
            <Card style={{ width: '50rem' }} className='m-auto'>
      <Card.Body onClick={getkosar}>
        <Card.Title><h1>Kosár</h1></Card.Title>
        <Card.Text className="text-muted">
          Itt jelenik meg majd a kosár tartalma.
        </Card.Text>
        <div className='text-end'><Button variant="primary" className>Tovább a fizetéshez</Button></div>
        
      </Card.Body>
    </Card>
        </div>
    )
}