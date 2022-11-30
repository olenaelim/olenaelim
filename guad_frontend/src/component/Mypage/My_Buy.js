import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../../source/Mypage_SellList.module.css";

function My_Buy() {

  const [buyList, setBuyList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/buylistd`)
      .then((response) => {
        console.log(response);
        setBuyList(response.data);     
      });
  }, []);

  return (
    <>
      <div className={style.sell}>
      {buyList &&
          buyList.map((list, index) => (
        <Link to= {`/sell_end/${list.sellType}/${list.itemNum}`}>
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
export default My_Buy;
