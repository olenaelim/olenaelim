import style from "../../source/Mypage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
//선언하지 않아도, 디바이스 혹은 locale의 시간을 불러온다.
import "moment/locale/ko"; //대한민국
import { Link } from "react-router-dom";

function UserBuyList({}) {
  const [buyList, setBuyList] = useState([]);
  var tempDate = moment().format("YYYY-MM-DD");
  buyList.soldDate = tempDate;

  console.log(buyList[1]);
  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/buylist`)
      .then((response) => {
        console.log(response);
        setBuyList(response.data);
        console.log(typeof response.data[0].soldDate);
      });
  }, []);

  return (
    <>
      <div className={style.category}>
        <h3>
          구매 내역
          <Link to="/mypage/sellList">
            <strong>더보기</strong>
          </Link>
        </h3>
      </div>

      <div className={style.buy_list_all}>
        {/* <div className={style.no_buy_info}>
            <button>상품 구매하러 가기</button>
          </div>  */}

        {/* {buyList && ( */}

        {buyList &&
          buyList.map((list, index) => (
            <div className={style.buy_list}>
              <Link to={`/sell_end/${list.sellType}/${list.itemNum}`}>
              <div className={style.item_bb} key={list.itemNum}>
                <img
                  src={`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${list.itemImgName}`}
                  alt={"img" + list.itemNum}
                />
              </div>
              </Link>
              <div className={style.buy_list_info}>
                <h3>
                  <strong>상품명 : </strong>
                  {list.itemSub}
                </h3>
                <h3>
                  <strong>가격 : </strong>
                  {list.itemPrice.toLocaleString()}
                </h3>
                <h3>
                  <strong>주소 : </strong>
                  {list.address}
                </h3>
                <h3>
                  <strong>판매자 연락처 : </strong>
                  {list.sellerPhone}
                </h3>
              </div>
              <div className={style.buycheck}>
                <button className={style.button}>거래완료</button>
                <h3>
                  <strong>구매 일자 : </strong>
                  {list.soldDate.slice(0, 10)}
                </h3>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default UserBuyList;
