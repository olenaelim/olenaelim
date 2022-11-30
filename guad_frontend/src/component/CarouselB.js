import { useEffect, useRef } from "react";
import style from "../source/Carousel.module.css";

function CarouselB() {
  useEffect(() => {}, []);
  return (
    <>
      <div className={style.all_cont}>
        <div className={style.in_cont}>
        <h3>GREAT</h3>
        <h3>SECOND</h3>
        <h3>HAND</h3>
        <h3>AUCTION</h3>
        <h3>OLENAELIM</h3>
        </div>
      </div>
    </>
  );
}
export default CarouselB;
