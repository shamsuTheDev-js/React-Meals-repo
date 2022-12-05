import React from "react";
import { useContext } from "react";
import Home from "./components2/Home/Home";
import AdminLogin from "./components2/Login/AdminLogin";
import Login from "./components2/Login/Login";
import Context from "./store2/auth-context2";
//import pic from "./components2/reactMeals.jpg";

const App = () => {
  const ctx = useContext(Context);

  return (
    <React.Fragment>
      {ctx.adminLoggedIn === null ? (
        !ctx.loggedIn ? (
          <Login />
        ) : (
          <Home />
        )
      ) : ctx.adminLoggedIn === true ? (
        <Home />
      ) : (
        <AdminLogin />
      )}
    </React.Fragment>
  );
};

export default App;
