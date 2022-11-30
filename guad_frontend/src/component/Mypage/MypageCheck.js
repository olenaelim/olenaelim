import style from "../../source/MypageInfo.module.css";
import logo from "../../source/img/mypage.png";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Mileage from "../Moodal/Mileage";
import My_Notify from "../Moodal/My_Notify";

function MypageCheck({ history }) {
  const [data, setData] = useState({
    nickname: "",
    mileage: 0,
    loginImg: "",
  });

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
  }, []);

  const [pass, setPass] = useState("");

  const changePass = (e) => {
    setPass(e.target.value);
  };

  // 엔터로 입력
  const onKeyEnter = (e) => {
    if (e.key == "Enter") {
      handleCheck();
    }
  };

  const handleCheck = () => {
    axios
      .post(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/mypage/passcheck`,
        { pass }
      )
      .then((response) => history.push("/mypage/info"))
      .catch((error) => alert("비밀번호를 확인해주세요"));
  };

  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
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
      <Mileage closeModal={closeModal} modalChange={modalChange} />
      <div className={style.All_Mboxi}>
        <Link to="/mypage">
          <h1 className={style.page_namei}>마이페이지</h1>
        </Link>
        <div>
          <div className={style.Mboxi}>
            <div className={style.logo_boxi}>
              <img src={
                data.loginImg !== null
                  ? `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/member/${data.loginImg}`
                  : logo} alt="1"></img>
            </div>
            <div className={style.mileage_boxi}>
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
        </div>
        <div className={style.categoryi}>
          <h3>회원정보 수정</h3>
        </div>
        <div className={style.check}>
          <label>정보를 수정하려면 비밀번호를 확인해주세요.</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={changePass}
            onKeyDown={onKeyEnter}
          />

          <button type="button" onClick={handleCheck} value={pass}>
            확인
          </button>
        </div>
      </div>
    </>
  );
}

export default MypageCheck;
