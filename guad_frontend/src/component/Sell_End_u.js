import style from "../source/SellItem.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function Sell_End_u({match}) {
  const [dataList, setDataList] = useState("");
  const [imgList, setImgList] = useState([]);
  const [item, setItem] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sell/normal/${match.params.itemNum}`
      )
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
        setDataList(response.data);
        imgList.push(response.data.itemImgName);
        imgList.push(response.data.itemImgNameSub2);
        imgList.push(response.data.itemImgNameSub3);
        setImgList(imgList);
      });
  }, []);


  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };
  const openModal = () => {
    modalChange.current.style = "display:block;";
  };

  return (
    <>
      <NotifyWrite closeModal={closeModal} modalChange={modalChange} item={item}/>
      <div className={style.item_top}>
        <h2>
          <strong>오름</strong>경매
        </h2>
        <div className={style.img_item}>
           <img
            src={
              dataList.itemImgName &&
              `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${dataList.itemImgName}`
            }
            alt="제품사진"
            className={style.dataList}
          />
          <span className={style.up1}>경매종료</span>
          <img
            src={require("../source/img/del3_b.png")}
            alt="경매끝"
            className={style.up2}
          />
          <ul>
          {imgList?.map((img, index) => (
              <li key={index}>
                <img
                  src={
                    img
                      ? `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${img}`
                      : require("../source/img/no_photo.png")
                  }
                  alt={"img" + dataList.notifyNum}
                  className={style.item_o}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={style.info_top}>
          <img
            src={require("../source/img/warn.png")}
            alt="신고"
            id="openMan"
            onClick={openModal}
          />
          <span className={style.top_head}>상품 정보</span>
          <span className={style.top_cate}>{dataList.itemType}</span>
          <span className={style.top_title}>{dataList.itemSub}</span>
          <div className={style.rating_option}>
            <img src={require("../source/img/see.png")} alt="조회수" />
            <span>{dataList.hitCnt}</span>
          </div>
          <div className={style.end_bb}>
            <span className={style.last_price}>최종 낙찰가</span>
            <span className={style.last_number}> {dataList.itemPrice?.toLocaleString()}</span>
          </div>
          <div className={style.last_bb}>
            <h2>
              판매자 : <strong>{dataList.sellerNickname}</strong>
            </h2>
            <span className={style.bb_last}>
              최종 입찰자 : <strong>{dataList.buyerNickname}</strong>
            </span>
          </div>
        </div>
      </div>
      <div className={style.item_bot}>
        <h2>상품 설명</h2>
        <p>
        {dataList.itemContents}
        </p>
      </div>
    </>
  );
}
export default Sell_End_u;
