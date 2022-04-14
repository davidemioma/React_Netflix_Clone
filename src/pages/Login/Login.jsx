import React, { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const [signIn, setSignIn] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const SignUpHandler = (e) => {
    e.preventDefault();

    if (!email.includes("@") || email.length < 12 || password.length < 5)
      return;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {})
      .catch((err) => alert(err.message));
  };

  const signInHandler = (e) => {
    e.preventDefault();

    if (!email.includes("@") || email.length < 12 || password.length < 5)
      return;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        navigate("/profile", { replace: true });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className={classes.container}>
      <div className={classes.bgGradient}>
        <div className={`container ${classes.login}`}>
          <div className={classes.header}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
              alt="Logo"
            />

            {!signIn && (
              <button onClick={() => setSignIn(true)}>Sign In</button>
            )}
          </div>

          {signIn && (
            <div className={classes.signIn}>
              <form>
                <h1>Sign In</h1>

                <input
                  value={email}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" onClick={signInHandler}>
                  Sign In
                </button>

                <h4>
                  Need to netflix?{" "}
                  <span onClick={SignUpHandler}>Sign up now.</span>
                </h4>
              </form>
            </div>
          )}

          {!signIn && (
            <div className={classes.login_body}>
              <h1>Unlimited films, TV programmes and more</h1>

              <h2>Watch anywhere, Cancel at any time.</h2>

              <h3>
                Ready to watch? Enter your email to create or restart your
                membership.
              </h3>

              <form className={classes.login_form}>
                <input
                  value={email}
                  type="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button onClick={() => setSignIn(true)}>Get Started</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
