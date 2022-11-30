import style from "../../source/ManagerNotify.module.css";
import admin from "../../source/img/admin.png";
import logo from "../../source/img/mypage.png";
import Notify from "../Moodal/Notify";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ManagerNotify() {
  const [datas, setDatas] = useState([]);
  const [notifyNum, setNotifyNum] = useState("");

  useEffect(() => {
    // axios
    //   .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/notify/admin/img/list`)
    //   .then((response) => {
    //     console.log('======= 이미지 목록 조회 성공 =======')
    //     console.log(response.data);

    //     setImg(response.data);
    //   })
    //   .catch((error) => {
    //     console.log('======= 이미지 목록 조회 실패 =======')
    //     console.log(error)
    //     alert("이미지 불러오기 실패");
    //   });

    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/notify/admin/list`
      )
      .then((response) => {
        setDatas(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          alert("접근 권한이 없습니다. 로그인 후 다시 접속해 주세요.");
        }
      });
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, []);

  const modalChange = useRef();

  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
  };

  const handlerNotify = (e) => {
    setNotifyNum(e);
    openModal();
  };

  return (
    <>
      <Notify
        closeModal={closeModal}
        modalChange={modalChange}
        notifyNum={notifyNum}
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
              <Link to="/manager/member">
                <button className={style.member}>회원관리</button>
              </Link>
              <button className={style.mileage}>신고내역</button>
            </div>
          </div>
        </div>

        <div className={style.category}>
          <h3>신고내역</h3>
        </div>

        <div className={style.notify}>
          {datas &&
            datas.map((notify) => (
              <div
                key={notify.notifyNum}
                className={style.notify_list}
                onClick={() => handlerNotify(notify.notifyNum)}
              >
                <img
                  src={`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${notify.itemImgName}`}
                  alt={"img" + notify.notifyNum}
                />
                <h3>{notify.notifyTitle}</h3>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ManagerNotify;
