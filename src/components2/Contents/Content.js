import Card from "../UI/Card/Card";
import animate from "./contentAnimation.module.css";
import Classes from "./Content.module.css";
import pic from "../reactMeals.jpg";
import Button from "../UI/Button/Button";
import Context from "../../store2/auth-context2";
import DisplayContent from "./DisplayContent";
import React, { useState, useContext, useEffect } from "react";
import ErrorModal from "../UI/ErrorModal/ErrorModal";

/* const items = [
  { key: "i1", value: "100", name: "Lorem, ipsum dolor.", amt: "1" },
  { key: "i2", value: "100", name: "Lorem, ipsum", amt: "1" },
  { key: "i3", value: "100", name: "Lorem, ipsum dolor", amt: "1" },
  { key: "i4", value: "100", name: "Lorem, ipsum", amt: "1" },
  { key: "i5", value: "100", name: "Lorem", amt: "1" },
]; */

const Content = (props) => {
  const ctx = useContext(Context);
  const [defaultItem, setDefaultItems] = useState(ctx.updatedMeals);
  const [addItem, setAddItem] = useState(false);
  const [name, setName] = useState("");
  const [dynPrice, setDynPrice] = useState();
  //const [priceChange, setPriceChange] = useState(false)
  //const [amt, setAmt] = useState(defaultItem.map())

  const [error, setError] = useState();
  useEffect(() => {
    ctx.adminLoggedIn === null && setAddItem(false);
  }, [ctx.adminLoggedIn]);
  const blurHandler = () => {
    const price = defaultItem.map((price) => price.value);
    console.log(price);
    ctx.editMeals(price);
  };
  const stopPurchaseHandler = () => {
    setError(null);
  };
  const addItemHandler = () => setAddItem(true);
  const cancelAddItem = () => setAddItem(false);

  const nameChangeHandler = ({ target }) => {
    setName(target.value);
  };
  const dynPriceChangeHandler = ({ target }) => {
    setDynPrice(target.value);
  };
  const submitItemHandler = (event) => {
    event.preventDefault();
    ctx.meals({
      key: Math.random().toString(),
      value: dynPrice.toString(),
      name: name,
      amt: "1",
      changed: false,
    });
    setDefaultItems((prev) => [
      {
        key: Math.random().toString(),
        value: dynPrice.toString(),
        name: name,
        amt: "1",
      },
      ...prev,
    ]);
  };
  const confirmPurchaseHandler = () => {
    setError({
      seenError: stopPurchaseHandler,
      cancel: stopPurchaseHandler,
      condition: "Cancel",
      noCondition: "Okay, thanks.",
      conditional: false,
      title: "Congratulations !",
      message: "You have successfully Purchased this Item",
    });
  };
  const purchaseHandler = () => {
    ctx.adminLoggedIn === null &&
      setError({
        seenError: confirmPurchaseHandler,
        cancel: stopPurchaseHandler,
        condition: "Cancel",
        noCondition: "Purchase",
        conditional: true,
        title: "Attention !",
        message: "Do you want to purchase this item ?",
      });
  };
  const priceChangeHandler = ({ target }) => {
    setDefaultItems((prevPrice) => {
      let updated = prevPrice.filter((obj) => obj.key === target.name)[0];
      let thisItem = prevPrice
        .map((obj) => obj.key)
        .findIndex((obj, i) => obj === updated.key);
      let updatedPrice = [...prevPrice];
      updatedPrice[thisItem] = {
        ...updatedPrice[thisItem],
        value: target.value,
        changed: true,
      };
      return [
        ...updatedPrice,
        /* ...prevPrice,
      defaultItem
        .filter((obj) => obj.key === target.key)
        .map((obj) => (obj.value = target.value)), */
      ];
    });
  };

  const changeAmountHandler = ({ target }) => {
    let item = target.parentNode.querySelector(".clicked").id;

    setDefaultItems((prevAmt) => {
      let updated = prevAmt.filter((obj) => obj.key === item)[0];
      let thisItem = prevAmt
        .map((obj) => obj.key)
        .findIndex((obj, i) => obj === updated.key);
      let updateAmt = [...prevAmt];
      if (target.textContent === "+") {
        updateAmt[thisItem] = {
          ...updateAmt[thisItem],
          amt: (parseInt(prevAmt[thisItem].amt) + 1).toString(),
        };
      }
      if (target.textContent === "-") {
        if (updateAmt[thisItem].amt === "1") {
          return [...updateAmt];
        }
        updateAmt[thisItem] = {
          ...updateAmt[thisItem],
          amt: (parseInt(prevAmt[thisItem].amt) - 1).toString(),
        };
      }
      return [...updateAmt];
    });
    //console.log(defaultItem);
  };
  const addToCartHandler = ({ target }) => {
    ctx.updateCart({
      key: Math.random().toString(),
      name: target.parentNode.parentNode.querySelector("h3").textContent,
      value: target.parentNode.parentNode.querySelector("h3").textContent,
      price: target.parentNode.parentNode.querySelector("button").textContent,
      amount: target.parentNode.querySelector(".clicked").textContent,
      date: new Date(),
    });
    let item = target.parentNode.querySelector(".clicked").id;
    setError({
      seenError: stopPurchaseHandler,
      cancel: stopPurchaseHandler,
      condition: "Cancel",
      noCondition: "Okay, thanks.",
      conditional: false,
      title: "Attention !",
      message: `You have added this Item( Name: ${
        target.parentNode.parentNode.querySelector("h3").textContent
      }, ${
        target.parentNode.parentNode.querySelector("button").textContent
      }, Amount:${
        target.parentNode.querySelector(".clicked").textContent
      }) to your Cart`,
    });

    setTimeout(() => {
      stopPurchaseHandler();
      setDefaultItems((prevItems) => {
        let updated = prevItems.filter((obj) => obj.key === item)[0];
        let thisItem = prevItems
          .map((obj) => obj.key)
          .findIndex((obj, i) => obj === updated.key);
        let updateAmt = [...prevItems];
        updateAmt[thisItem] = { ...updateAmt[thisItem], amt: "1" };
        return [...updateAmt];
      });
      console.table("done");
    }, 2000);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          seenError={error.seenError}
          cancel={error.cancel}
          condition={error.condition}
          noCondition={error.noCondition}
          conditional={error.conditional}
          title={error.title}
          message={error.message}
        />
      )}
      <div className={`${Classes.content}`}>
        {!ctx.adminLoggedIn && (
          <Card className={`${Classes.text} ${animate.description}`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora,
            iste saepe! Voluptatibus vel, earum dolorum eveniet possimus ullam
            porro alias.
          </Card>
        )}
        {ctx.adminLoggedIn && (
          <Card className={`${Classes["add-del-card"]} ${animate.description}`}>
            <Button className={Classes.delete}>Delete Meal</Button>
            <Button className={Classes.add} onClick={addItemHandler}>
              Add Meal
            </Button>
          </Card>
        )}
        <React.Fragment>
          {addItem && (
            <Card>
              <form onSubmit={submitItemHandler}>
                <img src={pic} alt="dynamic-meal-img" />
                <div>
                  <label htmlFor="Name">Name: </label>
                  <input id="Name" type="text" onChange={nameChangeHandler} />
                </div>
                <div>
                  <label htmlFor="Price">Price: </label>
                  <input
                    id="Price"
                    type="number"
                    onChange={dynPriceChangeHandler}
                  />
                </div>
                <div>
                  <Button onClick={cancelAddItem}>Cancel</Button>
                  <Button type="submit">Add Item</Button>
                </div>
              </form>
            </Card>
          )}
          <DisplayContent
            displayedItem={defaultItem}
            addToCartHandler={addToCartHandler}
            blurHandler={blurHandler}
            changeAmountHandler={changeAmountHandler}
            priceChangeHandler={priceChangeHandler}
            purchaseHandler={purchaseHandler}
          />
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};

export default Content;
