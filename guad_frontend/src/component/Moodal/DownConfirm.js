import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../../source/Moodal8.module.css";

function DownConfirm({
  closeModal2,
  modalChange2,
  item,
  history,
  auctionCurrentPrice,
  discountRateNow,
}) {
  console.log(item);
  console.log(auctionCurrentPrice);
  console.log(discountRateNow);
  //////////////////////마일리지 정보/////////////////////////
  const [member, setMember] = useState({});
  const [result, setResult] = useState(0);
  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member`)
      .then((response) => {
        setMember(response.data);
        setResult(response.data.mileage - auctionCurrentPrice);
        console.log("<<<<<<<<<<<<<<<" + auctionCurrentPrice);
      })
      .catch((error) => console.log(error));
  }, [auctionCurrentPrice]);
  ////////////////////상품구매////////////////////////

  console.log(member);

  let requestTrade = {
    sellType: item.sellType,
    itemSub: item.itemSub,
    itemPrice: auctionCurrentPrice, //최종 판매가격
    itemNum: item.itemNum,
    soldYn: item.soldYn,
    mileage: member.mileage,
    address: member.address + member.addressDetail,
  };

  const handlerTrade = () => {
    if (result < 0) {
      alert("마일리지가 부족합니다. 충전 후 이용해주세요.");
      history.push("/mypage");
    } else {
      axios
        .post(
          `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sell`,
          requestTrade
        )
        .then((response) => {
           if (response.data == true) {
            console.log(response.data);
            alert("결제에 성공했습니다.");
            history.push(`/sell_after/${item.itemNum}`);
          } else if (response.data == false){
            console.log(response.data)
            alert("이미 거래 완료된 제품입니다.")
            history.push(`/sell_List`);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("조건이 맞지않아 구매할수 없습니다!");
        });
    }
  };
  //////////////////////////////////////////////
  const [dd, setDd] = useState(false);
  return (
    <>
      <div className={style.modal2} ref={modalChange2}>
        <div className={style.modalcontent2}>
          <div className={style.modalheader2}>
            <h2>입찰 내역</h2>
            <span className={style.close} onClick={closeModal2}>
              &times;
            </span>
          </div>
          <div className={style.modalbody2}>
            <div className={style.body_top}>
              <img
                src={
                  item.itemImgName &&
                  `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${item.itemImgName}`
                }
                alt={"img" + item.notifyNum}
              />
              <p className={style.tag1}>상품 정보</p>
              <p className={style.tag2}>{item.itemSub}</p>
              <p className={style.tag3}>
                현재 입찰가 :{" "}
                <strong>
                  {auctionCurrentPrice?.toLocaleString()} (
                  {discountRateNow.toFixed(1)}%)
                </strong>
              </p>
            </div>
            <div className={style.body_mid}>
              <p className={style.tag4}>
                내 마일리지 <strong>{member.mileage?.toLocaleString()}</strong>
              </p>
              <p className={style.tag5}>
                현재 입찰가{" "}
                <strong>-{auctionCurrentPrice?.toLocaleString()}</strong>
              </p>
            </div>
          </div>
          <div className={style.modalfooter2}>
            <h3>거래 결과</h3>
            <p className={style.tag6}>
              거래 후 마일리지<strong>{result?.toLocaleString()}</strong>
            </p>
            <button type="button" onClick={handlerTrade}>
              입찰완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default DownConfirm;
