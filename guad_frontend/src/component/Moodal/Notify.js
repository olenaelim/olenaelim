import style from "../../source/Moodal4.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { data } from "jquery";

function Notify({ closeModal, modalChange, notifyNum}) {

  const [datas, setDatas] = useState({});
  console.log(datas);

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/notify/admin/${notifyNum}`)
      .then(response => {
        setDatas(response.data);
      })
      .catch(error => {
        if (error.response.status === 403) {
          alert("접근 권한이 없습니다. 로그인 후 다시 접속해 주세요.");
        }
      });
  }, [notifyNum]);



  return (
    <>
      <div id="my-modal" className={style.modal} ref={modalChange}>
        <div className={style.modalcontent}>
          <span class={style.close} onClick={closeModal}>
            &times;
          </span>
       
                <div className={style.modalheader}>
                  <img src={require("../../source/img/big_warn.png")} alt="2" />
                  <h2 className={style.title}>접수된 신고 내용</h2>
                  <h3 className={style.member}>신고자: {datas.memberEmail}</h3>
                </div>
                <div className={style.modalbody}>
                  <div className={style.seller}>
                    <h3 className={style.seller}>판매자</h3>
                    <h3>{datas.sellerEmail}</h3>
                  </div>
                  <div className={style.category}>
                    <h3 className={style.title}>제목</h3>
                    <h3>{datas.notifyTitle}</h3>
                  </div>
                </div>
                <div className={style.message}>
                  <p>
                    {datas.notifyContents}
                  </p>
                </div>
        
       
          <div className={style.modalfooter}>
            <button type="button" className={style.redBtn}>
              접수확인
            </button>
            <button onClick={closeModal} type="text" id="outMan">
              보류
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notify;
