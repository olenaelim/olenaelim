import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../../source/Moodal6.module.css";
import AddressApi from "./AddressApi";

function BuyConfirm({
  closeModal2,
  modalChange2,
  item,
  price,
  history
}) {
  const [dto, setDto] = useState([]);
  const [member, setMember] = useState({});
  const [result, setResult] = useState(0);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [requestTrade, setRequestTrade] = useState({
    sellType: "",
    sellerEmail: "서버에서 입력",
    sellerPhone: "서버에서 입력",
    buyerEmail: "서버에서 입력",
    buyerPhone: "서버에서 입력",
    address: "",
    addressDetail: "",
    itemSub: "",
    itemPrice: "",
    soldDate: "쿼리문에 입력",
    itemNum: "",
    soldYn: "",
    mileage: "",
  });

  useEffect(() => {
    setDto(item);

    setRequestTrade({
      ...requestTrade,
      sellType: item.sellType,
      address: address + " " + addressDetail,
      itemSub: item.itemSub,
      itemPrice: price,
      soldDate: "",
      itemNum: item.itemNum,
      soldYn: item.soldYn,
      mileage: member.mileage,
    });
  }, [item, price, address, addressDetail]);

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member`)
      .then((response) => {
        setMember(response.data);
        setAddress(response.data.address);
        setAddressDetail(response.data.addressDetail);
        setResult(response.data.mileage - price);
      })
      .catch((error) => console.log(error));
  }, [price]);

  const handlerTrade = () => {
    console.log(requestTrade);
   
    if (result < 0) {
      alert("마일리지가 부족합니다. 충전 후 이용해주세요.");
      history.push("/mypage");
    } else {
      axios
        .post(
          `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/sell`,
          requestTrade
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            alert("결제에 성공했습니다.");
            history.push(`/sell_after/${item.itemNum}`);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("농담이시죠? 본인이 등록한 물건이에요!");
        });
    }
  };

  const handlerAddressDetail = (e) => setAddressDetail(e.target.value);
  console.log(dto);

  // 주소API
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev); // false > true
  };
  return (
    <>
      <div className={style.modal2} ref={modalChange2}>
        <div className={style.modalcontent2}>
          <div className={style.modalheader2}>
            <h2>결제 내역</h2>
          </div>
          <div className={style.modalbody2}>
            <div className={style.info_b}>
              <img
                src={item.itemImgName && `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/${item.itemImgName}`}
                alt={"img" + item.notifyNum}
              />
              <div className={style.info_in}>
                <span className={style.info1}>상품 정보</span>
                <span className={style.info2}>{dto.itemSub}</span>
                <span className={style.info3}>상품 가격</span>
                <span className={style.info4}>{price?.toLocaleString()}</span>
              </div>
            </div>
            <div className={style.info_c}>
              <span>
                내 마일리지<strong>{member.mileage?.toLocaleString()}</strong>
              </span>
              <span>
                상품 가격<strong>- {price?.toLocaleString()}</strong>
              </span>
            </div>

            <div className={style.info_d}>
              <span>배송 정보</span>
              <div className={style.input_b1}>
                <p>주소</p>
                <input
                  type="text"
                  className={style.input1}
                  value={address}
                  readOnly
                />
                <button type="button" onClick={onToggleModal}>
                  검색
                </button>
              </div>
              <div className={style.input_b2}>
                <p>상세주소</p>
                <input
                  type="text"
                  className={style.input2}
                  value={addressDetail}
                  onChange={handlerAddressDetail}
                />
              </div>
              <div className={style.daum}>
                {isOpen && (
                  <AddressApi
                    visible={isOpen}
                    onOk={onToggleModal}
                    onCancel={onToggleModal} // isOpen이 false가 되고 화면이 리렌더되면서 모달이 뜨지 않는다.
                    setAddress={setAddress}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={style.modalfooter2}>
            <h2>거래결과</h2>
            <p>
              거래 후 마일리지{" "}
              <strong>{member && result.toLocaleString()}</strong>
            </p>
            <button
              type="button"
              className={style.outbtn1}
              onClick={handlerTrade}
            >
              결제완료
            </button>
            <button
              type="button"
              className={style.outbtn2}
              onClick={closeModal2}
            >
              결제취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BuyConfirm;
