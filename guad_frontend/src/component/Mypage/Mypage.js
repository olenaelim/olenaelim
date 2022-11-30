import style from "../../source/Mypage.module.css";
import logo from "../../source/img/mypage.png";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Mileage from "../Moodal/Mileage";
import UserBuyList from "./UserBuyList";
import UserSellList from "./UserSellList";
import My_Notify from "../Moodal/My_Notify";

function Mypage() {
  // window.onload = function () {
  //   const button = document.getElementsByClassName(`${style.button}`);
  //   console.log(button);
  //   console.log(button[0]);

  //   for (let i = 0; i < button.length; i++) {
  //     if ((button[i].textContent = "거래완료")) {
  //       button[i].style.backgroundColor = "#217A4F";
  //     } else if ((button[i].textContent = "거래중")) {
  //       button[i].style.backgroundColor = "#D9D9D9";
  //     } else if ((button[i].textContent = "경매완료")) {
  //       button[i].style.backgroundColor = "#BA101E";
  //     } else {
  //       button[i].style.backgroundColor = "#253C76";
  //     }
  //   }
  // };

  const [data, setData] = useState({
    nickname: "",
    mileage: 0,
    loginImg: "",
  });

  console.log(data.loginImg);
  const [item, setItem] = useState("");
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member`)
      .then((response) => {
        setData({
          nickname: response.data.nickname,
          mileage: response.data.mileage,
          loginImg: response.data.loginImgName,
        });
      });

    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        closeModal3();
        closeModal();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, [isChange]);

  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
  };

  const handlerChange = () => {
    setIsChange(!isChange);
  };

  // 내 신고내역 보기
  const modalChange3 = useRef();

  const closeModal3 = () => {
    modalChange3.current.style = "display:none;";
  };

  const openModal3 = (e) => {
    modalChange3.current.style = "display:block;";
  };

  return (
    <>
      <My_Notify modalChange3={modalChange3} closeModal3={closeModal3} />
      <Mileage
        closeModal={closeModal}
        modalChange={modalChange}
        handlerChange={handlerChange}
        isChange={isChange}
      />
      <div className={style.All_Mbox}>
        <h1 className={style.page_name}>마이페이지</h1>
        <div className={style.Mbox}>
          <div className={style.logo_box}>
            <img
              src={
                data?.loginImg !== null && data?.loginImg !== ''
                  ? `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/member/${data.loginImg}`
                  : logo
              }
              alt="1"
            ></img>
          </div>
          <div className={style.mileage_box}>
            <h3>
              <strong>{data.nickname}</strong>님 환영합니다!
            </h3>
            <h3>
              현재 마일리지 <strong>{data.mileage.toLocaleString()}</strong>원
            </h3>
          </div>
          <div className={style.Mbox_button}>
            <ul>
              <Link to="/mypage/check">
                <li>
                  <button className={style.member} type="button"></button>
                  <p>회원정보</p>
                </li>
              </Link>
              <li>
                <button
                  className={style.mileage}
                  onClick={openModal}
                  type="button"
                ></button>
                <p>마일리지</p>
              </li>
              <li>
                <button type="button" onClick={openModal3}></button>
                <p>신고내역</p>
              </li>
            </ul>
          </div>
        </div>
        <div className={style.now_state}>
          <ul>
            <li>
              <span></span>
              <p className={style.now1}>판매대기</p>
              <p className={style.now2}>2</p>
            </li>
            <li>
              <span></span>
              <p className={style.now1}>준비중</p>
              <p className={style.now2}>1</p>
            </li>
            <li>
              <span></span>
              <p className={style.now1}>배송중</p>
              <p className={style.now2}>3</p>
            </li>
            <li>
              <span></span>
              <p className={style.now1}>배송완료</p>
              <p className={style.now2}>4</p>
            </li>
          </ul>
        </div>
        {/* <RegistList /> */}
        <UserBuyList />
        <UserSellList />
      </div>
    </>
  );
}

export default Mypage;
