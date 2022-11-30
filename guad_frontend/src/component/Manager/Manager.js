import style from "../../source/Manager.module.css";
import admin from "../../source/img/admin.png";
import logo_d from "../../source/img/mypage_d.png";

import sell_1 from "../../source/img/selling_item_ex1.png";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Manager() {
  const [datas, setDatas] = useState([]);
  const [datas2, setDatas2] = useState([]);

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/admin/member`).then((response) => {
      console.log(response.data);
      setDatas(response.data);
    });

    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/notify/admin/list`)
      .then((response) => {
        setDatas2(response.data);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          alert("접근 권한이 없습니다. 로그인 후 다시 접속해 주세요.");
        }
      });
  }, []);

  return (
    <>
      <div className={style.All_Mbox}>
        <h1 className={style.page_name}>관리자 페이지</h1>
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
              <Link to="/manager/notify">
                <button className={style.mileage}>신고내역</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={style.category}>
          <h3>최근 가입 회원</h3>
        </div>
        <div className={style.join}>
          {datas &&
            datas.map((memberList) => (
              <div className={style.user_list} key={memberList.memberNum}>
                <img
                  src={
                    memberList.loginImgName !== null &&  
                    memberList.loginImgName !== "null"  
                      ? `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/member/${memberList.loginImgName}`
                      : logo_d
                  }
                  alt="1"
                ></img>ㅊ
                <h3 key={memberList.memberNum}>{memberList.nickname}</h3>
              </div>
            ))}
        </div>

        <div className={style.category}>
          <h3>신고내역</h3>
        </div>

        <div className={style.notify}>
          <ul>
            {datas2 &&
              datas2.map((notify) => (
                <li key={notify.notifyNum} className={style.notify_list}>
                  <img src={`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${notify.itemImgName}`} alt={"img" + notify.notifyNum}></img>
                  <h3>{notify.notifyTitle}</h3>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Manager;
