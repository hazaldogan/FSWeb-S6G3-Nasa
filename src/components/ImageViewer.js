import React from "react";

function ImageViewer(props) {
  if (!props.viewData) return <h3>Yükleniyor...</h3>;

  const { title, date, explation, media_type, url, hdurl } = props.viewData;

  return (
    <>
      <h1>🚀 {title}</h1>
      <span>{date}</span>
      <p>{explation}</p>
      <span>{media_type}</span>
      <img src={url} alt={explation} />
    </>
  );
}

export default ImageViewer;
