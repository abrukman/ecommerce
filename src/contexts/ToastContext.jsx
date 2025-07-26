import { createContext, useCallback, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastContext = createContext();
export function ToastProvider({ children }) {
    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [variant, setVariant] = useState('success');

    const showToast = useCallback((msj, type = 'success') => {
    setMensaje(msj);
    setVariant(type);
    setShow(true);
    }, []);

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}

            <ToastContainer position='top-end' className='p-3'>
                <Toast bg={variant} show={show} onClose={() => setShow(false)} autohide delay={3000}>
                    <Toast.Header closeButton>
                        <small>laTienda</small>
                    </Toast.Header>
                    <Toast.Body className='text-white'>
                        {mensaje}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </ToastContext.Provider>
    )
};

export const useToastContext = () => useContext(ToastContext);



