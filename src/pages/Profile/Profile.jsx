import React from "react";
import Nav from "../../components/Nav/Nav";
import avatar from "../../assets/netflix-avatar.png";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import Plans from "../../components/Plans/Plans";
import classes from "./Profile.module.css";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className={classes.profile}>
      <Nav />

      <div className={classes.profile_body}>
        <div className={classes.profile_contents}>
          <h1>Edit Profile</h1>

          <div className={classes.profile_info}>
            <img src={avatar} alt="" />

            <div className={classes.profile_details}>
              <h2>{user.email}</h2>

              <div className={classes.profile_plans}>
                <h3>Plans</h3>

                <Plans />

                <button
                  className={classes.profile_plans_btn}
                  onClick={() => auth.signOut()}
                >
                  Signout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
