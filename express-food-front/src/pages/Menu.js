import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

export default function Menu() {
  // Liste des plats
  const [plats, setPlats] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/food/")
      .then((response) => {
        let allPlats = response.data;
        setPlats(allPlats);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, []);

  useEffect(() => {
    const firstMealContainer =
      document.getElementById("grid-meals").children[0];
    const secondMealContainer =
      document.getElementById("grid-meals").children[1];
    const firstDessertContainer =
      document.getElementById("grid-desserts").children[0];
    const secondDessertContainer =
      document.getElementById("grid-desserts").children[1];
    if (
      firstMealContainer === undefined ||
      secondMealContainer === undefined ||
      firstDessertContainer === undefined ||
      secondDessertContainer === undefined
    ) {
      return;
    }

    const firstMealData = firstMealContainer.querySelector(".card__data");
    const secondMealData = secondMealContainer.querySelector(".card__data");
    if (firstMealData.offsetHeight > secondMealData.offsetHeight) {
      secondMealData.style.minHeight = firstMealData.offsetHeight + "px";
    } else {
      firstMealData.style.minHeight = secondMealData.offsetHeight + "px";
    }

    const firstMealTitle = firstMealContainer.querySelector(
      ".card__data .card__info h2"
    );
    const secondMealTitle = secondMealContainer.querySelector(
      ".card__data .card__info h2"
    );
    if (firstMealTitle.offsetHeight > secondMealTitle.offsetHeight) {
      secondMealTitle.style.minHeight = firstMealTitle.offsetHeight + "px";
    } else {
      firstMealTitle.style.minHeight = secondMealTitle.offsetHeight + "px";
    }

    const firstMealDesc = firstMealContainer.querySelector(
      ".card__data .card__info p"
    );
    const secondMealDesc = secondMealContainer.querySelector(
      ".card__data .card__info p"
    );
    if (firstMealDesc.offsetHeight > secondMealDesc.offsetHeight) {
      secondMealDesc.style.minHeight = firstMealDesc.offsetHeight + "px";
    } else {
      firstMealDesc.style.minHeight = secondMealDesc.offsetHeight + "px";
    }

    const firstDessertData = firstDessertContainer.querySelector(".card__data");
    const secondDessertData =
      secondDessertContainer.querySelector(".card__data");
    if (firstDessertData.offsetHeight > secondDessertData.offsetHeight) {
      secondDessertData.style.minHeight = firstDessertData.offsetHeight + "px";
    } else {
      firstDessertData.style.minHeight = secondDessertData.offsetHeight + "px";
    }

    const firstDessertTitle = firstDessertContainer.querySelector(
      ".card__data .card__info h2"
    );
    const secondDessertTitle = secondDessertContainer.querySelector(
      ".card__data .card__info h2"
    );
    if (firstDessertTitle.offsetHeight > secondDessertTitle.offsetHeight) {
      secondDessertTitle.style.minHeight =
        firstDessertTitle.offsetHeight + "px";
    } else {
      firstDessertTitle.style.minHeight =
        secondDessertTitle.offsetHeight + "px";
    }

    const firstDessertDesc = firstDessertContainer.querySelector(
      ".card__data .card__info p"
    );
    const secondDessertDesc = secondDessertContainer.querySelector(
      ".card__data .card__info p"
    );
    if (firstDessertDesc.offsetHeight > secondDessertDesc.offsetHeight) {
      secondDessertDesc.style.minHeight = firstDessertDesc.offsetHeight + "px";
    } else {
      firstDessertDesc.style.minHeight = secondDessertDesc.offsetHeight + "px";
    }
  }, [plats]);

  return (
    <span id="menu">
      <section className="section">
        <div className="title-section">
          <h1>Nos Plats</h1>
        </div>
        <div className="container">
          <div className="grid" id="grid-meals">
            {plats
              .filter((plat) => plat.is_dessert === 0 && plat.flag === 1)
              .map(
                (plat, index) => index < 2 && <Card key={index} data={plat} />
              )}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="title-section">
          <h1>Nos Desserts</h1>
        </div>
        <div className="container">
          <div className="grid" id="grid-desserts">
            {plats
              .filter((plat) => plat.is_dessert === 1 && plat.flag === 1)
              .map(
                (plat, index) => index < 2 && <Card key={index} data={plat} />
              )}
          </div>
        </div>
      </section>
    </span>
  );
}
