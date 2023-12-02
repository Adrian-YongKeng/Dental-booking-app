import React, { useContext, useState } from 'react';
import { Button, Form, Modal, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { addBooking, resetBookings } from '../features/posts/bookingsSlice';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { getAuth, signOut } from 'firebase/auth';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [services, setServices] = useState('');
    const [comment, setComment] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [ShowBookingModal, setShowBookingModal] = useState(false);
    
    const { currentUser } = useContext(AuthContext);
    const auth = getAuth();


    const handleBookNowClick = () => {
        if (currentUser) {
            setShowBookingModal(true);
        } else {
            navigate("/login");
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhoneNumber('');
        setServices('');
        setComment('');
        setBookingDate('');
        setBookingTime('');
      };

    const confirmBooking = (e) => {
        e.preventDefault();
        // Format the date as an ISO string and extract only the date part
       // const formattedDate = bookingDate ? new Date(bookingDate).toISOString().split('T')[0] : '';
        // Format the time as a string
        //const formattedTime = bookingTime ? `${bookingTime}:00` : ''; 
                                                                        //:formattedDate :formattedTime
       dispatch(addBooking({ name, email, phoneNumber, services, comment, bookingDate, bookingTime, uid: currentUser.uid}))
        .then(()=> {
            console.log('Booking successful:', { name, email, phoneNumber, services, comment, bookingDate, bookingTime , uid:currentUser.uid} );
            resetForm();
            setShowBookingModal(false);
            alert("Your booking has been confirmed.")
            navigate("/profile");
        })
        .catch((error) => {
            console.error("Error booking:", error);
        });
    };


    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(resetBookings()); // Reset the bookings state on sign out
            console.log("User signed out successfully");
            navigate("/");
        }).catch((error) => {
            console.error("Sign out error", error);
        });
    };


    // Define a function to get user identity (email or phone number)
    const getUserIdentity = () => {
        // Check if the user logged in with an email
        if (currentUser && currentUser.email) {
            return currentUser.email;
        }
        // Check if the user logged in with a phone number
        else if (currentUser && currentUser.phoneNumber) {
            return currentUser.phoneNumber;
        }
    };
    

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/" style={{fontWeight:"bold"}}>
                <span style={{ color: 'grey' }}>Adrian</span>Dental
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <>
                <Nav.Link href='/about'>About Us</Nav.Link>
                {currentUser &&<Nav.Link href='/profile'>Profile</Nav.Link>}
                </>
                
                <NavDropdown title="Services" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Braces</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.4">Teeth Whitening</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Crowns/Veneers</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Dental Implant</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.4">Dentures</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Gum Contouring</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.4">Invisalign</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.4">Root Canal Treatment</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.4">TMJ Treatment</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.4">X-ray-CBCT, Panoramic</NavDropdown.Item>
                </NavDropdown>
                
            </Nav>
            <Nav>
            {currentUser ? (
                    <div className="navbar-text text-black me-5 fw-semibold">
                        Welcome! {getUserIdentity()} 
                    </div>
                ) : null}
            </Nav>
            <Nav>
                <Nav.Link href="https://wa.me/60176146696" target="_blank">
                    <i className="bi bi-whatsapp me-4" style={{ color: 'green', fontSize: '24px', transition: 'color 0.3s' }}></i>
                </Nav.Link>
            </Nav>
            <br/>
            <Nav >
                <Button className='me-2'
                    variant="primary" 
                    onClick={handleBookNowClick}>
                    {currentUser ? 'Book Now' : 'Sign In'}
                </Button>
            </Nav>
            <br/>
            <Nav>
                {currentUser && (
                <Button 
                className='me-2'
                    variant="outline-danger" 
                    onClick={handleSignOut}
                >
                    Sign Out
                </Button>
                )}
            </Nav>
        </Navbar.Collapse>
        </Container>

        <Modal show={ShowBookingModal} 
            onHide={() => {setShowBookingModal(false); resetForm();
        }} >
            <Modal.Header closeButton>
                <Modal.Title>Book Your Appoitment Today!</Modal.Title>
            </Modal.Header>
            <Form onSubmit={confirmBooking}>
                <Modal.Body>
                    <Form.Group controlId="nameForm">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="emailForm" className='mt-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="phoneNumberForm" className='mt-2'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="servicesForm" className='mt-2'>
                        <Form.Label>Services</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter services required"
                            value={services}
                            onChange={(e) => setServices(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="bookingDateForm" className='mt-2'>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="bookingTimeForm" className='mt-2'>
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            as="select"
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            required
                            >
                            <option value="">Select a time</option>
                            {Array.from({ length: 24 }, (_, index) => {
                                const hour24 = index; // 24-hour range from 0 to 23
                                const hour12 = hour24 % 12 || 12; // converts to 12-hour format
                                const suffix = hour24 < 12 ? 'AM' : 'PM'; // determines AM/PM
                                // Only show times from 9 AM to 8 PM
                                if (hour24 < 9 || hour24 > 20) return null;
                                return (
                                    <React.Fragment key={hour24}>  
                                        <option value={`${hour12.toString().padStart(2, '0')}:00 ${suffix}`}>
                                            {`${hour12.toString().padStart(2, '0')}:00 ${suffix}`}
                                        </option>
                                        <option value={`${hour12.toString().padStart(2, '0')}:30 ${suffix}`}>
                                            {`${hour12.toString().padStart(2, '0')}:30 ${suffix}`}
                                        </option>
                                    </React.Fragment>
                                );
                            })}  
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="commentForm" className='mt-2'>
                        <Form.Label>Meesage</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder='Your Message'
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Group>
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </Navbar>
  );
}
