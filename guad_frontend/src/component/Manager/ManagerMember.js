import axios from "axios";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import admin from "../../source/img/admin.png";
import logo_d from "../../source/img/mypage_d.png";
import style from "../../source/ManagerMember.module.css";
import MemeberInfo from "../Moodal/MemberInfo";

function ManagerMember() {
  const [datas, setDatas] = useState([]);
  const [infoEmail, setInfoEmail] = useState("");
  const [memberUpdate, setMemberUpdate] = useState(false);

  const handlerMember = (e) => {
    setInfoEmail(e);
    openModal();
  };

  const modalChange = useRef();

  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = (e) => {
    modalChange.current.style = "display:block;";
  };

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/admin/member`
      )
      .then((response) => {
        console.log(response.data);
        setDatas(response.data);
      });
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, [memberUpdate]);

  const onRemove = () => {
    if (window.confirm("해당 회원을 추방하시겠습니까?")) {
      axios
        .post(
          `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member/delete`,
          { email: infoEmail }
        )
        .then((response) => {
          alert("회원 추방 완료");
          setMemberUpdate(!memberUpdate);
          modalChange.current.style = "display:none;";
        });
    } else {
      alert("취소 되었습니다.");
    }
  };

  return (
    <>
      <MemeberInfo
        modalChange={modalChange}
        closeModal={closeModal}
        infoEmail={infoEmail}
        onRemove={onRemove}
      />
      <div className={style.All_Mbox}>
        <Link to="/manager">
          <h1 className={style.page_name}>관리자 페이지</h1>
        </Link>
        <div>
          <div className={style.Mbox}>
            <div className={style.logo_box}>
            <img src={admin} alt="1"></img>
            </div>
            <div className={style.mileage_box}>
              <h3>
                <strong>관리자</strong>님 환영합니다!
              </h3>
            </div>
            <div className={style.Mbox_button}>
              <button className={style.member}>회원관리</button>
              <Link to="/manager/notify">
                <button className={style.mileage}>신고내역</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={style.category}>
          <h3 className={style.list}>회원목록</h3>
          <h3 className={style.name}>닉네임</h3>
          <h3 className={style.id}>아이디</h3>
          <h3 className={style.address}>주소</h3>
        </div>

        <div className={style.user_detail}>
          {datas &&
            datas.map((ml, index) => (
              <div
                className={style.user_list}
                key={ml.memberNum}
                onClick={() => handlerMember(ml.email)}
              >
                <div className={style.logo} onClick={openModal} name={ml.email}>
                  <div className={style.logo_boxi}>
                    <img src={
                      ml.loginImgName !== null && ml.loginImgName !== "null" 
                        ? `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/member/${ml.loginImgName}`
                        : logo_d} alt="1"></img>
                  </div>
                </div>
                <div className={style.name}>
                  <h3>{ml.nickname}</h3>
                </div>
                <div className={style.id}>
                  <h3>{ml.email}</h3>
                </div>
                <div className={style.address}>
                  <h3>{ml.address}</h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default ManagerMember;
