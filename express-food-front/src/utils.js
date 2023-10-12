import axios from "axios";
import { useEffect, useRef } from "react";

export const getErrorFromBackend = (error) => {
  return error.response && error.response.data.error
    ? error.response.data.error
    : error.message;
};
// Récupération des données de l'utilisateur connecté via le localStorage
export const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const orderStatus = await axios.get("http://localhost:5000/api/order_status");
export const orderStart = orderStatus.data[0];
export const orderShipped = orderStatus.data[1];
export const orderDelivred = orderStatus.data[2];

const delivererStatus = await axios.get("http://localhost:5000/api/status");
export const delivererUnvailable = delivererStatus.data[0];
export const delivererVailable = delivererStatus.data[1];
export const delivererDelivery = delivererStatus.data[2];
