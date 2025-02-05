import { Navbar, Container, Nav, Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import Auth from '../utils/auth'
import SearchBar from './SearchBar'


export default function Header(){
    const [show, setShow ] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const logout = (event) =>{
        event.preventDefault()
        Auth.logout()
    }

    return(
        <>
            {/* This is just here because I want a bit of seperation between the top of the page and everything else on the login screen */}
            {!Auth.loggedIn() &&
                <div
                    className='mb-5'
                />
            }

            {/* if they're logged in, shows a logout button and an option to go home */}
            {Auth.loggedIn() && 
               <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">Cozy Camp</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {/* Add any additional nav links here if needed */}
                            </Nav>
                            <Nav className="ml-auto d-flex align-items-center">
                                <Button variant="outline-primary" className="me-2" onClick={handleShow}>
                                    Search Bar
                                </Button>
                                {(window.location.pathname !== '/') &&
                                    <Button variant="outline-success" className="me-2" href="/">
                                        Go Home
                                    </Button>
                                }
                                <Button variant="outline-danger" onClick={logout}>
                                    Logout!
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SearchBar />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}