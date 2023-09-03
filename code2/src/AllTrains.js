import React, { useEffect, useState } from 'react';
import { getAllTrains } from './apis';

function AllTrains() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    getAllTrains()
      .then((data) => {
        // Implement your sorting logic here
        const sortedTrains = data.sort((a, b) => {
          // Replace this with your actual sorting logic
          return a.price.AC - b.price.AC; // Example: Sorting by AC price
        });
        setTrains(sortedTrains);
      })
      .catch((error) => {
        console.error('Error fetching trains:', error);
      });
  }, []);

  return (
    <div>
      <h1>All Trains</h1>
      {/* Display trains here */}
    </div>
  );
}

export default AllTrains;
