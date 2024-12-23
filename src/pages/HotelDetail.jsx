import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelById } from './api';

const HotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await getHotelById(id);
        setHotel(response);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(err.message);
        setErrorCode(err.response?.status || 'Unknown Error');
      }
    };
    fetchHotel();
  }, [id]);

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

  if (!hotel) {
    return (
      <div className="container mt-4 text-center">
        <p className="text-muted">Loading hotel details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <img src={hotel.imageUrl} alt={hotel.name} className="card-img-top hotel-img" />
        <div className="card-body">
          <h2 className="card-title">{hotel.name}</h2>
          <p className="card-text">
            <strong>Location:</strong> {hotel.location}
          </p>
          <p className="card-text">
            <strong>Rating:</strong> {hotel.rating} ⭐
          </p>
          <p className="card-text">
            <strong>Board Basis:</strong> {hotel.boardBasis}
          </p>
          <h5 className="mt-4">Rooms:</h5>
          <ul>
            {hotel.rooms.map((room) => (
              <li key={room.roomType}>
                {room.amount} {room.roomType}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
