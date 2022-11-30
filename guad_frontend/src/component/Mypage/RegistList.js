import style from "../../source/Mypage.module.css";
import { useState } from "react";

function RegistList() {
  const [sellList, setSellList] = useState({});

  return (
    <>
      <div className={`${style.category} ${style.category1}`}>
        <h3>등록 상품 내역</h3>
      </div>
      <div className={style.insert_list}>
        {/* <div className={style.no_sell_info}>
            <h3>등록된 상품이 없습니다.</h3>
            <h3>내 상품을 간편하게 등록해보세요.</h3>
            <button>
              <img src={plus} alt="1"></img>
              <div>상품 등록하러 가기</div>
            </button>
          </div> */}
        {sellList && (
          <div>
            <div className={style.item_bb}>
              <img
                src={require("../../source/img/selling_item_ex2.png")}
                alt="1"
              ></img>
              <img
                src={require("../../source/img/del1.png")}
                alt="1"
                className={style.del_icon}
              ></img>
            </div>

            <div className={style.item_bb}>
              <img
                src={require("../../source/img/selling_item_ex2.png")}
                alt="1"
              ></img>
              <img
                src={require("../../source/img/del2.png")}
                alt="1"
                className={style.del_icon}
              ></img>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default RegistList;
