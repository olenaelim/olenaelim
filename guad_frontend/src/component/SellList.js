import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from "../source/SellList.module.css";
import SellListItem from "./SellListItem";
import SellListPaging from "./SellListPaging";

function Sell_List(props) {
  const sellType = ["", "u", "d", "n"];
  const postPerPage = 12; //페이지당 아이템 개수

  console.log(props.searchWord);

  const [data, setData] = useState([]); // 상품 전체 정보
  const [category, setCategory] = useState([]); // 카테고리 전체정보
  const [itemTypeList, setItemTypeList] = useState([]); // 대분류
  const [itemDTypeList, setItemDTypeList] = useState([]); // 소분류
  const [count, setCount] = useState();
  const [selectedOptions, setSelectedOptions] = useState({
    // 선택된 분류
    sellType: "",
    itemType: "",
    itemDType: "",
  });

  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [indexOfLastPost, setIndexOfLastPost] = useState(12); // 페이지 마지막 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 페이지 첫번째 인덱스
  const [currentPosts, setCurrentPosts] = useState([]); // 페이지별 나타낼 아이템

  const [cateOn, setCateOn] = useState(false);
  const c_m = useRef();
  const c_o = useRef();

  console.log(selectedOptions);
  const OnItemType = (value, name) => {
    if (name === "sellType") {
      setSelectedOptions({ ...selectedOptions, [name]: value });
      setCurrentpage(1);
    } else if (name === "itemType") {
      if (value === "") {
        setSelectedOptions({
          ...selectedOptions,
          itemType: "",
          itemDType: "",
          sellType: "",
        });
        setCurrentpage(1);
        c_o.current.style = "display:none;";
      } else {
        const newItemDT = [];
        category
          ?.filter((cate) => cate.itemType === value)
          .forEach((cate) => newItemDT.push(cate.itemDType));
        setItemDTypeList(newItemDT);
        setSelectedOptions({
          ...selectedOptions,
          itemType: value,
          itemDType: "",
          sellType: "",
        });
        setCurrentpage(1);
        c_o.current.style = "display:inline-block;";
      }
    } else if (name === "itemDetailType") {
      setSelectedOptions({
        ...selectedOptions,
        itemDType: value,
        sellType: "",
      });
      setCurrentpage(1);
      c_m.current.style = "display:none;";
      c_o.current.style = "display:none;";
      setCateOn(false);
    } else {
      alert("에러");
    }
  };

  const handlerPresentData = (presentData) => {
    console.log("hpd - search : " + props.searchWord)
    if(props.searchWord !== undefined || props.searchWord === ''){
      const searchData = presentData.filter((item) => (
        item.itemType.includes(props.searchWord) ||
        item.itemDType.includes(props.searchWord) ||
        item.itemSub.includes(props.searchWord) ||
        item.itemContents.includes(props.searchWord)
      ))
      setCount(searchData.length);
      setCurrentPosts(searchData.slice(indexOfFirstPost, indexOfLastPost));
    } else {
      setCount(presentData.length);
      setCurrentPosts(presentData.slice(indexOfFirstPost, indexOfLastPost));
    }
  };

  useEffect(() => {
    let presentData;
    if (selectedOptions.sellType === "" && selectedOptions.itemType === "") {
      handlerPresentData(data);
    } else if (
      selectedOptions.sellType === "" &&
      selectedOptions.itemType !== "" &&
      selectedOptions.itemDType !== ""
    ) {
      presentData = data.filter(
        (item) => item.itemDType === selectedOptions.itemDType
      );
      handlerPresentData(presentData);
    } else if (
      selectedOptions.sellType === "" &&
      selectedOptions.itemType !== ""
    ) {
      presentData = data.filter(
        (item) => item.itemType === selectedOptions.itemType
      );
      handlerPresentData(presentData);
    } else if (
      selectedOptions.sellType !== "" &&
      selectedOptions.itemType === ""
    ) {
      presentData = data.filter(
        (item) => item.sellType === selectedOptions.sellType
      );
      handlerPresentData(presentData);
    } else if (
      selectedOptions.sellType !== "" &&
      selectedOptions.itemType !== "" &&
      selectedOptions.itemDType !== ""
    ) {
      presentData = data.filter(
        (item) =>
          item.itemDType === selectedOptions.itemDType &&
          item.sellType === selectedOptions.sellType
      );
      handlerPresentData(presentData);
    } else if (
      selectedOptions.sellType !== "" &&
      selectedOptions.itemType !== ""
    ) {
      presentData = data.filter(
        (item) =>
          item.itemType === selectedOptions.itemType &&
          item.sellType === selectedOptions.sellType
      );
      handlerPresentData(presentData);
    }

    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
  }, [selectedOptions, currentpage, indexOfFirstPost, indexOfLastPost]);

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/category`)
      .then((response) => {
        const temp1 = [];
        console.log(response.data);
        response.data.forEach((element) => temp1.push(element.itemType));
        const temp2 = temp1.filter(
          (element, index) => temp1.indexOf(element) === index
        );
        console.log(temp2);
        setItemTypeList(temp2);
        setCategory(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sellitem`)
      .then((response) => {
        console.log(props.searchWord);
        console.log(response.data);
        setData(response.data);
        setCount(response.data.length);
        setCurrentPosts(
          response.data?.slice(indexOfFirstPost, indexOfLastPost)
        );
        if (props.searchWord.length > 0) {
          console.log("if search : " + props.searchWord)
          const temp = response.data.filter((d) => {
            return (
              d.itemType.includes(props.searchWord) ||
              d.itemDType.includes(props.searchWord) ||
              d.itemSub.includes(props.searchWord) ||
              d.itemContents.includes(props.searchWord)
            );
          });
          setCount(temp.length);
          setCurrentPosts(temp.slice(indexOfFirstPost, indexOfLastPost));
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const tempSearch = props.searchWord
    console.log("검색어 변경");
    console.log("tempSearch : " + tempSearch);
    if (tempSearch === null) {
      setCount(data.length);
      setCurrentPosts(data?.slice(indexOfFirstPost, indexOfLastPost));
    } else {
      console.log("tempSearch : " + tempSearch);
      const temp = data.filter((d) => {
        return (
          d.itemType.includes(tempSearch) ||
          d.itemDType.includes(tempSearch) ||
          d.itemSub.includes(tempSearch) ||
          d.itemContents.includes(tempSearch)
        );
      });
      setCount(temp.length);
      setCurrentPosts(temp.slice(indexOfFirstPost, indexOfLastPost));
    }
    return () => {
      props.setSearchWord('')
    }
  }, [props.isSearch]);

  const handlerSetPage = (e) => {
    setCurrentpage(e);
  };

  const OnCategory = (e) => {
    if (cateOn === false) {
      setCateOn(true);
      c_m.current.style = "display:inline-block;";
    } else {
      setCateOn(false);
      c_m.current.style = "display:none;";
      c_o.current.style = "display:none;";
    }
  };

  const OffCategory = () => {
    setCateOn(false);
    c_m.current.style = "display:none;";
    c_o.current.style = "display:none;";
  };

  const ResetType = () => {
    setSelectedOptions({
      ...selectedOptions,
      itemType: "",
      itemDType: "",
      sellType: "",
    });
    props.setSearchWord('')
    c_o.current.style = "display:none;";
    c_m.current.style = "display:none;";
    setCateOn(false);
  };
  console.log(currentPosts);
  return (
    <>
      <div className={style.sell_all}>
        <div className={style.sell_top}>
          {props.searchWord &&
            <div>
              <h2>현재 검색어 : {props.searchWord}</h2>
              <button onClick={() => props.setSearchWord("")}>검색어 초기화</button>
            </div>
          }
          <h2>
            전체상품
            <strong>{count}</strong>개
          </h2>
          <p onClick={OnCategory} className={style.cate_btn}>
            {selectedOptions.itemType == "" ? (
              <>카테고리 보기</>
            ) : (
              <>{selectedOptions.itemType}</>
            )}
          </p>
          <div className={style.cate_box}>
            <div className={style.cate_main} ref={c_m}>
              <span className={style.close} onClick={OffCategory}>
                &times;
              </span>
              <p onClick={ResetType} className={style.reset}>
                전체 카테고리
              </p>
              <ul>
                {itemTypeList?.map((type, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => OnItemType(type, "itemType")}
                    >
                      <a>{type}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={style.cate_option} ref={c_o}>
              <p>{selectedOptions.itemType}</p>
              <ul>
                {itemDTypeList?.map((DType, index) => (
                  <li
                    value={DType}
                    key={index}
                    onClick={() => OnItemType(DType, "itemDetailType")}
                  >
                    <a>{DType}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul>
            {sellType.map((t) => (
              <li key={t}>
                <button
                  type="button"
                  name={t}
                  onClick={() => OnItemType(t, "sellType")}
                  className={
                    selectedOptions.sellType === t
                      ? `${style.cate_true}`
                      : `${style.cate_false}`
                  }
                >
                  {t === ""
                    ? "전 품목"
                    : t === "u"
                    ? "오름경매"
                    : t === "d"
                    ? "내림경매"
                    : "일반판매"}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.sell_bot}>
          <ul>
            {currentPosts.length === 0 ? (
              <span className={style.empty}>
                <img src={require("../source/img/no_item.png")} alt="템없음" />
                <p>
                  게시물이 없습니다.
                  <br />
                  상품을 등록해주세요.
                </p>
              </span>
            ) : (
              currentPosts.map((item, index) => (
                <SellListItem item={item} key={index} />
              ))
            )}
          </ul>
          <span className={style.count_p}>
            <ul>
              {count && (
                <SellListPaging
                  page={currentpage}
                  count={count}
                  handlerSetPage={handlerSetPage}
                />
              )}
            </ul>
          </span>
        </div>
      </div>
    </>
  );
}
export default Sell_List;
