import Terms from "./Moodal/Terms";
import style from "../source/Join.module.css";
import { useState } from "react";
import axios from "axios";
import AddressApi from "./Moodal/AddressApi";
import { useRef } from "react";

function JoinG({ history }) {
  const [g_check, setG_check] = useState("");
  const CheckGen = (e) => {
    const gen = e.target.name;
    if (gen === "man") {
      setG_check("m");
    } else {
      setG_check("w");
    }
  };
  const email = localStorage.getItem("email");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [isNickname, setIsNickname] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isAddressDetail, setIsAddressDetail] = useState(false);
  const [isUsableNickname, setIsUsableNickname] = useState(false);

  const [nicknameMessage, setNicknameMessage] = useState("");
  const [usableNicknameMessage, setUsableNicknameMessage] = useState("");

  console.log(email);
  const handlerGoogleJoin = () => {
    axios
      .post(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/join/google`, {
        email,
        pass: "",
        nickname,
        phone,
        address,
        addressDetail,
        gender: g_check,
        loginImgName: sessionStorage.getItem("profileImg"),
      })
      .then((response) => {
        console.log(response);
        localStorage.removeItem("email");
        alert("회원가입이 완료되었습니다.");
        sessionStorage.clear();
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  console.log(address);
  console.log(addressDetail);
  const changeNickname = (e) => {
    nick_btn.current.style = "background-color: #fff; color:black;";
    setNickname(e.target.value);
    if (e.target.value.length >= 2 && e.target.value.length < 7) {
      setUsableNicknameMessage("");
      setIsNickname(true);
    } else {
      setUsableNicknameMessage("사용할 수 없는 닉네임입니다.");
      setIsNickname(false);
    }
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
    if (e.target.value.length > 0) {
      setIsPhone(true);
    }
  };

  const changeAddress = (e) => {
    setAddress(e.target.value);
    if (e.target.value.length > 0) {
      setIsAddress(true);
    }
  };

  const changeAddressDetail = (e) => {
    setAddressDetail(e.target.value);
    if (e.target.value.length > 0) {
      setIsAddressDetail(true);
    }
  };

  const nicknameCheck = (e) => {
    console.log(nickname);
    console.log(sessionStorage.getItem("token"));
    e.preventDefault();
    axios
      .post(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/join/nicknamecheck`,
        JSON.stringify({ nickname: nickname }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (isNickname === true && nickname !== "") {
          setUsableNicknameMessage("사용 가능한 닉네임입니다.");
          nick_btn.current.style = "background-color: #248f48; color:white;";
          setIsUsableNickname(true);
        } else {
          setUsableNicknameMessage("사용할 수 없는 닉네임입니다.");
          nick_btn.current.style = "background-color: #ff2727; color:white;";
          setIsUsableNickname(false);
        }
      })
      .catch((error) => {
        setIsUsableNickname(false);
        setUsableNicknameMessage("이미 사용중인 닉네임 입니다.");
        nick_btn.current.style = "background-color: #ff2727; color:white;";
      });
  };

  // 주소API
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev); // false > true
  };

  // 체크용
  const nick_btn = useRef();

  return (
    <>
      <Terms />
      <div className={style.join_all}>
        <h2>오르내림 회원가입을 환영합니다!</h2>
        <h3>개인 정보 입력</h3>
        <div className={style.input_set}>
          <ul>
            <li className={style.nick_in}>
              <label>닉네임</label>
              <input
                type="text"
                placeholder="2글자 이상 7글자 미만으로 입력해주세요."
                value={nickname}
                onChange={changeNickname}
              />
              <button type="button" onClick={nicknameCheck} ref={nick_btn}>
                중복확인
              </button>
              {nickname.length > 0 && (
                <p
                  className="messeageDiv"
                  style={
                    isNickname ? { color: "#248f48" } : { color: "#ff2727" }
                  }
                >
                  {nicknameMessage}
                </p>
              )}
              <p
                style={
                  isUsableNickname ? { color: "#248f48" } : { color: "#ff2727" }
                }
              >
                {usableNicknameMessage}
              </p>
            </li>
            <li className={style.tel_in}>
              <label>전화번호</label>
              <input
                type="text"
                placeholder="-를 제외하고 입력해주세요."
                value={phone}
                onChange={changePhone}
              />
            </li>
            <li className={style.gen_in}>
              <label>성별</label>
              <button
                className={
                  g_check === "m" ? `${style.gen_true}` : `${style.gen_false}`
                }
                onClick={CheckGen}
                id={style.man}
                name="man"
              >
                남성
              </button>
              <button
                onClick={CheckGen}
                className={
                  g_check === "w" ? `${style.gen_true}` : `${style.gen_false}`
                }
                name="woman"
              >
                여성
              </button>
            </li>
            <li className={style.add_in}>
              <label>주소</label>
              <input
                type="text"
                value={address}
                onChange={changeAddress}
                readOnly
              />
              <button onClick={onToggleModal}>검색</button>
            </li>
            <li>
              <label>상세주소</label>
              <input
                type="text"
                value={addressDetail}
                onChange={changeAddressDetail}
              />
            </li>
            {isOpen && (
              <AddressApi
                visible={isOpen}
                onOk={onToggleModal}
                onCancel={onToggleModal} // isOpen이 false가 되고 화면이 리렌더되면서 모달이 뜨지 않는다.
                setAddress={setAddress}
              />
            )}
          </ul>
        </div>
        <button
          className={style.last_btn}
          onClick={handlerGoogleJoin}
          disabled={!(isNickname && isPhone && address && isAddressDetail)}
        >
          회원가입
        </button>
      </div>
      <div></div>
    </>
  );
}
export default JoinG;
