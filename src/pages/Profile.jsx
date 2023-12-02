import { Button, Container, Table } from "react-bootstrap";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { fetchBookings, resetBookings } from "../features/posts/bookingsSlice";
import EditBooking from "../components/EditBooking";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function Profile () {
  const bookings = useSelector(state => state.bookings.bookings);
  const dispatch = useDispatch();

  const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

//useEffect(() => {
//  if (currentUser) {
//    dispatch(fetchBookings(currentUser.uid));
//  } else {
 //   dispatch(resetBookings()); // Clear bookings if there is no user logged in
 // }
//}, [currentUser, dispatch]);

useEffect(() => {
  if (currentUser) {
    dispatch(fetchBookings(currentUser.uid));
  } else {
    navigate('/login');
    dispatch(resetBookings());
  }
}, [currentUser, dispatch, navigate]);

  const handleEditClick = (booking) => {
    setCurrentBooking(booking);
    setShowEditModal(true);
  };
  //const handleDeleteClick = (bookingId) => {
  //  if (window.confirm("Are you sure you want to cancel this booking?")) {
  //    dispatch(deleteBooking(bookingId));
  //  }
  //};

  return (
    <div>
      <Header/>
      <Container  className="my-4">
        <h2>Bookings</h2>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Services</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Message</th>
                    <th>Edit/ Cancel</th>
                </tr>
            </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phonenumber}</td>
                <td>{booking.services}</td>
                <td>{booking.bookingdate}</td>
                <td>{booking.bookingtime}</td>
                <td style={{ wordBreak: 'break-word' }}>
                  {booking.comment}</td>
                <td>
                    <Button variant="danger" onClick={() => handleEditClick(booking)}>
                      Edit
                    </Button>
                    
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <EditBooking
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        bookingData={currentBooking}
      />
    </div>
  )
}
