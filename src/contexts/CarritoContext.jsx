import { createContext, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({children}) {
    const [productosCarrito, setProductosCarrito] = useState([]);

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
        } else {
            setProductosCarrito([...productosCarrito, producto])
        };
        alert('has agregado ' + producto.cantidad + ' ' + producto.name + ' al carrito');
    };

    const vaciarCarrito = () => {
        setProductosCarrito([]);
    };

    function borrarProductos(id) {
      setProductosCarrito(productosCarrito.filter((p) => p.id !== id))
    };

    return (
    <CarritoContext.Provider value={{productosCarrito, agregarAlCarrito, vaciarCarrito, borrarProductos}}>
        {children}
    </CarritoContext.Provider>
    );
};

