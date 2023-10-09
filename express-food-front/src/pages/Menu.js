import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';

export default function Menu() {
  // Liste des plats
  const [plats, setPlats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/food/')
      .then(response => {
        let allPlats = response.data;
        setPlats(allPlats);
      })
      .catch(error => {
        console.error('Failed to fetch film data:', error);
      });
  }, []);

  return (
    <span id="menu">
      <section className="section">
        <div className="title-section">
          <h1>Nos Plats</h1>
        </div>
        <div className="container">
          <div className="grid">
            {plats.map((plat, index) => (
              <Card key={index} data={plat} />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="title-section">
          <h1>Nos Desserts</h1>
        </div>
        <div className="container">
          <div className="grid">
            {plats.map((plat, index) => (
              <Card key={index} data={plat} />
            ))}
          </div>
        </div>
      </section>
    </span>
  );
}
