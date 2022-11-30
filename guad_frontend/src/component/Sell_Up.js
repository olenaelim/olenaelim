import axios from "axios";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import style from "../source/SellItem_u.module.css";
import NotifyWrite from "./Moodal/NotifyWrite";
import Up_After from "./Up_After";
import Up_Before from "./Up_Before";


var stompClient = null
const token = `Bearer ${sessionStorage.getItem("token")}`
function Sell_Up({ match, history }) {
  const [start, setStart] = useState(false);
  const [item, setItem] = useState({});
  const [imgList, setImgList] = useState([]);
  const [auctionPeriodText, setAuctionPeriodText] = useState();
  const [change, setChange] = useState(false);




  const buyer = useRef();

  const clickStart = () => {
    if (sessionStorage.length != 0) {
      setStart(true);
    } else {
      alert("로그인이 필요합니다.");
      setStart(false);
    }
  };
  console.log(item.itemNum);
  console.log(imgList);

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sellitem/u/${match.params.itemNum}`
      )
      .then((response) => {
        const tempImgList = []
        console.log(response.data);
        setItem(response.data);
        tempImgList.push(response.data.itemImgName);
        tempImgList.push(response.data.itemImgNameSub2);
        tempImgList.push(response.data.itemImgNameSub3);
        setImgList(tempImgList);
        if (response.data.bidPrice != null) {
          setBid(response.data.auctionStartPrice);
        }
        setBid(response.data.bidPrice);
        console.log(response.data.beforeAuctionPrice);
        if(response.data.beforeAuctionPrice !== 0) {
          setAuctionCurrentPrice(response.data.beforeAuctionPrice);
        } else {
          setAuctionCurrentPrice("입찰 없음");
        }
        
        
        setBidNickname(response.data.beforeNickname);

        const date = new Date(
          response.data.auctionFinishDate.slice(0, 10) +
          " " +
          response.data.auctionFinishDate.slice(12, 19)
        );
        date.setHours(date.getHours() + 9);
        setAuctionPeriodText(
          `${date.getFullYear()}년 ${date.getMonth() + 1
          }월 ${date.getDate()}일 ${date.getHours()}시까지`
        );

      })
      .catch((error) => console.log(error));

      const escKeyModalClose = (e) => {
        if (e.keyCode === 27) {
          closeModal();
        }
      };
      window.addEventListener("keydown", escKeyModalClose);
      return () => window.removeEventListener("keydown", escKeyModalClose);

  }, []);



  console.log(">>>>" + item.itemNum);

  const modalChange = useRef();
  const closeModal = () => {
    modalChange.current.style = "display:none;";
  };

  const openModal = () => {
    modalChange.current.style = "display:block;";
  };


  //////////////////////오름 경매/////////////////////////

  const [bid, setBid] = useState(0);
  const [bidNickname, setBidNickname] = useState();
  const [auctionCurrentPrice, setAuctionCurrentPrice] = useState();
  const [Dto, setDto] = useState({

    itemNum: match.params.itemNum,
    auctionPrice: bid,
    // nickname: item.nickname,
    // email: item.email,
  });

  useEffect(() => {
    connect();

  }, [bid])


  const connect = () => {
    let Sock = new SockJS(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    console.log(match.params.itemNum)
    stompClient.subscribe(`/sub/sellitem/auction/u/${match.params.itemNum}`, onMessageReceived);
    // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
  }

  const onError = (err) => {
    console.log(err);
  }

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData);
      setAuctionCurrentPrice(payloadData.beforeAuctionPrice);
      setBid(payloadData.auctionPrice);
      setBidNickname(payloadData.nickname);
      setChange(!change);
    
  }

  const handlerBid = (r) => {
    if(result < 0) {
      alert("마일리지가 부족합니다.")
      history.push("/mypage")
    } else {
      setBid(r);
      setDto({ ...Dto, auctionPrice: r })
      console.log(bid);
      console.log(Dto);
      stompClient.send(`/pub/sellitem/auction/u/${match.params.itemNum}`, { Authorization: token }, JSON.stringify({ ...Dto, auctionPrice: r }));
    }
    // stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    // setBid(document.getElementsByClassName(`${style.bid}`)[0].value);
    
  }

///////////////보유 마일리지 체크///////////////
    const [result, setResult] = useState(0);
    useEffect(() => {
      axios
        .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member`)
        .then((response) => {
          setResult(response.data.mileage - auctionCurrentPrice);
          console.log(response.data.mileage - auctionCurrentPrice);
        })
        .catch((error) => console.log(error));
    }, [auctionCurrentPrice]);
////////////////////////////////////////////////
console.log(auctionCurrentPrice);


  return (
    <>
      <NotifyWrite
        closeModal={closeModal}
        modalChange={modalChange}
        item={item}
      />
      <div id={style.item_num} className={style.item_num}>
        {item.itemNum}
      </div>
      <div className={style.item_top}>
        <h2>
          <strong>오름</strong>경매
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
          <img
            src={require("../source/img/del2_b.png")}
            alt="오름경매"
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
                  alt={"img" + item.notifyNum}
                  className={style.item_o}
                />
              </li>
            ))}
          </ul>
        </div>
        {start == false && item && (
          <>
            <Up_Before
              openModal={openModal}
              clickStart={clickStart}
              item={item}
              bid={bid}
              auctionCurrentPrice={auctionCurrentPrice}

            />
            <p className={style.bb_time}>
              남은 경매 시간 : <strong>{auctionPeriodText}</strong>
            </p>
          </>
        )}

        {start == true && item && (
          <Up_After
            openModal={openModal}
            item={item}
            buyer={buyer}
            auctionPeriodText={auctionPeriodText}
            handlerBid={handlerBid}
            bid={bid}
            bidNickname={bidNickname}
            auctionCurrentPrice={auctionCurrentPrice}
            history={history}
          />
        )}
      </div>
      <div className={style.item_bot}>
        <h2>상품 설명</h2>
        <p>{item.itemContents}</p>
      </div>
    </>
  );
}
export default Sell_Up;
