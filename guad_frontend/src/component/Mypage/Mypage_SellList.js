import style from "../../source/Mypage_SellList.module.css";
import logo from "../../source/img/mypage.png";
import Notify from "../Moodal/Notify";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import My_Sell from "./My_Sell";
import My_Buy from "./My_Buy";
import Mileage from "../Moodal/Mileage";

function Mypage_SellList() {
  const [checkList, setCheckList] = useState("buy");
  const changeList = (e) => {
    setCheckList(e.target.name);
  };
  const [data, setData] = useState({
    nickname: "",
    mileage: 0,
  });
  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
  };

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member`)
      .then((response) => {
        setData({
          nickname: response.data.nickname,
          mileage: response.data.mileage,
        });
      });
  }, []);
  return (
    <>
      <Mileage closeModal={closeModal} modalChange={modalChange} />
      <div className={style.All_Mbox}>
        <Link to="/mypage">
          <h1 className={style.page_name}>마이페이지</h1>
        </Link>
        <div>
          <div className={style.Mbox}>
            <div className={style.logo_box}>
              <img src={logo} alt="1"></img>
            </div>
            <div className={style.mileage_box}>
              <h3>
                <strong>{data.nickname}</strong>님 환영합니다!
              </h3>
              <h3>
                현재마일리지 <strong>{data.mileage.toLocaleString()}</strong>원
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
                  <button type="button"></button>
                  <p>신고내역</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={style.category}>
          <button onClick={changeList} name="buy">
            구매내역
          </button>
          <button onClick={changeList} name="sell">
            판매내역
          </button>
        </div>
        {checkList === "buy" && <My_Buy />}
        {checkList !== "buy" && <My_Sell />}
      </div>
    </>
  );
}

export default Mypage_SellList;
