import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [humidity, setHumidity] = useState(0);
  const [led, setLed] = useState(false);

  let ws;

  useEffect(() => {
    ws = new WebSocket("ws://your-render-url.onrender.com/ws");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.humidity) setHumidity(data.humidity);
      if (data.led !== undefined) setLed(data.led);
    };

    return () => ws.close();
  }, []);

  const toggleLed = () => {
    ws.send(JSON.stringify({ led: !led }));
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🌱 Smart Soil</h1>

        <div className="humidity">
          {humidity.toFixed(1)}%
        </div>

        <div className={`status ${led ? "on" : "off"}`}>
          {led ? "LED Allumée" : "LED Éteinte"}
        </div>

        <button
          className={`button ${led ? "on" : "off"}`}
          onClick={toggleLed}
        >
          {led ? "Éteindre LED" : "Allumer LED"}
        </button>
      </div>
    </div>
  );
}

export default App;