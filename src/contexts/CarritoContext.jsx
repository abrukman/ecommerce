import { createContext, useState } from "react";
import { useToastContext } from "./ToastContext";

export const CarritoContext = createContext();

export function CarritoProvider({children}) {
    const [productosCarrito, setProductosCarrito] = useState([]);
    const { showToast } = useToastContext();

    const hayCarrito = () => {
        if(Object.hasOwn(localStorage, 'carrito')) {
            const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'));
            console.log(carritoLocalStorage);
            setProductosCarrito(carritoLocalStorage);
        } else {
            setProductosCarrito([]);
        };
    };

    const agregarAlCarrito = (producto) => {
        const existe = productosCarrito.find(p => p.id === producto.id);
        if (existe) {
            const carritoActualizado = productosCarrito.map((p) => {
                if (p.id === producto.id) {
                    const productoActualizado = { ...p, cantidad: p.cantidad + producto.cantidad }
                    return productoActualizado;
                } else {
                    return p;
                }
            })

            setProductosCarrito(carritoActualizado);
            localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
        } else {
            setProductosCarrito([...productosCarrito, producto]);
            localStorage.setItem('carrito', JSON.stringify([...productosCarrito, producto]));
        };
        //alert('has agregado ' + producto.cantidad + ' ' + producto.nombre + ' al carrito');
        showToast(`Has agregado ${producto.cantidad} ${producto.nombre} al carrito`);
    };

    const vaciarCarrito = () => {
        setProductosCarrito([]);
        localStorage.removeItem('carrito');
    };

    function borrarProductos(id) {
      setProductosCarrito(productosCarrito.filter((p) => p.id !== id))
    };

    return (
    <CarritoContext.Provider value={{productosCarrito, agregarAlCarrito, vaciarCarrito, borrarProductos, hayCarrito}}>
        {children}
    </CarritoContext.Provider>
    );
};

