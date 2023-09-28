import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DatePicker from "./components/DatePicker";
import ImageViewer from "./components/ImageViewer";
import ImageGallery from "./components/ImageGallery";

const API_KEY = "GXLc0431gMz7CrzCyLfnP2eXVvUjzoZMFor6zrSd";

function App() {
  const [render, setRender] = useState(0);
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("2020-07-22");
  const [error, setError] = useState(null);
  const [selectedAPOD, setSelectedAPOD] = useState(null);

  useEffect(() => {
    setRender(render + 1);
    setData(null);

    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=3`
        //    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`
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

  const galleryClickHandler = (ind) => {
    setSelectedAPOD(data[ind]);
  };

  if (!selectedAPOD) return <h3>Yükleniyor...</h3>;

  const containerBg = selectedAPOD
    ? { backgroundImage: `url(${selectedAPOD.hdurl})` }
    : {};

  return (
    <div className="App flex-center" style={containerBg}>
      <div className="container">
        <div className="column flex-center">
          <div className="hamburger-menu"></div>
        </div>
        <div className="column">
          <div className="row">
            {selectedAPOD.title} - {selectedAPOD.date}
          </div>
          <div className="row grow flex-center">bişi</div>
          <div className="row">Copyrigt</div>
        </div>
        <div className="column grow">
          <div className="row">boş başlık</div>
          <div className="row grow  fancy-title-container">
            <div className="fancy-title">{selectedAPOD.title}</div>
          </div>
          <div className="row">nex prew</div>
        </div>
        <div className="column">
          <ImageGallery
            clickProp={galleryClickHandler}
            viewData={data}
            selectedAPOD={selectedAPOD}
          />
        </div>
        <div className="column">
          <div className="row">archive</div>
          <div className="row grow social">
            <span>facebook</span>
            <span>twitter</span>
            <span>instagram</span>
          </div>
        </div>
      </div>
      {/* <h1>{render} kere sayfa render oldu</h1>
      <DatePicker val={selectedDate} dateChange={setSelectedDate} />
      {error && <h3>Error: {error}</h3>}
      {!error && <ImageViewer viewData={data} />} */}
    </div>
  );
}

export default App;
