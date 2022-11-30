import { useEffect, useState } from "react";
import style from "../../source/Moodal3.module.css";
import axios from "axios";

function NotifyWrite({ closeModal, modalChange, item }) {
  const [notifyTitle, setNotifyTitle] = useState("");
  const [notifyContents, setMemberPass] = useState("");

  const handlerNotifyTitle = (e) => setNotifyTitle(e.target.value);
  const handlerNotifyContents = (e) => setMemberPass(e.target.value);

  const handlerClickSubmit = (e) => {
    e.preventDefault();
    console.log(item.itemNum);
    axios.post(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/notify/write`,
      {
        "itemNum": item.itemNum,
        "notifyTitle": notifyTitle,
        "notifyContents": notifyContents
      })
      .then(response => {
        alert("신고접수 되었습니다, 접수된 내용은 메일로 확인 가능합니다.");
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        alert("다시 신고해 주세요.");
      });

      axios.post(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/notify/email`,
      {
        itemNum: item.itemNum,
        notifyTitle: notifyTitle,
        notifyContents: notifyContents,
      }
    );
  };

  // const handlerClickSubmit2 = (e) => {
  //   axios.post(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/notify/email`,
  //     {
  //       "itemNum": item.itemNum,
  //       "notifyTitle": notifyTitle,
  //       "notifyContents": notifyContents
  //     });
  // };

  return (
    <>
      <div className={style.modal} ref={modalChange}>
        <div className={style.modalcontent}>
          <div className={style.modalheader}>
            <img src={require("../../source/img/big_warn.png")} alt="2" />
            <h2>이 상품에 대해 신고하시겠습니까?</h2>
          </div>
          <div className={style.modalbody}>
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              onChange={handlerNotifyTitle}
            />
            <textarea
              placeholder="신고내용을 작성해주세요."
              onChange={handlerNotifyContents}
            ></textarea>
          </div>
          <div className={style.modalfooter}>
            <button
              type="button"
              className={style.redBtn}
              onClick={handlerClickSubmit}
            >
              신고하기
            </button>
            <button type="text" onClick={closeModal}>
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default NotifyWrite;
