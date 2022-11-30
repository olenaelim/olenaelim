import { useEffect } from "react";
import { useState } from "react";
import style from "../source/SellItem_u.module.css";

function Up_Before({ openModal, clickStart, item, bid, auctionCurrentPrice }) {
  const [auctionPeriodText, setAuctionPeriodText] = useState();
  console.log(typeof item.auctionPeriod);

  useEffect(() => {
    console.log(item);
    if (item.auctionPeriod) {
      const date = new Date(
        item.auctionPeriod.slice(0, 10) + " " + item.auctionPeriod.slice(12, 19)
      );
      date.setHours(date.getHours() + 9);
      setAuctionPeriodText(
        `${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월 ${date.getDate()}일 ${date.getHours()}시까지`
      );
    }
  }, [item]);

  return (
    <>
      <div className={style.info_top}>
        <img
          src={require("../source/img/warn.png")}
          alt="신고"
          onClick={openModal}
        />
        <span className={style.top_head}>상품 정보</span>
        <span className={style.top_cate}>{item.itemType}</span>
        <span className={style.top_title}>{item.itemSub}</span>
        <div className={style.see_option}>
          <img src={require("../source/img/see.png")} alt="조회수" />
          <span>{item.hitCnt}</span>
        </div>
        <div className={style.cont_bot}>
          <span className={style.seller_b}>
            판매자 : <strong>{item.nickname}</strong>
          </span>
          <div className={style.deli_box}>
            <span className={style.deli_name}>배송비</span>
            <span className={style.deli_tag}>배송비 포함</span>
          </div>
          <div className={style.sell_bb}>
            <span className={style.sell_price}>경매 시작가</span>
            <span className={style.sell_number}>
              {item.auctionStartPrice?.toLocaleString()}
            </span>
          </div>
          <div className={style.button_box}>
            <button className={style.buy_in} onClick={clickStart}>
              입찰 참여
            </button>
            <span className={style.sell_date}>
              {bid === -1
                ? "최고 경매가 달성"
                : bid === 0
                ? "입찰 인원이 없습니다."
                : "현재 입찰가 : " + `${auctionCurrentPrice?.toLocaleString()}`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Up_Before;
