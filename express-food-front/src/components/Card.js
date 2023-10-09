import "../style/Card.css";

export default function Card({ data }) {
  return (
    <article className="card">
      <img className="card__image" src={data.image} />
      <div className="card__data">
        <div className="card__info">
          <h2>{data.name}</h2>
          <p>{data.description}</p>
        </div>
        <h3 className="card__price">{data.price}€</h3>
        <button className="card__add">+</button>
      </div>
    </article>
  )
}