import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../../source/Mypage_SellList.module.css";

function My_Sell() {

  const [sellList, setSellList] = useState([]);

  useEffect(() => {
    axios.get(`https://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/selllistd`).then((response) => {
      setSellList(response.data);    
   
    });
  }, []);

  return (
    <>
      <div className={style.sell}>
      {sellList &&
          sellList.map((list) => (
         <Link to={list.sellState === "판매완료" || list.sellState === '판매완료' ? `/sell_end/${list.sellType}/${list.itemNum}` : `/sell_item/${list.sellType}/${list.itemNum}`}>
        <div className={style.sell_list}>
          <img src={`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${list.itemImgName}`}
               alt={"img" + list.itemNum} />
          <h3>{list.itemSub}</h3>
        </div>
        </Link>
          ))}
      </div>
    </>
  );
}
export default My_Sell;
