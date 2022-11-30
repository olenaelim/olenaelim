import style from "../source/SellItem.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";
import { useRef, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { data } from "jquery";

function Sell_End_n({ match, modalOpen }) {
  const ratingList = [1, 2, 3, 4, 5];

  const [dataList, setDataList] = useState("");
  const [soldDateText, setSoldDateText] = useState("");
  const [imgList, setImgList] = useState([]);
  const [item, setItem] = useState([]);

  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };
  const openModal = () => {
    modalChange.current.style = "display:block;";
  };

  // sell_item_result + sell_item + sellerNickname + buyerNickname + img
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
        const date = new Date(
          response.data.soldDate.slice(0, 10) +
            " " +
            response.data.soldDate.slice(12, 19)
        );
        date.setHours(date.getHours() + 9);
        setSoldDateText(
          `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
        );
      });
  }, []);

  // review 목록 조회
  const [reviewList, setReviewList] = useState([]);
  const [reviewUpdate, setReviewUpdate] = useState(false); // 리뷰가 작성되면 값이 바뀌고, 바뀐것을 감지해서 리뷰목록 갱신
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    console.log(sessionStorage.getItem("nickname"));
    console.log(dataList.buyerNickname);

    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/review/${match.params.itemNum}`
      )
      .then((response) => {
        console.log(response.data);
        setReviewList(response.data);
        let sumRating = 0;
        if (response.data.length > 0) {
          response.data.forEach((element) => {
            sumRating += element.starPoint;
          });
          sumRating = Math.round((sumRating / response.data.length) * 10) / 10;
        }
        setAverageRating(sumRating);
      })
      .catch((err) => console.log(err));
  }, [reviewUpdate]);

  console.log(averageRating);

  // 리뷰 작성
  const [rating, setRating] = useState("");
  const [reviewContents, setReviewContents] = useState("");
  const ratingClick = (e) => {
    setRating(e.target.name);
  };
  const handleSubmit = () => {
    axios
      .post(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/review`, {
        itemNum: match.params.itemNum,
        sellerEmail: dataList.sellerEmail,
        writerNickname: dataList.nickname,
        contents: reviewContents,
        starPoint: rating,
      })
      .then((response) => {
        console.log(response);
        alert("리뷰 작성이 완료되었습니다.");
        setReviewUpdate(!reviewUpdate);
        modalOpen.current.style = "display:none;";
      });
  };

  const onReviewChange = (e) => {
    setReviewContents(e.target.value);
  };
  console.log(reviewContents);
  return (
    <>
      <NotifyWrite
        closeModal={closeModal}
        modalChange={modalChange}
        item={item}
      />
      <div className={style.item_top}>
        <h2 className={style.normal}>
          <strong>일반</strong>판매
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
          <span className={style.up1}>판매종료</span>
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
            <img src={require("../source/img/star.png")} alt="별점" />
            <span>{averageRating}</span>
          </div>
          <div className={style.rating_option}>
            <img src={require("../source/img/see.png")} alt="조회수" />
            <span>{dataList.hitCnt}</span>
          </div>
          <div className={style.last_nn}>
            <h2>
              판매자 : <strong>{dataList.sellerNickname}</strong>
            </h2>
            <p className={style.n_1}>
              배송비<strong>배송비 포함</strong>
            </p>
            <p className={style.n_2}>
              판매가<strong>{dataList.itemPrice?.toLocaleString()}</strong>
            </p>
            <span>
              판매날짜 : <strong>{soldDateText}</strong>
            </span>
            <span className={style.nn_last22}>
              구매자 : <strong>{dataList.buyerNickname}</strong>
            </span>
          </div>
        </div>
      </div>
      <div className={style.item_bot}>
        <h2>상품 설명</h2>
        <p>{dataList.itemContents}</p>
        {/* 구매자 == 로그인한 회원 && 해당 상품에 대한 리뷰 작성 기록이 없는 경우에만
          리뷰 작성기능 표시 */}
        {dataList.buyerNickname === sessionStorage.getItem("nickname") &&
          reviewList.filter(
            (review) =>
              review.writerNickname === sessionStorage.getItem("nickname") &&
              review.itemNum === match.params.itemNum * 1
          ).length === 0 && (
            <div className={style.rating}>
              <h3>거래는 어떠셨나요?</h3>
              <div className={style.star}>
                {ratingList.map((r, index) => (
                  <img
                    src={
                      r <= rating
                        ? require("../source/img/rating1.png")
                        : require("../source/img/rating2.png")
                    }
                    alt="별점"
                    name={r}
                    onClick={ratingClick}
                    key={index}
                  />
                ))}
              </div>
              <textarea
                placeholder="거래후기를 작성해주세요."
                onChange={onReviewChange}
                value={reviewContents}
              ></textarea>
              <button type="button" onClick={handleSubmit}>
                작성
              </button>
            </div>
          )}
        <div className={style.sell_review}>
          <h2>{dataList.sellerNickname} 님에 대한 리뷰</h2>
          <img src={require("../source/img/red_star.png")} alt="붉은별" />
          <span>{averageRating}</span>
        </div>
        <div className={style.sell_review_show}>
          <ul>
            {reviewList?.length >= 1 &&
              reviewList.map((review, index) => (
                <li key={index}>
                  <span>{review.writerNickname}</span>
                  <img
                    src={require("../source/img/gray_star.png")}
                    alt="회색별"
                  />
                  <span>{review.starPoint}</span>
                  <span className={style.review_write}>{review.contents}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export default Sell_End_n;
