import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { login, logout } from "./store/store";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

const App = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      {currentUser ? (
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
