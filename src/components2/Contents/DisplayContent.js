import Card from "../UI/Card/Card";
import Classes from "./Content.module.css";
import animate from "./contentAnimation.module.css";
import pic from "../reactMeals.jpg";
import Button from "../UI/Button/Button";
import Context from "../../store2/auth-context2";
import { useState, useContext, useEffect } from "react";

const DisplayContent = (props) => {
  const [displayingItem, setDisplayingItem] = useState();
  //const [focus, setFocus] = useState();

  const ctx = useContext(Context);
  useEffect(() => {
    /* const focusHandler = ({ target }) => {
      props.focusHandler(target.key);
      console.log(target.key);
    }; */
    if (props.displayedItem) {
      setDisplayingItem(
        props.displayedItem.map((item, ix) => {
          let val;
          if (ix % 2 === 0) val = animate.even;
          else {
            val = animate.odd;
          }
          return (
            <Card
              key={item.key}
              className={`${Classes.meal} ${val}`}
              onFocus={props.focusHandler}
            >
              <span className={`${Classes.img}`}>
                <img src={pic} alt="foodImg" />
              </span>
              <span className={`${Classes.meal_name}`}>
                <h3>{item.name}</h3>
              </span>
              <Button
                onClick={props.purchaseHandler}
                id="price"
                className={`${Classes.price}`}
              >
                Price : NGN{" "}
                {ctx.adminLoggedIn === null &&
                  (Number.isInteger(Number(item.value))
                    ? Number(item.value).toFixed(2).toString()
                    : item.value)}
                {ctx.adminLoggedIn && (
                  <input
                    type="number"
                    key={item.key}
                    name={item.key}
                    onChange={props.priceChangeHandler}
                    /* onFocus={props.focusHandler} */
                    onBlur={props.blurHandler}
                    value={Number(item.value).toFixed(2).toString()}
                  />
                )}
              </Button>
              {ctx.adminLoggedIn === null && (
                <div key={item.name} className={Classes["to-cart"]}>
                  <span className={Classes["amount-text"]}>Amount</span>
                  <Button
                    onClick={props.changeAmountHandler}
                    className={Classes.minus}
                  >
                    -
                  </Button>
                  <span
                    key={item.name}
                    className={`clicked ${Classes["amount-value"]}`}
                    id={item.key}
                  >
                    {item.amt}
                  </span>
                  <Button
                    onClick={props.changeAmountHandler}
                    className={Classes.plus}
                  >
                    +
                  </Button>
                  {/* {item.changed && (
                  <Button
                    onClick={props.enablePriceChange}
                    className={Classes["change-price"]}
                  >
                    Apply
                  </Button>
                )}
                {item.changed && console.log(item.changed)} */}
                  <Button
                    onClick={props.addToCartHandler}
                    className={Classes["add-to-cart"]}
                  >
                    Add to Cart
                  </Button>
                </div>
              )}
            </Card>
          );
        })
      );
    }
  }, [ctx.adminLoggedIn, props, props.displayedItem]);

  return <>{displayingItem}</>;
};

export default DisplayContent;
