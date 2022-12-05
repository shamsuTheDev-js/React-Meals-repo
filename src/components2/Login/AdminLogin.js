import { useState, useEffect, useReducer } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./Login.module.css";
import { useContext } from "react";
import Context from "../../store2/auth-context2";

const formReducer = (state, action) => {
  let holder = {
    emailValue: state.emailValue || "",
    passwordValue: state.passwordValue || "",
    emailValid:
      (state.emailValue.length > 0 && state.emailValue.includes("@")) || false,
    passwordValid: state.passwordValue.toString().trim().length > 6 || false,
  };
  if (action.type === "USER_EMAIL_INPUT") {
    return {
      ...holder,
      emailValue: action.val,
      emailValid: action.val.length > 0 && action.val.includes("@"),
    };
  }
  if (action.type === "USER_PASSWORD_INPUT") {
    return {
      ...holder,
      passwordValue: action.val,
      passwordValid: action.val.toString().trim().length > 6,
    };
  }
  if (action.type === "EMAIL_INPUT_BLUR") {
    return {
      ...holder,
      emailValue: state.emailValue,
      emailValid: state.emailValue.length > 0 && state.emailValue.includes("@"),
    };
  }
  if (action.type === "PASSWORD_INPUT_BLUR") {
    return {
      ...holder,
      passswordValue: state.passwordValue,
      passswordValid: state.passwordValue.toString().trim().length > 6,
    };
  }
  return {
    ...holder,
  };
};

const AdminLogin = () => {
  const [checkEmailState, setEmailState] = useState(true);
  const [checkPasswordState, setPasswordState] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formState, dispatchForm] = useReducer(formReducer, {
    emailValue: "",
    passwordValue: "",
    emailValid: null,
    passwordValid: null,
  });

  const context = useContext(Context);

  useEffect(() => {
    let debouncer = setTimeout(() => {
      formState.emailValid && setEmailState(true);
      formState.passwordValid && setPasswordState(true);
      if (formState.emailValid && formState.passwordValid) setFormIsValid(true);
      else {
        setFormIsValid(false);
      }
    }, 500);
    return () => {
      clearTimeout(debouncer);
    };
  }, [formState, formIsValid, context]);

  const loginHandler = (event) => {
    event.preventDefault();
    formIsValid &&
      context.onAdminLogin({
        email: formState.emailValue,
        password: formState.passwordValue,
      });
  };

  const emailChangeHandler = ({ target }) => {
    dispatchForm({ type: "USER_EMAIL_INPUT", val: target.value });
  };
  const passwordChangeHandler = ({ target }) => {
    dispatchForm({ type: "USER_PASSWORD_INPUT", val: target.value });
  };
  const validateEmail = () => {
    dispatchForm({ type: "EMAIL_INPUT_BLUR" });
    !formState.emailValid && setEmailState(false);
  };
  const validatePassword = () => {
    dispatchForm({ type: "PASSWORD_INPUT_BLUR" });
    !formState.passwordValid && setPasswordState(false);
  };
  return (
    <Card className={classes.form}>
      <form onSubmit={loginHandler}>
        <div className={classes.input}>
          <label htmlFor="email">
            <h2>E-mail</h2>
          </label>
          <input
            type="email"
            className={`${!checkEmailState && classes["invalid-input"]}`}
            value={formState.emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmail}
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="password">
            <h2>Password</h2>
          </label>
          <input
            type="password"
            className={`${!checkPasswordState && classes["invalid-input"]}`}
            value={formState.passwordValue}
            onChange={passwordChangeHandler}
            onBlur={validatePassword}
          />
        </div>
        <span className={classes.actions}>
          <Button type="submit" disabled={!formIsValid}>
            Login as Admin
          </Button>
        </span>
      </form>
    </Card>
  );
};

export default AdminLogin;
