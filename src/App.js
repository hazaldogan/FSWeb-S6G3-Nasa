import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DatePicker from "./components/DatePicker";
import ImageViewer from "./components/ImageViewer";

const API_KEY = "GXLc0431gMz7CrzCyLfnP2eXVvUjzoZMFor6zrSd";

function App() {
  const [render, setRender] = useState(0);
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("2020-07-22");
  const [error, setError] = useState(null);

  useEffect(() => {
    setRender(render + 1);
    setData(null);

    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`
      )
      .then(function (response) {
        console.log(response);
        setData(response.data);
        setError(null);
      })
      .catch(function (error) {
        console.log(error);
        setError(error.response.data.msg);
      })
      .finally(function () {});
  }, [selectedDate]);

  return (
    <div className="App">
      <h1>{render} kere sayfa render oldu</h1>
      <DatePicker val={selectedDate} dateChange={setSelectedDate} />
      {error && <h3>Error: {error}</h3>}
      {!error && <ImageViewer viewData={data} />}
    </div>
  );
}

export default App;
