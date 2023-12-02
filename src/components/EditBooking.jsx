import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateBooking, deleteBooking, fetchBookings } from '../features/posts/bookingsSlice';
import { AuthContext } from './AuthProvider';

export default function EditBooking({ show, handleClose, bookingData }) {
  const dispatch = useDispatch();
  const {currentUser} =useContext(AuthContext)

  // Set up local state for the form, initialized with the booking data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    services: '',
    comment: '',
    bookingdate: '',
    bookingtime: '',
  });

  // Update the form state when bookingData changes
  useEffect(() => {
    console.log('bookingData:', bookingData);
    if (bookingData) {
      setFormData({
        name: bookingData.name || '',
        email: bookingData.email || '',
        phonenumber: bookingData.phonenumber || '',
        services: bookingData.services || '',
        comment: bookingData.comment || '',
        bookingdate: bookingData.bookingdate ? new Date(bookingData.bookingdate).toISOString().split('T')[0] : '',
        bookingtime: bookingData.bookingtime || '',
      });
    }
  }, [bookingData]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBooking({
      ...formData,
      bookingId: bookingData.bookingid,
    }))
    .then(() => {
      dispatch(fetchBookings(currentUser.uid));
      alert('Booking updated successfully');
      handleClose();
    })
    .catch((error) => {
      console.error('Error updating booking:', error);
    });
  };

  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await dispatch(deleteBooking(bookingData.bookingid)).unwrap();
        dispatch(fetchBookings());
        handleClose();
        alert('Booking cancelled successfully');
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('An error occurred while cancelling the booking.');
      }
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Booking</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Repeat this pattern for each field */}
          <Form.Group className="mb-3" controlId="formBookingName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="emailForm" className='mt-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
        </Form.Group>
        <Form.Group controlId="phoneNumberForm" className='mt-2'>
          <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleInputChange}
              required
            />
        </Form.Group>
        <Form.Group controlId="servicesForm" className='mt-2'>
          <Form.Label>Services</Form.Label>
            <Form.Control
              type="text"
              name='services'
              value={formData.services}
              onChange={handleInputChange}
              required
            />
        </Form.Group>
        <Form.Group controlId="bookingDateForm" className='mt-2'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name='bookingdate'
              value={formData.bookingdate}
              onChange={handleInputChange}
              required
            />
        </Form.Group>

        <Form.Group controlId="bookingTimeForm" className='mt-2'>
          <Form.Label>Time</Form.Label>
            <Form.Control
              as="select"
              name='bookingtime'
              value={formData.bookingtime}
              onChange={handleInputChange}
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
              <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name='comment'
                  placeholder='Your Message'
                  rows={3}
                  value={formData.comment}
                  onChange={handleInputChange}
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Cancel Booking
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
