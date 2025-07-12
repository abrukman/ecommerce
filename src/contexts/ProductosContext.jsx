import { createContext, useContext, useState } from "react";

const ProductosContext = createContext();
export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [productoEncontrado, setProductoEncontrado] = useState([]);

    function obtenerProductos() {
        return(
        fetch('https://68332333c3f2222a8cb508d1.mockapi.io/productos')
        .then((respuesta) => (respuesta.json()))
        .then((datos) => {
            //console.log(datos);
            setProductos(datos);
            //setCargando(false);
        })
        .catch((error) => {
            console.log(error)
            //setError('Hubo un problema al cargar los productos');
            //setCargando(false);
        }));
    };

    const agregarProducto = async (producto) => {
        try {
            const respuesta = await fetch('https://68332333c3f2222a8cb508d1.mockapi.io/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });
            const data = await respuesta.json();
            console.log('Producto agregado: ', data);
            alert(`Se ha agregado ${producto.nombre} correctamente`);
            } 
        catch (error) {
        alert(error.message);
        } 
    }

    function obtenerProducto(id) {
        return(
            fetch('https://68332333c3f2222a8cb508d1.mockapi.io/productos')
                .then((respuesta) => (respuesta.json()))
                .then((datos) => {
                    const productoEncontrado = datos.find((item) => item.id === id);
                    if (productoEncontrado) {
                        setProductoEncontrado(productoEncontrado);
                        } else {
                            alert('producto no encontrado');
                        }
                    })
                .catch((error) => {
                    console.log(error)
                })
            )   
    }
    
    async function actualizarProducto(producto) {
        try {
            const respuesta = await fetch(`https://68332333c3f2222a8cb508d1.mockapi.io/productos/${producto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });
            if(!respuesta.ok) {
                alert('No se puede actualizar el producto');
            }
            const data = await respuesta.json();
            alert(`${producto.nombre} actualizado correctamente`);
        }
        catch(error) {
            alert(error.message);
        };
    };


    return (
        <ProductosContext.Provider value={{productos, obtenerProductos, agregarProducto, obtenerProducto, productoEncontrado, actualizarProducto}}>
            {children}
        </ProductosContext.Provider>
    );
}

export const useProductosContext = () => useContext(ProductosContext);
