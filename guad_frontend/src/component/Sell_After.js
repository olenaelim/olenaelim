import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import style from "../source/Sell_After.module.css";

function Sell_After({ history, match }) {
  const [item, setItem] = useState("");
  const [member, setMember] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sell/${match.params.itemNum}`
      )
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
      });
  }, []);

  return (
    <>
      <div className={style.cont1}>
        <h2>구매 확인</h2>
        <div className={style.top}>
          <img src={require("../source/img/check03.png")} alt="체크" />
          <p>성공적으로 거래되었습니다.</p>
        </div>
      </div>
      <div className={style.cont2}>
        <img
          src={item.itemImgName && `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${item.itemImgName}`}
          alt={"img" + item.notifyNum}
        />
        <div className={style.right_side}>
          <span className={style.category}>
            <p>{item.itemType}</p>
          </span>
          <span className={style.title}>{item.itemSub}</span>
          <p className={style.add}>
            배송주소<strong>{item.address}</strong>
          </p>
          <p className={style.seller}>
            판매자 : <strong>{item.nickname}</strong>
          </p>
          <p className={style.del}>
            배송비<strong>배송비 포함</strong>
          </p>
          <p className={style.price}>
            판매가<strong>{item.itemPrice?.toLocaleString()}</strong>
          </p>
        </div>
      </div>
      <div className={style.btn_area}>
        <Link to="/mypage">
          <button type="button" className={style.my}>
            마이 페이지로 가기
          </button>
        </Link>
        <Link to="/sell_list">
          <button type="button" className={style.go}>
            쇼핑 계속하기
          </button>
        </Link>
      </div>
    </>
  );
}
export default Sell_After;
