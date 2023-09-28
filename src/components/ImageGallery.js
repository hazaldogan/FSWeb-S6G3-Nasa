import React from "react";

function ImageGallery(props) {
  if (!props.viewData) return <h3>Yükleniyor...</h3>;

  return (
    <>
      <div className="gallery">
        {props.viewData.map((item, i) => (
          <div
            onClick={() => props.clickProp(i)}
            key={i}
            className={`gallery-item ${
              props.selectedAPOD === item ? "active" : ""
            }`}
          >
            <img src={item.url} alt={item.explanation} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ImageGallery;
