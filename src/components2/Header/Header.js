import { useContext, useState, useEffect } from "react";
import classes from "./Header.module.css";
import animate from "./HeaderAnimation.module.css";
//import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Content from "../Contents/UserContent";
import Cart from "../Cart/Cart";
import Context from "../../store2/auth-context2";
const Header = (props) => {
  const [currentButton, setCurrentButton] = useState();
  const [active, setActive] = useState([
    { key: "Home", value: true },
    { key: "Go to Cart", value: false },
  ]);
  useEffect(() => {
    props.currentPage && setCurrentButton(props.currentPage);
  }, [props.currentPage]);
  const ctx = useContext(Context);

  const requestAdmin = () => {
    ctx.requestAdminLogin(false);
  };
  const backToUser = () => {
    ctx.requestAdminLogin(null);
  };
  const logout = () => {
    ctx.onLogout();
  };
  const pageHandler = ({ target }) => {
    // console.log(currentButton);
    active.every((obj) => obj.value === false) &&
      setActive((prev) => {
        let updatePrev = [...prev];
        let val = updatePrev.filter((obj) => obj.key === target.textContent);
        let index = updatePrev.findIndex((obj) => obj.key === val[0].key);
        updatePrev[index] = { ...updatePrev[index], value: true };
        return [...updatePrev];
      });
    active.some((obj) => obj.value === true) &&
      setActive((prev) => {
        let updatePrev = [...prev];
        let prevActive = updatePrev.findIndex((obj) => obj.value === true);
        updatePrev[prevActive] = { ...updatePrev[prevActive], value: false };
        let val = updatePrev.filter((obj) => obj.key === target.textContent);
        let index = updatePrev.findIndex((obj) => obj.key === val[0].key);
        updatePrev[index] = { ...updatePrev[index], value: true };
        return [...updatePrev];
      });
    //console.log(active);
    if (currentButton === target.textContent) {
      target.className = `${target.className} ${classes.clicked}`;
      /* target.style ={background: 'rgb(240, 240, 3)'} */
    }
    props.page(target.textContent);
  };

  return (
    <header
      className={`${classes.header} ${props.className} ${animate.header}`}
    >
      <h1 className={animate.head}>
        {/*<img alt="reactmeals" src={pic} />*/}
        ReactMeals
      </h1>
      <hr />

      <span className={classes.buttons}>
        {/* this are the links */}
        {ctx.adminLoggedIn === null && (
          <Button
            onClick={pageHandler}
            className={
              active[0].value === true
                ? classes["current-page"]
                : classes["not-current-page"]
            }
          >
            Home
          </Button>
        )}
        {ctx.adminLoggedIn === null && (
          <Button
            onClick={pageHandler}
            className={
              active[1].value === true
                ? classes["current-page"]
                : classes["not-current-page"]
            }
          >
            Go to Cart
          </Button>
        )}
        {ctx.adminLoggedIn === null && (
          <Button
            onClick={requestAdmin}
            className={classes["not-current-page"]}
          >
            Login as Admin
          </Button>
        )}
        {ctx.adminLoggedIn && (
          <Button onClick={backToUser} className={classes["not-current-page"]}>
            Back to user page
          </Button>
        )}
        <Button onClick={logout} className={classes["not-current-page"]}>
          Logout
        </Button>
      </span>
    </header>
  );
};

export default Header;
