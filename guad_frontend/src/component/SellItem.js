import { useEffect, useRef, useState } from "react";
import style from "../source/SellItem_n.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";
import BuyConfirm from "./Moodal/BuyConfirm";
import axios from "axios";

function SellItem({ history, match }) {
  const [item, setItem] = useState({});
  const [auctionPeriodText, setAuctionPeriodText] = useState();
  const [price, setPrice] = useState(0);
  const [imgList, setImgList] = useState([]);

  const [review, setReview] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sellitem/${match.params.itemNum}`
      )
      .then((response) => {
        console.log(response.data);
        imgList.push(response.data.itemImgName);
        imgList.push(response.data.itemImgNameSub2);
        imgList.push(response.data.itemImgNameSub3);
        setImgList(imgList);

        setItem(response.data);
        const tempPrice =
          response.data.sellType === "n"
            ? response.data.itemPrice
            : response.data.auctionStartPrice;
        setPrice(tempPrice);

        const date = new Date(
          response.data.auctionPeriod.slice(0, 10) +
            " " +
            response.data.auctionPeriod.slice(12, 19)
        );
        date.setHours(date.getHours() + 9);
        setAuctionPeriodText(
          `${date.getFullYear()}년 ${
            date.getMonth() + 1
          }월 ${date.getDate()}일 ${date.getHours()}시까지`
        );
      })
      .catch((error) => console.log(error));
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/review/${match.params.itemNum}`
      )
      .then((response) => {
        setReview(response.data);
        let sumRating = 0;
        if (response.data.length > 0) {
          response.data.forEach((element) => {
            sumRating += element.starPoint;
          });
          sumRating = Math.round((sumRating / response.data.length) * 10) / 10;
        }
        setAverageRating(sumRating);
        console.log(response.data);
      })
      .catch((error) => console.log(error));

    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        closeModal();
        closeModal2();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, []);

  console.log(auctionPeriodText);

  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
  };

  const modalChange2 = useRef();
  const closeModal2 = () => {
    modalChange2.current.style = "display:none;";
  };

  const openModal2 = () => {
    if (sessionStorage.length != 0) {
      modalChange2.current.style = "display:block;";
    } else {
      alert("로그인이 필요합니다.");
      history.push("/login");
    }
  };

  return (
    <>
      <NotifyWrite
        closeModal={closeModal}
        modalChange={modalChange}
        item={item}
      />
      <BuyConfirm
        closeModal2={closeModal2}
        modalChange2={modalChange2}
        item={item}
        price={price}
        history={history}
      />

      <div id={style.item_num} className={style.item_num}>
        {item.itemNum}
      </div>
      <div className={style.item_top}>
        <h2>
          <strong>일반</strong>
          판매
        </h2>
        <div className={style.img_item}>
          <img
            src={
              item.itemImgName &&
              `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${item.itemImgName}`
            }
            alt={"img" + item.notifyNum}
            className={style.item}
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
                  alt={"img" + item.notifyNum}
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
            onClick={openModal}
          />
          <span className={style.top_head}>상품 정보</span>
          <span className={style.top_cate}>{item.itemType}</span>
          <span className={style.top_title}>{item.itemSub}</span>
          <div className={style.rating_option}>
            <img src={require("../source/img/star.png")} alt="별점" />
            <span>{averageRating}</span>
          </div>
          <div className={style.rating_option2}>
            <img src={require("../source/img/see.png")} alt="조회수" />
            <span>{item.hitCnt}</span>
          </div>
          <div className={style.contents_in}>
            <div className={style.deli_box}>
              <span className={style.deli_name}>배송비</span>
              <span className={style.deli_tag}>배송비 포함</span>
            </div>
            <div className={style.sell_box}>
              <span className={style.sell_price}>판매가</span>
              <span className={style.sell_number}>
                {price?.toLocaleString()}
              </span>
            </div>
            <div className={style.button_box}>
              <button type="button" className={style.buy} onClick={openModal2}>
                구매
              </button>
              <span className={style.seller}>
                판매자 : <strong>{item.nickname}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={style.item_bot}>
        <h2>상품 설명</h2>
        <p>{item.itemContents}</p>
        <div className={style.sell_review}>
          <h2>판매자님에 대한 리뷰</h2>
          <img src={require("../source/img/red_star.png")} alt="붉은별" />
          <span>{averageRating}</span>
        </div>
        <div className={style.sell_review_show}>
          <ul>
            {review === null ? (
              <p>"등록된 리뷰가 없습니다."</p>
            ) : (
              review.map((rev, index) => (
                <li key={index}>
                  <span>{rev.writerNickname}</span>
                  <img
                    src={require("../source/img/gray_star.png")}
                    alt="회색별"
                  />
                  <span>{rev.starPoint}</span>
                  <span className={style.review_write}>{rev.contents}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
export default SellItem;
