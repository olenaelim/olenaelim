import style from "../source/SellItem.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { clear } from "@testing-library/user-event/dist/clear";

function Sell_End_d({ match }) {
  const [dataList, setDataList] = useState("");
  const [imgList, setImgList] = useState([]);
  const [item, setItem] = useState([]);

  // sell_item_result + sell_item + sellerNickname + buyerNickname + img
  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sell/normal/${match.params.itemNum}`
      )
      .then((response) => {
        console.log(response.data);
        setDataList(response.data);
        setItem(response.data);
        imgList.push(response.data.itemImgName);
        imgList.push(response.data.itemImgNameSub2);
        imgList.push(response.data.itemImgNameSub3);
        setImgList(imgList);
      });
  }, []);

  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/review/${match.params.itemNum}`
      )
      .then((response) => {
        console.log(response.data);
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
  }, []);

  //////////////// 댓글 관련 /////////////////
  const [comments, setComments] = useState([]);
  const [contents, setContents] = useState("");
  const [commentUpdate, setCommentUpdate] = useState(false);
  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/noauth/comments/${match.params.itemNum}`
      )
      .then((response) => {
        setComments(response.data);
      });
  }, [commentUpdate]);

  const handleChange = (e) => {
    setContents(e.target.value);
  };

  const handleWrite = () => {
    console.log(match.params.itemNum);
    console.log(contents);
    if (sessionStorage.length === 0) {
      alert("로그인 해주세요");
    } else {
      axios
        .post(
          `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/comments`,
          {
            itemNum: match.params.itemNum,
            contents,
          }
        )
        .then((response) => {
          console.log(response);
          alert("후기 작성이 완료되었습니다.");
          setCommentUpdate(!commentUpdate);
          setContents("");
        });
    }
  };
  ////////////////////////////////////////////

  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };
  const openModal = () => {
    modalChange.current.style = "display:block;";
  };

  return (
    <>
      <NotifyWrite
        closeModal={closeModal}
        modalChange={modalChange}
        item={item}
      />
      <div className={style.item_top}>
        <h2 className={style.down}>
          <strong>내림</strong>경매
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
            <span className={style.last_number22}>
              {dataList.itemPrice?.toLocaleString()}
            </span>
          </div>
          <div className={style.last_bb}>
            <h2>
              판매자 : <strong>{dataList.sellerNickname}</strong>
            </h2>
            <span className={style.bb_last22}>
              최종 입찰자 : <strong>{dataList.buyerNickname}</strong>
            </span>
          </div>
        </div>
      </div>
      <div className={style.item_bot}>
        <h2>상품 설명</h2>
        <p>{dataList.itemContents}</p>
      </div>
      <div className={style.review_dd}>
        <div className={style.fuck1}>
          <img src={require("../source/img/talk.png")} alt="목록" />
          <h2>댓글 목록</h2>
        </div>
        <ul>
          {comments &&
            comments.map((comments) => (
              <li key={comments.commentNum}>
                <p>{comments.writerNickname}</p>
                <input type="text" disabled defaultValue={comments.contents} />
              </li>
            ))}
        </ul>
      </div>
      <div className={style.review}>
        <div className={style.fuck2}>
          <img src={require("../source/img/write.png")} alt="작성" />{" "}
          <h2>댓글 작성</h2>
        </div>
        <textarea
          placeholder="경매 후기를 작성해주세요."
          onChange={handleChange}
        ></textarea>
        <button type="button" onClick={handleWrite}>
          작성
        </button>
      </div>
    </>
  );
}
export default Sell_End_d;
