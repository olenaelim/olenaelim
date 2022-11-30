import React, { useEffect, useRef, useState } from "react";
import style from "../../source/Moodal.module.css";

function Terms() {
  const [allCheck, setAllCheck] = useState(false);
  const [ccc1, setCcc1] = useState(false);
  const [ccc2, setCcc2] = useState(false);
  const [ccc3, setCcc3] = useState(false);

  const modalOpen = useRef();

  useEffect(() => {
    if (ccc1 && ccc2 && ccc3) {
      setAllCheck(true)
    } else if (!ccc1 || !ccc2 || !ccc3) {
      setAllCheck(false)
    }
  }, [ccc1, ccc2, ccc3])

  const handlerAllCheck = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setCcc1(true)
      setCcc2(true)
      setCcc3(true)
    } else {
      setAllCheck(false);
      setCcc1(false)
      setCcc2(false)
      setCcc3(false)
    }
  };
  const changeImg1 = () => {
    setCcc1(!ccc1)
  };
  const changeImg2 = () => {
    setCcc2(!ccc2);
  };
  const changeImg3 = () => {
    setCcc3(!ccc3)
  };

  const closeModal = () => {
    if (ccc1 === false || ccc2 === false) {
      alert("동의를 확인해주세요.");
    } else {
      modalOpen.current.style = "display:none;";
    }
  };

  useEffect(() => {
    (function openModal() {
      modalOpen.current.style = "display:block;";
    })();
  }, []);

  return (
    <>
      <div id="my-modal" className={style.modal} ref={modalOpen}>
        <div className={style.modalcontent}>
          <div className={style.modalheader}>
            <span className={style.close} id="close" onClick={closeModal}>
              &times;
            </span>
            <h2>동의 약관 확인</h2>
          </div>
          <div className={style.modalbody}>
            <ul>
              <li>
                <button
                  type="button"
                  className={style.check_1}
                  onClick={handlerAllCheck}
                >
                  전체동의<strong> &#40;선택항목 포함&#41;</strong>
                  <span>
                    <img
                      src={
                        allCheck
                          ? require("../../source/img/check01.png")
                          : require("../../source/img/check00.png")
                      }
                      alt="체크"
                      id="cc1"
                    />
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={[style.check_2, style.check_9].join("")}
                  onClick={changeImg1}
                >
                  이용약관 동의 &#40;필수&#41;<strong> 보기</strong>
                  <span>
                    <img
                      src={
                        ccc1
                          ? require("../../source/img/check01.png")
                          : require("../../source/img/check00.png")
                      }
                      alt="체크"
                      id="cc2"
                    />
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={[style.check_3, style.check_9].join("")}
                  onClick={changeImg2}
                >
                  개인정보 수집 및 이용동의 &#40;필수&#41;
                  <strong> 보기</strong>
                  <span>
                    <img
                      src={
                        ccc2
                          ? require("../../source/img/check01.png")
                          : require("../../source/img/check00.png")
                      }
                      alt="체크"
                      id="cc3"
                    />
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={[style.check_4, style.check_9].join("")}
                  onClick={changeImg3}
                >
                  마케팅정보 이용 동의 추가 &#40;선택&#41;<strong> 보기</strong>
                  <span>
                    <img
                      src={
                        ccc3
                          ? require("../../source/img/check01.png")
                          : require("../../source/img/check00.png")
                      }
                      alt="체크"
                      id="cc4"
                    />
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className={style.modalfooter}>
            <button
              type="button"
              className={style.allcheckall}
              id="allcheckall"
              onClick={closeModal}
            >
              동의확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Terms;
