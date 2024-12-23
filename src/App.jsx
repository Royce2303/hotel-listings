import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getHotels } from './api/api'; // Ensure this path matches your project structure

const App = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getHotels(); // Fetch data using the imported function
        setHotels(response); // Update the state with fetched data
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels(); // Call the fetch function
  }, []);

  return (
    <div className="container py-4">
      <header className="bg-dark text-white text-center py-3 rounded mb-4 shadow">
        <h1 className="display-4">Hotel Listings</h1>
        <p className="lead">Explore luxurious destinations worldwide</p>
      </header>

      <div className="row">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="card-img-top"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text">
                    <strong>Location:</strong> {hotel.location}
                  </p>
                  <p className="card-text">
                    <strong>Rating:</strong> {hotel.rating} ⭐
                  </p>
                  <p className="card-text">
                    <strong>Board Basis:</strong> {hotel.boardBasis}
                  </p>
                  <p className="card-text">
                    <strong>Rooms Available:</strong>{' '}
                    {hotel.rooms.map((room) => (
                      <span key={room.roomType}>
                        {room.amount} {room.roomType}{' '}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <div className="alert alert-info shadow-sm py-4">
              <h4 className="alert-heading">No Hotels Available</h4>
              <p className="mb-0">
                Sorry, we couldn't find any hotels at the moment. Please check
                back later.
              </p>
            </div>
          </div>
        )}
      </div>

      <footer className="text-center text-muted py-3 mt-4">
        <small>© 2024 Hotel Spa. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default App;
