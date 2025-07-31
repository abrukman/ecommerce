import { createContext, useContext, useState } from "react";
import { useToastContext } from "./ToastContext";

const ProductosContext = createContext();
export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [productoEncontrado, setProductoEncontrado] = useState([]);
    const { showToast } = useToastContext();
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    function obtenerProductos() {
        return(
        fetch('https://68332333c3f2222a8cb508d1.mockapi.io/productos')
        .then((respuesta) => (respuesta.json()))
        .then((datos) => {
            setProductos(datos);
            setProductosFiltrados(datos);
        })
        .catch((error) => {
            console.log(error);
        }));
    };

    function filtrarProducto(input) {
        if (input.trim()=== 0) {
            setProductosFiltrados(productos);
        } else {
            const resultado = productos.filter((producto) => producto.nombre.toLowerCase().includes(input.toLowerCase()));
            setProductosFiltrados(resultado);
            };
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
            showToast(`Se ha agregado ${producto.nombre} correctamente`, 'success');
            } 
        catch (error) {
        showToast(`${error.code} ${error.message}`, 'danger');
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
                            showToast('Producto no encontrado', 'danger');
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
                showToast('No se puede actualizar el producto', 'danger');
            }
            const data = await respuesta.json();
            showToast(`${producto.nombre} actualizado correctamente`, 'success');
        }
        catch(error) {
            showToast(`${error.code} ${error.message}`, 'danger');
        };
    };

    async function eliminarProducto(producto) {
        try {
            const respuesta = await fetch(`https://68332333c3f2222a8cb508d1.mockapi.io/productos/${producto.id}`, {
                method: 'DELETE',
            });
            if(!respuesta.ok) {
                showToast('No se puede eliminar el producto', 'danger');
            }
            showToast(`${producto.nombre} eliminado correctamente`, 'success');
        }
        catch(error) {
            showToast(`${error.code} ${error.message}`, 'danger');
        };
    }


    return (
        <ProductosContext.Provider value={{productos, productosFiltrados, obtenerProductos, agregarProducto, obtenerProducto, productoEncontrado, actualizarProducto, eliminarProducto, filtrarProducto}}>
            {children}
        </ProductosContext.Provider>
    );
}

export const useProductosContext = () => useContext(ProductosContext);
