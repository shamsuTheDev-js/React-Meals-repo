import Card from "../UI/Card/Card";
import pic from "../reactMeals.jpg";
import animate from "./cartAnimation.module.css";
import styles from "./Cart.module.css";
import Button from "../UI/Button/Button";
import React, { useState, useEffect } from "react";
//import { getAllByPlaceholderText } from "@testing-library/react";

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    props.cart.length > 0 &&
      setCartItems(
        props.cart.map((item) => {
          return (
            <Card
              key={item.key}
              className={`${styles["meal-description"]} ${animate.cart}`}
            >
              {/* <div id={styles["meal-img"]}> */}
              <img src={pic} alt="meal" id={styles["meal-img"]} />
              {/* </div> */}
              <div className={styles["meal-name"]}>
                <span>Name :</span>
                {" " + item.name}
              </div>
              <div className={styles["meal-amount"]}>
                <span>Amount :</span>
                {item.amount !== undefined ? " " + item.amount : " 1"}
              </div>
              <div className={styles["meal-price"]}>{" " + item.price}</div>
              <div className={styles["meal-footer"]}>
                <Button>Purchase</Button>
                <span className={styles.date}>
                  Date-added:
                  {` ${item.date.getDate()}/ ${
                    item.date.getMonth() + 1
                  }/ ${item.date.getFullYear()} at ${item.date.getHours()}:${
                    item.date.getMinutes() < 10
                      ? "0" + item.date.getMinutes().toString()
                      : item.date.getMinutes()
                  }`}
                </span>
              </div>
            </Card>
          );
        })
      );
  }, [props.cart]);
  return (
    <>
      {props.cart.length > 0 && <React.Fragment>{cartItems}</React.Fragment>}
      {props.cart.length === 0 && (
        <Card className={`${styles["empty-cart"]} ${animate["empty-cart"]}`}>
          'You have not added any item to your Cart!'
        </Card>
      )}
    </>
  );
};

export default Cart;
