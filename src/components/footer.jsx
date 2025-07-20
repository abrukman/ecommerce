//import '../estilos/footer.css';

import { Nav, Navbar } from "react-bootstrap";

function Footer() {
    return(
        <Nav className="bg-secondary fixed-bottom" data-bs-theme='dark'>
            <p className="text-center w-100 my-auto">BDM oficial - 2025 <span className="license">Ⓒ</span></p>
        </Nav>
    )
};

export default Footer;