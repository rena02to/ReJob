import _404 from "../images/404.jpg";
import style from "./../styles/NotFound.module.css";

function NotFound() {
  return (
    <div className={style.main}>
      <p>
        <span>Oops!</span> A página que você procura não existe, ou está em
        manutenção.
      </p>
      <img src={_404} alt="Not found" />
    </div>
  );
}

export default NotFound;
