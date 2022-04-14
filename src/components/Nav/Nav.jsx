import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import avatar from "../../assets/netflix-avatar.png";
import classes from "./Nav.module.css";

const Nav = () => {
  const [show, handleShow] = useState(false);

  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`${classes.navContainer} ${show && classes.navBlack}`}>
      <nav className={`container ${classes.nav}`}>
        <img
          className={classes.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Logo"
          onClick={() => navigate("/", { push: true })}
        />

        <img
          className={classes.avatar}
          src={avatar}
          alt="Avatar"
          onClick={() => navigate("/profile", { push: true })}
        />
      </nav>
    </div>
  );
};

export default Nav;
