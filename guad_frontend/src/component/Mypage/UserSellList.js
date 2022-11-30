import style from "../../source/Mypage.module.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import "../../source/test.css";
import { Link } from "react-router-dom";
import { now } from "moment";

function UserSellList({ history }) {
  const [sellList, setSellList] = useState([]);
  let now = new Date()
  
  function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    
    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;
    
    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }
  
  console.log(dateFormat(now));

  useEffect(() => {
    axios.get(`https://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/selllist`).then((response) => {
      setSellList(response.data);      
    });
  }, []);
 
  return (
    <>
      <div className={style.category}>
        <h3>
          판매 내역
          <Link to="/mypage/sellList">
            <strong>더보기</strong>
          </Link>
        </h3>
      </div>

      <div className={style.sell_list_all}>
        {/* <div className={style.no_sell_info}>
            <button>상품 구매하러 가기</button>
          </div>  */}

        {/* {sellList && ( */}
        {/* 거래완료 */}
        {sellList &&
          sellList.map((list) => (
            <div className={style.sell_list}>
              <Link to={list.soldYn === 'y' || list.soldYn === 'Y' ? `/sell_end/${list.sellType}/${list.itemNum}`:`/sell_item/${list.sellType}/${list.itemNum}`}>
              <div className={style.item_bb} key={list.itemNum}>
                <img
                  src={`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${list.itemImgName}`}
                  alt={"img" + list.itemNum}
                />
                <img
                  src={require("../../source/img/del2.png")}
                  alt="1"
                  className={style.del_icon}
                ></img>
              </div>
              </Link>
              <div className={style.sell_list_info}>
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
                  <strong>구매자 연락처 : </strong>
                  {list.buyerPhone}
                </h3>
              </div>
              <div className={style.sellcheck}>
                <button className={list.auctionFinishDate < dateFormat(now) ? "경매만료" : list.sellState}>{list.auctionFinishDate < dateFormat(now) ? "경매만료" : list.sellState}</button>
                <h3>
                  <strong>구매 일자 : </strong>
                  {list.soldDate && list.soldDate.substring(0, 10)}
                </h3>
              </div>
            </div>
          ))}       
      </div>
    </>
  );
}

export default UserSellList;
