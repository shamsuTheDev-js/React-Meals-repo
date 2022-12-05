import React from "react";
import ReactDom from "react-dom";
import Button from "../Button/Button";
import Card from "../Card/Card";
import animate from "./errorAnimation.module.css";
import classes from "./ErrorModal.module.css";

const Backdrop = (props) => {
  return (
    <React.Fragment>
      <div
        className={`${classes.backdrop} ${animate.backdrop}`}
        onClick={props.cancel || props.seen}
      ></div>
    </React.Fragment>
  );
};
const ModalOverlay = (props) => {
  return (
    <Card className={`modal-card ${classes.modal} ${animate.modal}`}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <main className={classes.main}>
        <p>{props.message}</p>
      </main>
      <footer
        className={
          !props.conditional ? `${classes.action}` : `${classes.actions}`
        }
      >
        {props.conditional && (
          <Button onClick={props.cancel}>{props.condition}</Button>
        )}
        <Button onClick={props.seen}>{props.noCondition}</Button>
      </footer>
    </Card>
  );
};
const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop seen={props.seenError} cancel={props.cancel} />,
        document.querySelector("#backdrop-root")
      )}
      {ReactDom.createPortal(
        <ModalOverlay
          seen={props.seenError}
          cancel={props.cancel}
          condition={props.condition}
          noCondition={props.noCondition}
          conditional={props.conditional}
          title={props.title}
          message={props.message}
        />,
        document.querySelector("#overlay-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
