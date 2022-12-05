import Card from "../UI/Card/Card";
import Classes from "./Content.module.css";
import pic from "../reactMeals.jpg";
import Button from "../UI/Button/Button";

const UserContent = () => {
  return (
    <div className={`${Classes.content}`}>
      <Card className={`${Classes.text}`}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, iste
        saepe! Voluptatibus vel, earum dolorum eveniet possimus ullam porro
        alias.
      </Card>
      <Card className={`${Classes.meal}`}>
        <span className={`${Classes.img}`}>
          <img src={pic} alt="foodImg" />
        </span>
        <span className={`${Classes.meal_name}`}>
          <h3>Lorem, ipsum dolor.</h3>
        </span>
        <Button className={`${Classes.price}`}>$1</Button>
      </Card>
      <Card className={`${Classes.meal}`}>
        <span className={`${Classes.img}`}>
          <img src={pic} alt="foodImg" />
        </span>
        <span className={`${Classes.meal_name}`}>
          <h3>Lorem, ipsum.</h3>
        </span>
        <Button className={`${Classes.price}`}>$1</Button>
      </Card>
      <Card className={`${Classes.meal}`}>
        <span className={`${Classes.img}`}>
          <img src={pic} alt="foodImg" />
        </span>
        <span className={`${Classes.meal_name}`}>
          <h3>Lorem, ipsum dolor.</h3>
        </span>
        <Button className={`${Classes.price}`}>$1</Button>
      </Card>
      <Card className={`${Classes.meal}`}>
        <span className={`${Classes.img}`}>
          <img src={pic} alt="foodImg" />
        </span>
        <span className={`${Classes.meal_name}`}>
          <h3>Lorem, ipsum.</h3>
        </span>
        <Button className={`${Classes.price}`}>$1</Button>
      </Card>
      <Card className={`${Classes.meal}`}>
        <span className={`${Classes.img}`}>
          <img src={pic} alt="foodImg" />
        </span>
        <span className={`${Classes.meal_name}`}>
          <h3>lorem</h3>
        </span>
        <Button className={`${Classes.price}`}>$1</Button>
      </Card>
    </div>
  );
};

export default UserContent;
