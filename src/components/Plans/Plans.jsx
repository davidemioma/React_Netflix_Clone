import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { loadStripe } from "@stripe/stripe-js";
import { subscribe } from "../../store/store";
import classes from "./Plans.module.css";

const Plans = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  const subscription = useSelector((state) => state.user.subscription);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    db.collection("customers")
      .doc(currentUser.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          dispatch(
            subscribe({
              role: subscription.data().role,
              current_period_start:
                subscription.data().current_period_start.seconds,
              current_period_end:
                subscription.data().current_period_end.seconds,
            })
          );
        });
      });
  }, [currentUser.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};

        querySnapshot.forEach(async (doc) => {
          products[doc.id] = doc.data();

          const priceSnap = await doc.ref.collection("prices").get();

          priceSnap.docs.forEach((price) => {
            products[doc.id].price = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });

        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    setLoading(true);

    const docRef = await db
      .collection("customers")
      .doc(currentUser.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);

        setLoading(false);
      }

      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51KXXk0A0b0rg90QvzvYvtyTkchkp6SImQ195rYEiLYN3FverUnZVBc1Z8MBy7klngaIyTFnedwOGRLM2y34fJqZg001u767Jjt"
        );

        stripe.redirectToCheckout({ sessionId });

        setLoading(false);
      }
    });
  };

  return (
    <div>
      {subscription?.current_period_end && (
        <p className={classes.text}>
          Renewal Date:{" "}
          {new Date(
            subscription.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}

      <div className={classes.plans}>
        {Object.entries(products).map(([productId, productData]) => {
          const isCurrentPackage = productData.name
            ?.toLowerCase()
            .includes(subscription?.role?.toLowerCase());

          return (
            <div
              key={productId}
              className={`${classes.plan} ${
                isCurrentPackage && classes.plan_disabled
              }`}
            >
              <div className={classes.info}>
                <h5>{productData.name}</h5>
                <h6>{productData.description}</h6>
              </div>

              <button
                className={classes.btn}
                disabled={loading || isCurrentPackage}
                onClick={() =>
                  !isCurrentPackage && loadCheckout(productData.price?.priceId)
                }
              >
                {isCurrentPackage ? "Current Package" : "Subscribe"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plans;
