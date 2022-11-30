import axios from "axios";
import { useEffect, useState } from "react";
import style from "../../source/Moodal9.module.css";

function My_Notify({ modalChange3, closeModal3 }) {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/notify/my/list`
      )
      .then((response) => {
        setDatas(response.data);
        console.log(response.data);
      });
  }, []);
 

  console.log(datas[0]);
  return (
    <>
      <div id="my-modal" className={style.modal} ref={modalChange3}>
        <div className={style.modalcontent}>
          <div className={style.modalheader}>
            <img src={require("../../source/img/warn3.png")} alt="경고" />
            <h3>신고내역</h3>
          </div>
          <div className={style.modalbody}>
            <div className={style.main_tag}>
              <p>제목 / 물품 판매자</p>
              <p>내용</p>
            </div>
            <ul>
              {datas &&
                datas.map((notify) => (
                  <li key={notify.notifyNum}>
                    <div>
                      <span>{notify.notifyTitle}</span>
                      <span>{notify.sellerEmail}</span>
                    </div>
                    <p>{notify.notifyContents}</p>
                  </li>
                ))}
            </ul>
          </div>
          <div className={style.modalfooter}>
            <button type="button" onClick={closeModal3}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default My_Notify;
