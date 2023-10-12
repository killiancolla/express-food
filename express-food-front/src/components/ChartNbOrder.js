import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function DataChart({ days, orders }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Référence pour stocker l'instance du graphique

  useEffect(() => {
    // Vérifiez si le graphique existe déjà
    if (chartInstance.current) {
      // Si le graphique existe, détruisez-le
      chartInstance.current.destroy();
    }

    // Obtenez le contexte du canvas
    const ctx = chartRef.current.getContext("2d");
    const data = {
      labels: days,
      datasets: [
        {
          label: "Commandes des 7 derniers jours",
          data: orders,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Créez un nouveau graphique
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    // Assurez-vous de détruire le graphique lors du démontage du composant
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [orders, days]); // Le tableau vide en tant que deuxième argument signifie que cela s'exécute uniquement après le premier rendu

  return (
    <div style={{ width: "30%", margin: "0 auto" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
