import '../style/Home.css'
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <span id="home">
      <img src="background.jpg" alt="Logo" />
      <div className='contains'>
        <h1>ExpressFood</h1>
        <Link
          to="/menu"
        >
          Commander
        </Link>
      </div >
      <div
        style={{
          top: "14%",
          left: "17%"
        }}
        className='bubble'>
        Livraison
        <br /> en - de 20 minutes
        <br />7j/7
        <br />24h/24
      </div>
      <div
        style={{
          top: "60%",
          left: "69%"
        }}
        className='bubble'>
        Découvrez nos 2 nouveaux plats et dessert du jours
      </div>
    </span >
  );
}
