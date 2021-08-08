import React from "react";
import { LOAD_IMAGE } from "../Server/APIs";


export const PorstCartProfile = (props) => {
  return (
    <div>
      <h5
        style={{
          paddingTop: "10px",
          paddingLeft: "5px",
          marginBottom: "10px",
        }}
      >
        {props.name}
      </h5>
      <a href="/images/profile.jpg">
        <img
          src={LOAD_IMAGE + props.image}
          className="gallery-item"
          alt="Cinque Terre"
        />
      </a>
      <div className="card-content">
        <i
          className="small material-icons"
          style={{ marginLeft: "-2px", marginTop: "270px" }}
        >
          favorite
        </i>
        <p style={{ marginTop: "35px" }}>{props.title}</p>
        <input
          type="text"
          placeholder="Add a comment"
          className="input-field"
        />
      </div>
    </div>
  );
};
