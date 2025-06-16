import { Link } from 'react-router-dom';
import '../estilos/tarjetaProducto.css'

function Tarjeta({producto}) {

    // const [cantidad, setCantidad] = useState(1);

    /* function agregarAlCarrito() {
        funcionCarrito({...producto, cantidad});
    };

    function sumarCantidad() {
        setCantidad(cantidad + 1);        
    };

    function restarCantidad() {
        cantidad === 1 ? setCantidad = 1 : setCantidad(cantidad - 1);
    }; */

    return(
        <div className='tarjeta' key={producto.id}>
            <img src={producto.imagen} alt={'foto de '+producto.name}/>
            <h2>{producto.name}</h2>
            <p className='precio'>${producto.precio}</p>
            <Link to={'/productos/' + producto.id}><button>ver mas</button></Link>
        </div>
    )
}

export default Tarjeta;