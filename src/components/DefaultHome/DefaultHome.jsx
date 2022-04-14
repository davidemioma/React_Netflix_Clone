import React from "react";
import { useNavigate } from "react-router";
import Nav from "../Nav/Nav";
import classes from "./DefaultHome.module.css";

const DefaultHome = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.bgGradient}>
        <Nav />

        <div className={`container ${classes.default}`}>
          <div className={classes.content}>
            <h1>Unlimited films, TV programmes and more</h1>

            <h2>Watch anywhere, Cancel at any time.</h2>

            <h3>Ready to watch? click this button to choose a plan</h3>

            <button onClick={() => navigate("/profile", { push: true })}>
              Choose Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultHome;
