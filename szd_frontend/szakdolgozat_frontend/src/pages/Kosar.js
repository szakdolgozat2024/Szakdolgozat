import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
export default function Kosar(){
    return (
        <div className='container mt-5 mb-5 text-center m-auto '>
            
            <Card style={{ width: '50rem' }} className='m-auto'>
      <Card.Body>
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