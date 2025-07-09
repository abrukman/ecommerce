export const agregarProducto = async (producto) => {
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
    } catch (error) {
        alert(error.message);
    }
}