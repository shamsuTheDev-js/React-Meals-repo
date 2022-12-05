import Header from "../Header/Header";
import Content from "../Contents/Content";
import Classes from "./Home.module.css";
//import UserContent from "../Contents/UserContent";
import { useState } from "react";
import Cart from "../Cart/Cart";
//import { useContext } from "react";
//import Context from "../../store2/auth-context2";

const Home = (props) => {
  const [Page, setPage] = useState("Home");
  const [cartState, setCartState] = useState([]);

  const pageHandler = (page) => {
    setPage(page);
  };
  const addedToCartHandler = (item) => {
    item.date = new Date();
    cartState.length === 0 && setCartState([item]);
    cartState.length > 0 && setCartState((prevItems) => [item, ...prevItems]);
  };
  return (
    <div className={`${Classes.home}`}>
      <Header page={pageHandler} currentPage={Page} />
      {Page === "Home" && <Content onAddedToCart={addedToCartHandler} />}
      {Page === "Go to Cart" && <Cart cart={cartState} />}
    </div>
  );
};

export default Home;
