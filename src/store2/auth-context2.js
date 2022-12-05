import React, { useState, useEffect } from "react";
//import { colorsProps } from "svgo/plugins/_collections";

const Context = React.createContext({
  loggedIn: false,
  requestAdminLogin: (state) => {},
  adminLoggedIn: false,
  user: {}, //for Admin Login.
  meals: () => {},
  editMeals: () => {},
  updatedMeals: ["updated-items"],
  onLogout: () => {},
  onAdminLogin: () => {},
  onLogin: (email, password) => {},
});

export const ContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [val, setVal] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [savedPrice, setSavedPrice] = useState([
    {
      key: "i1",
      value: "100",
      name: "Lorem, ipsum dolor.",
      amt: "1",
      changed: false,
    },
    { key: "i2", value: "100", name: "Lorem, ipsum", amt: "1", changed: false },
    {
      key: "i3",
      value: "100",
      name: "Lorem, ipsum dolor",
      amt: "1",
      changed: false,
    },
    { key: "i4", value: "100", name: "Lorem, ipsum", amt: "1", changed: false },
    { key: "i5", value: "100", name: "Lorem", amt: "1", changed: false },
  ]);
  useEffect(() => {
    if (val.length > 0 && loggedIn) {
      const storedUser = sessionStorage.getItem(val[0]);
      if (storedUser.value === val[1]) {
        setLoggedIn(true);
      }
    }
  }, [val, loggedIn]);
  const logoutHandler = () => {
    sessionStorage.removeItem(val[0]);
    setLoggedIn(false);
    setAdmin(null);
  };
  const loginHandler = (user) => {
    //setVal([email, password]);
    sessionStorage.setItem(user.email, user.password);
    setVal([user.email, user.password]);
    setLoggedIn(true);
    setAdmin(null);
  };
  const addMealsHandler = (updatedMeals) => {
    setSavedPrice((prev) => [updatedMeals, ...prev]);
  };
  const editMealsHandler = (editted) => {
    console.log();
    setSavedPrice((prev) => {
      let changes = [...prev];
      changes.map((meal, i) => (meal.value = editted[i]));
      return [...changes];
    });
  };
  const goToAdminLogin = (state) => {
    setAdmin(state);
    console.log(val);
  };
  const adminLoginHandler = (details) => {
    const id = sessionStorage.getItem(details.email);
    details.password === id && setAdmin(true);
  };
  return (
    <Context.Provider
      value={{
        loggedIn: loggedIn,
        requestAdminLogin: goToAdminLogin,
        adminLoggedIn: admin,
        meals: addMealsHandler,
        editMeals: editMealsHandler,
        updatedMeals: savedPrice,
        user: loggedIn && val,
        onLogout: logoutHandler,
        onAdminLogin: adminLoginHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
