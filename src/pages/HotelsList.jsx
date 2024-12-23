import React, { useEffect, useState } from 'react';
import { getHotels } from './api';
import { Link } from 'react-router-dom';
import './styles.css';

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getHotels();
        setHotels(response);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(err.message);
        setErrorCode(err.response?.status || 'Unknown Error');
      }
    };
    fetchHotels();
  }, []);

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger shadow-sm">
          <h4 className="alert-heading">Error {errorCode}</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Hotels</h1>
      <div className="row">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <img src={hotel.imageUrl} alt={hotel.name} className="card-img-top hotel-img" />
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text">
                    <strong>Location:</strong> {hotel.location}
                  </p>
                  <p className="card-text">
                    <strong>Rating:</strong> {hotel.rating} ⭐
                  </p>
                  <Link to={`/hotels/${hotel.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">No hotels available. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsList;
