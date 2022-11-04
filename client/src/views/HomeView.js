import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomeView.css";

function HomeView(props) {
  return (
    <div className="text-center">
      <h1 className="blue mt-5"> Welcome to Mind-Connect</h1>

      <p>A mental-health tracking app</p>

      <Link to="/account">
        <button className="my-5">Start tracking</button>
      </Link>

      <h3 className="blue text-center">Features</h3>
      <ul className="d-flex my-3 justify-content-evenly">
        <div className="card mx-5">
          <div className="card-body text-center">
            <img
              className="card-img-top"
              id="icon"
              src="./Graph_icon.png"
              alt="graph"
            />
            <li className="card-text">Easy visual overview of your progress</li>
          </div>
        </div>
        <div className="card me-5">
          <div className="card-body text-center">
            <img
              className="card-img-top"
              id="icon"
              src="./Track_icon.png"
              alt="graph"
            />
            <li className="card-text">Add your own mental health indicators</li>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default HomeView;
