import CarouselB from "./CarouselB";
import style from "../source/Main.module.css";
import { useEffect, useRef, useState } from "react";
import video from "../source/img/back_01.mp4";

function Main() {
  const [tip, setTip] = useState(false);
  useEffect(() => {}, []);
  return (
    <>
      <div className={style.all_back}>
        <div className={style.control}>
          <video autoPlay loop muted className={style.back_v}>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <CarouselB />
        <span className={style.side_text}>
          오르내림은 중고 경매 거래 사이트로
          <br />
          가격을 올려가며 경쟁하는 오름경매, 점점 할인해서 판매하는 내림경매,
          <br />
          상품을 확인해 판매자와 직접 거래하는 일반거래 시스템을 제공합니다.
        </span>
        <div className={style.qq_box}>
          <div className={style.tip}>
            <p
              className={tip === true ? `${style.open_p}` : `${style.close_p}`}
            >
              <strong>오르내림 거래종류</strong>
              <br />
              <strong className={style.t_1}>오름 경매</strong>란? 입찰 경쟁을 통해 상품의
              <strong className={style.tt_1}> 가격을 올려가는</strong> 일반적인 경매 방식입니다
              <br />
              <strong className={style.t_2}>내림 경매</strong>란? 상품의 가격이 매 시간마다 일정한 수치 혹은 랜덤 방식으로
              <strong className={style.tt_2}> 점차 내려가는</strong> 판매 방식입니다 <br />
              <strong className={style.t_3}>일반 판매</strong>란? 판매자가 올린
              상품을 구매자가 1대1로 구매하는
              <strong className={style.tt_3}> 경매가 아닌 일반적인 거래방식</strong>입니다
            </p>
          </div>
          <button
            className={style.q_mark}
            type="button"
            onMouseEnter={() => setTip(true)}
            onMouseLeave={() => setTip(false)}
          >
            <img src={require("../source/img/q_mark.png")} alt="도움말" />
          </button>
        </div>
      </div>
    </>
  );
}
export default Main;
