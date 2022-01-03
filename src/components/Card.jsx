import React from "react";
import { img_url, unavailable } from "../Requests";
import "./Card.css"
import TransitionsModal from "./Modal";


function Card({ id, poster, title, date, media_type, rating }) {
  return (
  <TransitionsModal media_type={media_type} id={id}> 
     
      <img
        className="poster"
        src={poster ? `${img_url}/${poster}` : unavailable}
      />
      <b className="title">{title}</b>
      <span className="subtitle" >
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subtitle">{date}</span>
      </span>
      
    </TransitionsModal>
  );
}

export default Card;
