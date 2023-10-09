import "../style/Card.css";

export default function Card({ data }) {
  return (
    <article class="card">
      <img class="card__image" src={data.image} />
      <div class="card__data">
        <div class="card__info">
          <h2>{data.name}</h2>
          <p>{data.description}</p>
        </div>
        <h3 class="card__price">{data.price}€</h3>
        <button class="card__add">+</button>
      </div>
    </article>
  )
}