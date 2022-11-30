import React, { useEffect, useState } from "react";
import style from "../../source/Moodal2.module.css";

function Moodal2({ closeModal, modalOpen, itemSub, itemContents }) {
  const [sub, setSub] = useState('');
  const [contents, setContents] = useState('');
  useEffect(() => {
    setSub(itemSub)
    setContents(itemContents)
  }, [itemSub, itemContents])
  return (
    <>
      <div className={style.modal} ref={modalOpen}>
        <div className={style.modalcontent}>
          <div className={style.modalheader}>
            {/* 이건 닫기버튼 */}
            <span className={style.close} onClick={closeModal}>
              &times;
            </span>
            <img src={require("../../source/img/check03.png")} alt="2" />
          </div>
          <div className={style.modalbody}>
            <h2>상품 등록에 성공했습니다!</h2>
            <h3>판매목록에서 확인해보세요.</h3>
          </div>
          <div className={style.modalfooter}>
            <h2>{sub}</h2>
            <img src={require("../../source/img/Line.png")} alt="33" />
            <h3>{contents}</h3>
            <button type="button" onClick={closeModal}>
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Moodal2;
