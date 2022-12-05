import React, { useState, useEffect, useReducer } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./Login.module.css";
import { useContext } from "react";
import Context from "../../store2/auth-context2";
import ErrorModal from "../UI/ErrorModal/ErrorModal";

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
const Login = (props) => {
  const [error, setError] = useState();
  const [checkEmailState, setEmailState] = useState(true);
  const [checkPasswordState, setPasswordState] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formState, dispatchForm] = useReducer(formReducer, {
    emailValue: "",
    passwordValue: "",
    emailValid: null,
    passwordValid: null,
  });

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
  }, [formState]);
  const context = useContext(Context);

  const confirmErrorHandler = () => {
    setError(null);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      context.onLogin({
        email: formState.emailValue,
        password: formState.passwordValue,
      });
    } else {
      setError({
        title: "Invalid Input",
        ...(!formState.emailValid && !formState.passswordValid
          ? { message: "Please Input a valid email and password" }
          : {
              ...(!formState.emailValid
                ? {
                    message:
                      "Please Input a valid email address {johndoe@email.com}",
                  }
                : {
                    message:
                      "Please Input a valid password (7 or more characters long)",
                  }),
            }),
        conditional: false,
        noCondition: "Okay",
        seenErr: confirmErrorHandler,
      });
    }
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
    <React.Fragment>
      {error && (
        <ErrorModal
          seenError={error.seenErr}
          title={error.title}
          message={error.message}
          noCondition={error.noCondition}
          conditional={error.conditional}
        />
      )}
      <Card className={classes.form}>
        <form onSubmit={loginHandler}>
          <div className={classes.input}>
            <label htmlFor="email">
              <h2>E-mail</h2>
            </label>
            <input
              type="email"
              name="email"
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
              name="password"
              className={`${!checkPasswordState && classes["invalid-input"]}`}
              value={formState.passwordValue}
              onChange={passwordChangeHandler}
              onBlur={validatePassword}
            />
          </div>
          <span className={classes.actions}>
            <Button type="submit" /* disabled={!formIsValid} */>Login</Button>
          </span>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Login;
