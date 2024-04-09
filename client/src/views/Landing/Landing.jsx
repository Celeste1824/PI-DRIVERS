import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import landing from "../../assets/landing.jpg";

const Landing = () => {
  return (
    <div className="landing">
      <img src={landing} />
      <Link to="/home">
        <div className="buttonContainer">
          <button className="button">Ingresar</button>
        </div>
      </Link>
    </div>
  );
};

export default Landing;