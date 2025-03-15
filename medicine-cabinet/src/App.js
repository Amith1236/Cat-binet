// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // We'll add styles next

function Dashboard() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock API call (since we don't have a real backend yet RAAAAAAHH ZACHHH)
    setTimeout(() => {
      setMedicines([
        {
          id: 1,
          name: "Aspirin",
          expiry_date: "2024-12-31",
          quantity: 30,
          daily_intake: 2
        },
        {
          id: 2,
          name: "Ibuprofen",
          expiry_date: "2025-06-15",
          quantity: 60,
          daily_intake: 3
        }
      ]);
    }, 1000);
  }, []);

  const handleUnlock = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Cabinet unlocked!");
    } finally {
      setLoading(false);
    }
  };

}

export default function App() {
  return <Dashboard />;
}