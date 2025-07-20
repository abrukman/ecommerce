import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import '../estilos/tarjetaProducto.css'

function Tarjeta({producto}) {

    return(
        <Card style={{ width: '18rem' }} key={producto.id}>
            <Card.Img variant="top" src={producto.imagen} alt={'foto de '+producto.nombre}/>
            <Card.Body>
            <Card.Title>{producto.nombre}</Card.Title>
            <Link to={'/productos/'+ producto.id}>
                <Button variant="secondary">ver más</Button>
            </Link>
            </Card.Body>
        </Card>
    )
}

export default Tarjeta;