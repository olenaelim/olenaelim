import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "../source/Selling.module.css";
import ItemSuccess from "./Moodal/ItemSuccess";

function Selling({ history }) {
  const sellTypeList = ["u", "d", "n"];
  const selectListAPeriod = [1, 2, 3, 5, 7];
  const selectListHour = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const now = new Date();
  const tempDate = new Date();

  const modalOpen = useRef();

  const closeModal = () => {
    modalOpen.current.style = "display:none;";
    history.push("/sell_list");
  };

  const handlerEnter = (e) => {
    if (e.key === "Enter") {
      closeModal();
    }
  };

  const [sellType, setSellType] = useState("u"); // 판매방식 u : up, d : down, n : normal
  const [data, setData] = useState(""); // 서버에서 카테고리를 받아와서 담을 dto
  const [itemType, setItemType] = useState(""); // 상품 대분류
  const [selectedItemType, setSelectedItemType] = useState("대분류"); // 선택된 대분류
  const [itemDetailType, setItemDetailType] = useState([]); // 상품 소분류
  const [selectedItemDetailType, setSelectedItemDetailType] =
    useState("소분류"); // 선택된 소분류
  const [itemSub, setItemSub] = useState(""); // 상품 판매글 제목
  const [itemContents, setItemContents] = useState(""); // 상품 판매글 내용
  const [itemPrice, setItemPrice] = useState(0); // 일반판매 상품 가격
  const [selectedDay, setSelectedDay] = useState(1); // 선택된 경매기간
  const [selectedHour, setSelectedHour] = useState(12); // 선택된 경매종료 시간

  const [auctionMaxPrice, setAuctionMaxPrice] = useState(0); // 오름경매 - 즉시구매가격
  const [auctionMinPrice, setAuctionMinPrice] = useState(0); // 내림경매 - 최저가격, 시작가격 ~ 최저가격
  const [auctionPeriod, setAuctionPeriod] = useState(new Date()); // 경매 종료 날짜 + 시간
  const [auctionPeriodText, setAuctionPeriodText] = useState(
    `${tempDate.getFullYear()}년 ${tempDate.getMonth() + 1}월 ${
      tempDate.getDate() + 2
    }일 ${selectedHour}시`
  ); // 경매 종료 날짜 + 시간 표시양식
  const [auctionRandomMethod, setAuctionRandomMethod] = useState(false); // 내림경매 방식 - 랜덤discount true/false
  const [auctionDiscountPerHour, setAuctionDiscountPerHour] = useState(0); // 내림경매 - 시간당

  const refSellType = useRef();
  const refItemType = useRef();
  const refItemDetailType = useRef();
  const refItemSub = useRef();
  const refItemContents = useRef();
  const refItemPrice = useRef();
  const refAuctionMaxPrice = useRef();
  const refAuctionMinPrice = useRef();
  const refAuctionPeriod = useRef();
  const refAuctionDiscountPerHour = useRef();

  const handlerSellType = (e) => {
    // type u : up / d : down / n : normal
    setSellType(e.target.name);
  };

  const handlerSelectedItemType = (e) => {
    setSelectedItemType(e.target.value);
    const newItemDetailType = [];
    data.forEach((element, index) => {
      if (element.itemType === e.target.value && element.itemDType !== "") {
        console.log(element.itemDType);
        newItemDetailType.push(element.itemDType);
      }
    });
    setItemDetailType(newItemDetailType);
    setSelectedItemDetailType("소분류");
  };

  const handlerSelectedItemDetailType = (e) =>
    setSelectedItemDetailType(e.target.value);
  const handlerItemSub = (e) => setItemSub(e.target.value);
  const handlerItemContents = (e) => setItemContents(e.target.value);
  const handlerItemPrice = (e) =>
    setItemPrice(e.target.value.replace(/,/g, ""));

  const handlerAuctionMaxPrice = (e) =>
    setAuctionMaxPrice(e.target.value.replace(/,/g, ""));
  const handlerAuctionMinPrice = (e) => {
    setAuctionMinPrice(e.target.value.replace(/,/g, ""));
  };

  /////////////////날짜 핸들러////////////////
  const handlerSelectedDay = (e) => {
    setSelectedDay(e.target.value);
    tempDate.setDate(now.getDate() + e.target.value * 1 + 1);
    tempDate.setHours(selectedHour);
    tempDate.setMinutes(0);
    tempDate.setSeconds(0);
    setAuctionPeriod(tempDate);
    setAuctionPeriodText(
      `${tempDate.getFullYear()}년 ${
        tempDate.getMonth() + 1
      }월 ${tempDate.getDate()}일 ${selectedHour === "24" ? 0 : selectedHour}시`
    );
  };
  const handlerSelectedHour = (e) => {
    setSelectedHour(e.target.value);
    tempDate.setDate(now.getDate() + selectedDay * 1 + 1);
    tempDate.setHours(e.target.value * 1);
    tempDate.setMinutes(0);
    tempDate.setSeconds(0);
    setAuctionPeriod(tempDate);
    setAuctionPeriodText(
      `${tempDate.getFullYear()}년 ${
        tempDate.getMonth() + 1
      }월 ${tempDate.getDate()}일 ${
        tempDate.getHours() === "24" ? 0 : tempDate.getHours()
      }시`
    );
  };
  const nowText = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${
    now.getDate() + 1
  }일 12시`;
  ////////////////////////////////////

  const handlerAuctionRandomMethod = (e) => {
    if (e.target.value === "고정내림") {
      setAuctionRandomMethod(false);
      setAuctionMinPrice(
        itemPrice -
          (selectedDay * 10 + (selectedHour - 12)) * auctionDiscountPerHour
      );
    } else {
      setAuctionRandomMethod(true);
      setAuctionMinPrice(0);
    }
  };

  const handlerAuctionDiscountPerHour = (e) => {
    setAuctionDiscountPerHour(e.target.value.replace(/,/g, ""));
    if (auctionRandomMethod == false) {
      if (
        itemPrice -
          (selectedDay * 10 + (selectedHour - 12)) *
            Number(e.target.value.replace(/,/g, "")) <
        0
      ) {
        alert("가격이 너무 낮습니다.");
        setAuctionDiscountPerHour(0);
        setAuctionMinPrice(0);
      } else {
        setAuctionMinPrice(
          itemPrice -
            (selectedDay * 10 + (selectedHour - 12)) *
              e.target.value.replace(/,/g, "")
        );
      }
    } else {
    }
  };

  console.log("auctionMinPrice 테스트 " + auctionMinPrice);
  const handlerItemRegist = (e) => {
    e.preventDefault();
    if (sellType === "") {
      alert("거래종류를 선택하세요");
      refSellType.current.focus();
    } else if (selectedItemType === "대분류") {
      alert("대분류를 선택하세요");
      refItemType.current.focus();
    } else if (selectedItemDetailType === "소분류") {
      alert("소분류를 선택하세요");
      refItemDetailType.current.focus();
    } else if (itemSub === "" || itemSub === undefined) {
      alert("제목을 작성해주세요");
      refItemSub.current.focus();
    } else if (itemContents === "" || itemContents === undefined) {
      alert("내용을 작성해주세요");
      refItemContents.current.focus();
    } else if (itemPrice === "") {
      alert("가격을 입력하세요");
      refItemPrice.current.focus();
    } else if (sellType === "u" && auctionMaxPrice === "") {
      alert("즉시구매가격을 입력하세요");
      refAuctionMaxPrice.current.focus();
    } else if (auctionPeriod === "") {
      alert("경매기간을 입력해주세요");
      refAuctionPeriod.current.focus();
    } else if (sellType === "d" && auctionMinPrice === "") {
      alert("최저가격을 입력해주세요");
      refAuctionMinPrice.current.focus();
    } else if(imgBase64.length < 1) {
      alert("상품 이미지를 등록해 주세요")
    } else if (
      sellType === "d" &&
      !auctionRandomMethod &&
      auctionDiscountPerHour === ""
    ) {
      alert("시간당 내릴 가격을 입력해주세요");
      refAuctionDiscountPerHour.current.focus();
    } else if (sellType === "d" && itemPrice*1 <= auctionMinPrice*1) {
      console.log(itemPrice);
      console.log(auctionMinPrice);
      alert("경매시작 가격은 최저가격보다 같거나 낮을 수 없습니다.");
    } else {
      const sellPrice = sellType === "n" ? itemPrice : "";
      const sendAuctionPeriod =
        sellType === "u" || sellType === "d" ? auctionPeriod : " ";
      const auctionStartPrice =
        sellType === "u" || sellType === "d" ? itemPrice : "";
      const sendAuctionMaxPrice = sellType === "u" ? auctionMaxPrice : "";
      const sendAuctionRandomMethod =
        sellType === "d" ? auctionRandomMethod : "";
      const sendAuctionDiscountPerHout =
        sellType === "d" && !auctionRandomMethod ? auctionDiscountPerHour : "";
      const sendAuctionMinPrice = sellType === "d" ? auctionMinPrice : "";
      const sendSelectedHour = sellType === "n" ? "" : selectedHour;
      const sendSelectedDay = sellType === "n" ? "" : selectedDay;

      let dataSet = {
        sellType,
        itemSub,
        itemContents,
        itemPrice: sellPrice,
        itemType: selectedItemType,
        itemDType: selectedItemDetailType,
        auctionStartPrice: auctionStartPrice,
        auctionPeriodTime: sendSelectedHour,
        auctionPeriodDay: sendSelectedDay,
        auctionFinishDate: sendAuctionPeriod,
        auctionMaxPrice: sendAuctionMaxPrice,
        auctionRandomMethod: sendAuctionRandomMethod,
        auctionDiscountPerHour: sendAuctionDiscountPerHout,
        auctionMinPrice: sendAuctionMinPrice,
      };

      console.log(sellPrice);
      // formData.append('data', dataSet);
      formData.append(
        "data",
        new Blob([JSON.stringify(dataSet)], { type: "application/json" })
      );

      Object.values(imgFile).forEach((file) => formData.append("files", file));

      axios({
        method: "post",
        url: `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/auth/sellitem`,
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data; `,
        },
      })
        .then((response) => {
          console.log(response);
          modalOpen.current.style = "display:block;";
        })
        .catch((error) => {
          console.log(error);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log(auctionRandomMethod);

  // 카테고리 불러오기
  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/category`)
      .then((response) => {
        // console.log(response.data);
        const temp1 = [];
        response.data.forEach((element) => temp1.push(element.itemType));
        const temp2 = temp1.filter(
          (element, index) => temp1.indexOf(element) === index
        );
        setItemType(temp2);
        setData(response.data);
        auctionPeriod.setDate(auctionPeriod.getDate() + 2);
        auctionPeriod.setHours(12);
        auctionPeriod.setMinutes(0);
        auctionPeriod.setSeconds(0);
        setAuctionPeriod(auctionPeriod);
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

  //////////////////////파일 업로드//////////////////////
  const formData = new FormData();
  const [imgBase64, setImgBase64] = useState([]);
  const [imgBase, setImgBase] = useState([1, 2, 3]);
  const [imgFile, setImgFile] = useState(null);

  const handleChangeFile = (event) => {
    //fd.append("file", event.target.files)

    const newImgBase = [1, 2, 3];
    var maxSize = 1 * 1024 * 1024 //1MB
    setImgFile(event.target.files);
    setImgBase(newImgBase);
    setImgBase64([]);

    if (event.target.files.length >= 4) {
      alert("이미지는 최대 3개 까지 업로드가 가능합니다.");
      const newImgBase = [1, 2, 3];
      setImgBase(newImgBase);
      setImgBase64([]);
    } else {
      for (var i = 0; i < event.target.files.length; i++) {
      
        if (!event.target.files[i].type.match("image/.*")) {
          alert("이미지 파일만 업로드가 가능합니다.");
          return
        } else if (event.target.files[i].size > maxSize) {
          alert("이미지 크기는 1MB를 초과할 수 없습니다.")
          return
        } else if (event.target.files[i]) {
          console.log(event.target.files[i].size);
          let reader = new FileReader();
          // 1. 파일을 읽어 버퍼에 저장합니다.
          reader.readAsDataURL(event.target.files[i]); 
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          reader.onloadend = () => {
            const base64 = reader.result;
            newImgBase.pop();

            if (base64) {
              var base64Sub = base64.toString();
              setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
              setImgBase(newImgBase);
            }
          };
        }
      }
    }
  };
  /////////////////////////////////////////////////////
  return (
    <>
      <div className={style.all_box}>
        <h2>내 상품 등록하기</h2>
        <div className={style.in_box}>
          <ul>
            <li>
              <label>
                거래종류
                <strong>※경매 상품은 등록한 후 수정이 어렵습니다.</strong>
              </label>
              {sellTypeList.map((type) => (
                <button
                  key={type}
                  type="button"
                  id={
                    sellType === type
                      ? `${style.button_active}`
                      : `${style.button_no}`
                  }
                  className={type === "d" ? style.mid : ""}
                  name={type}
                  onClick={handlerSellType}
                  ref={refSellType}
                >
                  {type === "u"
                    ? "오름경매"
                    : type === "d"
                    ? "내림경매"
                    : "일반판매"}
                </button>
              ))}
            </li>
            <li>
              <label>카테고리</label>
              <select
                className={style.select_one}
                onChange={handlerSelectedItemType}
                value={selectedItemType}
                ref={refItemType}
              >
                <option value="대분류">대분류</option>
                {itemType &&
                  itemType.map((type, index) => (
                    <option value={type} key={index}>
                      {type}
                    </option>
                  ))}
              </select>
              <select
                onChange={handlerSelectedItemDetailType}
                value={selectedItemDetailType}
                ref={refItemDetailType}
              >
                <option value="소분류">소분류</option>
                {itemDetailType &&
                  itemDetailType.map((detailType, index) => (
                    <option value={detailType} key={index}>
                      {detailType}
                    </option>
                  ))}
              </select>
            </li>
            <li>
              <label>판매글 제목</label>
              <input
                type="text"
                placeholder="판매글 제목을 작성해주세요."
                value={itemSub}
                onChange={handlerItemSub}
                ref={refItemSub}
              />
            </li>
            <li>
              <label>판매글 내용</label>
              <textarea
                placeholder="내용을 작성해주세요."
                value={itemContents}
                onChange={handlerItemContents}
                ref={refItemContents}
              ></textarea>
            </li>
            <li>
              <label>{sellType === "n" ? "판매가격" : "경매 시작가격"}</label>
              <input
                type="text"
                placeholder="가격을 작성해주세요."
                value={Number(itemPrice).toLocaleString()}
                onChange={handlerItemPrice}
                ref={refItemPrice}
              />
              {sellType === "u" && (
                <>
                  <label>즉시구매가격</label>
                  <input
                    type="text"
                    placeholder="즉시구매가격을 입력하세요"
                    value={Number(auctionMaxPrice).toLocaleString()}
                    onChange={handlerAuctionMaxPrice}
                    ref={refAuctionMaxPrice}
                  />
                </>
              )}
            </li>
            {sellType !== "n" && (
              <li>
                <label>경매기간(익일부터 계산)</label>
                <select
                  className={style.select_one}
                  value={selectedDay}
                  onChange={handlerSelectedDay}
                >
                  {selectListAPeriod.map((day, index) => (
                    <option value={day} key={index}>
                      {day}일
                    </option>
                  ))}
                </select>
                <br></br>
                <label>판매종료 시간</label>
                <select onChange={handlerSelectedHour} value={selectedHour}>
                  {selectListHour.map((hour, index) => (
                    <option value={hour} key={index}>
                      {hour >= 10 ? hour : "0" + hour}:00
                    </option>
                  ))}
                </select>
                <br />
                {/* <input type="datetime-local" value={auctionPeriod} onChange={handlerAPeriod} ref={refAuctionPeriod} min={new Date()}></input> */}
                <div className={style.auction_d}>
                  <span>경매 시작 : </span>
                  <input type="text" value={nowText} disabled></input>
                  <br />
                  <span>경매 종료 : </span>
                  <input type="text" value={auctionPeriodText} disabled></input>
                </div>
              </li>
            )}
            {sellType === "d" ? (
              <li className={style.down_b}>
                <label className={style.chose_p}>시간당 내릴 가격</label>
                <form>
                  <input
                    type="radio"
                    name="down"
                    onChange={handlerAuctionRandomMethod}
                    value="고정내림"
                    defaultChecked={true}
                  ></input>
                  <label>고정내림</label>
                  <input
                    type="radio"
                    name="down"
                    onChange={handlerAuctionRandomMethod}
                    value="랜덤내림"
                  ></input>
                  <label>랜덤내림</label>
                </form>
                {!auctionRandomMethod ? (
                  <input
                    type="text"
                    value={Number(auctionDiscountPerHour).toLocaleString()}
                    onChange={handlerAuctionDiscountPerHour}
                    placeholder="일정하게 내릴 가격을 입력하세요"
                    ref={refAuctionDiscountPerHour}
                  />
                ) : (
                  <p>
                    <strong>랜덤내림이란?</strong>
                    경매시작 가격에서부터 최저가격까지 시간당 랜덤(
                    <strong className={style.percent}>시작가격의 1~5%</strong>
                    )으로 하락해서 경매에 재미를 더하는 방법
                  </p>
                )}
                <label>최저 가격</label>
                <input
                  type="text"
                  placeholder="내림경매의 최저가격을 설정해주세요"
                  value={Number(auctionMinPrice).toLocaleString()}
                  onChange={handlerAuctionMinPrice}
                  ref={refAuctionMinPrice}
                  readOnly={!auctionRandomMethod}
                />
              </li>
            ) : (
              ""
            )}
            <li className={style.photo_b}>
              <label>사진등록</label>
              <p>필수로 1장 이상의 사진을 등록해야 합니다.</p>
              {/*  파일 업로드 */}
              <div className={style.fileupload}>
                {imgBase64.map((item) => {
                  return (
                    <label for="file">
                      <img
                        className={style.mid_img}
                        src={item}
                        alt="First slide"
                      />
                    </label>
                  );
                })}

                {imgBase.map((item) => (
                  <label for="file" key={item}>
                    <img src={require("../source/img/pic.png")} alt="사진1" />
                  </label>
                ))}
              </div>
            </li>
            {/*  파일 업로드 히든 */}
            <div className={style.filebox}>
              <input
                type="file"
                id="file"
                className={style.upload}
                onChange={handleChangeFile}
                multiple="multiple"
              />
            </div>
          </ul>
          <button
            type="button"
            className={style.subBtn}
            id="openMan"
            onClick={handlerItemRegist}
            onKeyDown={handlerEnter}
          >
            등록완료
          </button>
          <ItemSuccess
            closeModal={closeModal}
            modalOpen={modalOpen}
            itemSub={itemSub}
            itemContents={itemContents}
          />
        </div>
      </div>
    </>
  );
}
export default Selling;
