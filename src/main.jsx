import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CarritoProvider } from './contexts/CarritoContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProductosProvider } from './contexts/ProductosContext.jsx';
import { ToastProvider } from './contexts/ToastContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './estilos/custom.scss';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <ProductosProvider>
        <AuthProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </AuthProvider>
      </ProductosProvider>
    </ToastProvider>
  </StrictMode>,
)
