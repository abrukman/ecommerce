export const validarFormulario = (producto) => {
    const nuevosErrores = {};

    if(!producto.nombre.trim() || producto.nombre.length < 3) {
        nuevosErrores.nombre = 'El nombre es obligatorio y debe tener al menos 3 caracteres'
    }

    const precio = parseFloat(producto.precio);
    if (!precio || precio < 0) {
        nuevosErrores.precio = 'El precio debe ser mayor a 0'
    }

    if (!producto.descripcion || producto.descripcion.length < 10) {
        nuevosErrores.descripcion = 'La descripcion debe tener al menos 10 caracteres'
    };

    return nuevosErrores; 
};