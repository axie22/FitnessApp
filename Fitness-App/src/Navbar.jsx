import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navigation() {
    return (
        <>
        <Navbar bg="light" variant="light">
            <Container>
            <Navbar.Brand className="nav-brand" href="/">Iron Grip</Navbar.Brand>
            <Nav className="me-auto">
                {/** Navbar active link is not working
                 * activeclassName="active-nav-title"
                 */
                    
                }
                <Nav.Link as={NavLink} to="/workout" className="nav-title !important" >
                    Record Workout
                </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        </>
    );
}