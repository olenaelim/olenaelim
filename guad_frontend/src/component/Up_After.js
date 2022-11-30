import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import style from "../source/SellItem_u.module.css";
import UpConfirm from "./Moodal/UpConfirm";
import Up_Chat from "./Up_Chat";

var stompClient = null;
let Sock;
const token = `Bearer ${sessionStorage.getItem("token")}`;
function Up_After({
  openModal,
  history,
  item,
  buyer,
  auctionPeriodText,
  handlerBid,
  bid,
  bidNickname,
  auctionCurrentPrice,
}) {
  const [publicChats, setPublicChats] = useState([]);

  console.log(publicChats);
  console.log(item);

  const connect = () => {
    Sock = new SockJS(
      `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/ws`
    );
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    // return () => stompClient.disconnect(() => console.log("disconnect1"), {});
  };
  const onConnected = () => {
    stompClient.subscribe(`/sub/up/${item?.itemNum}`, onMessageReceived);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (payload) => {
    console.log("업에프터")
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    publicChats.push(payloadData);
    setPublicChats([...publicChats]);
  };
  const sendValue = (userData) => {
    if (stompClient && userData.message !== "") {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
      };
      console.log(chatMessage);
      stompClient.send(
        `/pub/up/${item?.itemNum}`,
        { Authorization: token },
        JSON.stringify(chatMessage)
      );
    }
  };
  console.log(item);
  const btn_b = useRef();

  const modalChange2 = useRef();
  const closeModal2 = () => {
    modalChange2.current.style = "display:none;";
  };
  const openModal2 = () => {
    modalChange2.current.style = "display:block;";
  };
  useEffect(() => {
    connect();
    return () => {
      console.log("stomp disconnect");
      stompClient.disconnect(() => console.log("disconnect2"), {
        message: "disconnect2",
      });
      console.log("sock disconnect");
      closeConnection();
    };
  }, []);
  // onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;

  function closeConnection() {
    Sock.close();
    console.log("sock.close()");
  }

  ///////////////할인율////////////////

  var discountRate =
    100 - (item.auctionMinPrice / item.auctionStartPrice) * 100;
  var discountRateNow =
    100 - (auctionCurrentPrice / item.auctionStartPrice) * 100;


  useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        closeModal2();
      }
    };
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, []);
  return (
    <>
      <UpConfirm
        closeModal2={closeModal2}
        modalChange2={modalChange2}
        item={item}
        history={history}
        auctionCurrentPrice={auctionCurrentPrice}
        discountRateNow={discountRateNow}
      />
      <div className={style.info_top}>
        <img
          src={require("../source/img/warn.png")}
          alt="신고"
          onClick={openModal}
        />
        <span className={style.top_head}>상품 정보</span>
        <span className={style.top_cate}>{item.itemType}</span>
        <span className={style.top_title}>{item.itemSub}</span>
        <div className={style.sell_box}>
          <span className={style.sell_price}>현재 입찰가</span>
          <span className={style.sell_number}>
            {bid === -1
              ? "최고 경매가 달성"
              : auctionCurrentPrice?.toLocaleString()}
          </span>
        </div>
        <div className={style.sell_box}>
          <span className={style.sell_price}>즉시구매 가격</span>
          <span className={style.sell_number2}>
            {item.auctionMaxPrice?.toLocaleString()}
          </span>
        </div>
        <div className={style.cont_in}>
          <span className={style.seller_a} ref={buyer}>
            판매자 : <strong>{item.nickname}</strong>
          </span>
          <div className={style.button_box}>
            <button
              type="button"
              className={style.now_buy}
              onClick={openModal2}
              ref={btn_b}
            >
              즉시 구매
            </button>
            {item.itemNum && (
              <Up_Chat
                item={item}
                sendValue={sendValue}
                publicChats={publicChats}
                connect={connect}
                buyer={buyer}
                btn_b={btn_b}
              />
            )}
            <button
              className={`${style.try_buy} ${style.aa_btn}`}
              onClick={() => handlerBid(bid)}
            >
              <p className={style.bid}>
                {bid === -1
                  ? "최고 경매가 달성"
                  : bid === 0
                  ? item.auctionStartPrice?.toLocaleString()
                  : "입찰하기 : " + `${bid?.toLocaleString()}`}
              </p>
            </button>
            <button type="button" className={style.try_buy}>
              현재 입찰자 :{" "}
              <strong>{bidNickname === null ? "없음" : bidNickname}</strong>
            </button>
          </div>
        </div>
      </div>
      <p className={style.bb_time}>
        남은 경매 시간 : <strong>{auctionPeriodText}</strong>
      </p>
    </>
  );
}
export default Up_After;
