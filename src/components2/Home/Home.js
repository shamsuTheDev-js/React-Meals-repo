import Header from "../Header/Header";
import Content from "../Contents/Content";
import Classes from "./Home.module.css";
//import UserContent from "../Contents/UserContent";
import { useState, useContext } from "react";
import Cart from "../Cart/Cart";
//import { useContext } from "react";
import Context from "../../store2/auth-context2";

const Home = (props) => {
  const [Page, setPage] = useState("Home");
  const ctx = useContext(Context);

  const pageHandler = (page) => {
    setPage(page);
  };

  return (
    <div className={`${Classes.home}`}>
      <Header page={pageHandler} currentPage={Page} />
      {Page === "Home" && <Content />}
      {Page === "Go to Cart" && <Cart cart={ctx.cartItems} />}
    </div>
  );
};

export default Home;
