import style from "../source/Join.module.css";
import Terms from "./Moodal/Terms";
import { useState } from "react";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import AddressApi from "./Moodal/AddressApi";
import { useRef } from "react";
import { useEffect } from "react";

function Join({ history }, props) {
  const [g_check, setG_check] = useState("");

  const CheckGen = (e) => {
    const gen = e.target.name;
    if (gen === "man") {
      setG_check("m");
    } else {
      setG_check("w");
    }
  };

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPass, setIsPass] = useState(false);
  const [isPassConfirm, setIsPassConfirm] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  const [isUsableId, setIsUsableId] = useState(false);
  const [isUsableNickname, setIsUsableNickname] = useState(false);

  const [emailMessage, setEmailMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [passConfirmMessage, setPassConfirmMessage] = useState("");
  const [usableIdMessage, setUsableIdMessage] = useState("");
  const [usableNicknameMessage, setUsableNicknameMessage] = useState("");

  const handlerJoin = () => {
    if (
      (isNickname &&
        isEmail &&
        isUsableNickname &&
        isUsableId &&
        isPass &&
        isPassConfirm &&
        isPhone &&
        address &&
        addressDetail) == false
    ) {
      alert("입력된 정보를 다시 확인해주세요!");
    } else {
      axios
        .post(
          `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/join`,
          {
            email,
            nickname,
            pass,
            phone,
            address,
            addressDetail,
            gender: g_check,
          }
        )
        .then((response) => {
          console.log(response);
          alert("회원가입이 완료되었습니다.");
          history.push("/login");
        })
        .catch((error) => console.log(error));
    }
  };

  const changeEmail = (e) => {
    id_btn.current.style = "background-color: #fff; color:black;";
    setEmail(e.target.value);
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setUsableIdMessage("이메일 형식이 맞지 않습니다.");
      setIsEmail(false);
    } else {
      setIsEmail(true);
      setUsableIdMessage("");
    }
  };
  const changePass = (e) => {
    setPass(e.target.value);
    const passRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passCurrent = e.target.value;
    setPass(passCurrent);

    if (!passRegex.test(passCurrent)) {
      setPassMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPass(false);
    } else {
      setPassMessage("안전한 비밀번호에요 : )");
      setIsPass(true);
    }
  };

  const changePassConfirm = (e) => {
    setPassConfirm(e.target.value);
    const passConfirmCurrent = e.target.value;
    setPassConfirm(passConfirmCurrent);

    if (pass === passConfirmCurrent) {
      setPassConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
      setIsPassConfirm(true);
    } else {
      setPassConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
      setIsPassConfirm(false);
    }
  };
  // 닉네임
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

  const handlerAddressDetail = (e) => setAddressDetail(e.target.value);

  const idCheck = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/join/idcheck`,
        JSON.stringify({ email: email }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (isEmail === true && email !== "") {
          setUsableIdMessage("사용 가능한 이메일입니다.");
          setIsUsableId(true);
          id_btn.current.style = "background-color: #248f48; color:white;";
          console.log("idcheck");
        } else {
          setUsableIdMessage("사용할수 없는 이메일입니다.");
          id_btn.current.style = "background-color: #ff2727; color:white;";
          setIsUsableId(false);
        }
      })
      .catch((error) => {
        setUsableIdMessage("이미 사용중인 이메일 입니다.");
        id_btn.current.style = "background-color: #ff2727; color:white;";
        setIsEmail(false);
        setIsUsableId(false);
      });
  };

  const nicknameCheck = (e) => {
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
          setUsableNicknameMessage("사용할수 없는 닉네임입니다.");
          nick_btn.current.style = "background-color: #ff2727; color:white;";
          setIsUsableNickname(false);
        }
      })
      .catch((error) => {
        setUsableNicknameMessage("이미 사용중인 닉네임 입니다.");
        nick_btn.current.style = "background-color: #ff2727; color:white;";
        setIsNickname(false);
        setIsUsableNickname(false);
      });
  };

  // 주소API
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev); // false > true
  };

  console.log(address);
  console.log(addressDetail);

  // 체크용
  const id_btn = useRef();
  const nick_btn = useRef();

  useEffect(() => {
    axios
      .post(
        `https://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/join/idcheck`,
        JSON.stringify({ email: email }),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (isEmail === true && email !== "") {
          setIsUsableId(true);
        } else {
          setIsUsableId(false);
        }
      })
      .catch((error) => {
        setIsEmail(false);
        setIsUsableId(false);
      });
  }, [isEmail, isUsableId, isNickname]);

  return (
    <>
      <Terms />
      <div className={style.join_all}>
        <h2>오르내림 회원가입을 환영합니다!</h2>
        <h3>개인 정보 입력</h3>
        <div className={style.input_set}>
          <ul>
            <li className={style.id_in}>
              <label>이메일</label>
              <input
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={changeEmail}
              />
              <button type="button" onClick={idCheck} ref={id_btn}>
                중복확인
              </button>
              <p
                style={isUsableId ? { color: "#248f48" } : { color: "#ff2727" }}
              >
                {usableIdMessage}
              </p>
            </li>
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
            <li className={style.pass_in}>
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={pass}
                onChange={changePass}
              />
              {pass.length > 0 && (
                <p style={isPass ? { color: "#248f48" } : { color: "#ff2727" }}>
                  {passMessage}
                </p>
              )}
            </li>
            <li className={style.check_in}>
              <label>비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                value={passConfirm}
                onChange={changePassConfirm}
              />
              {passConfirm.length > 0 && (
                <p
                  style={
                    isPassConfirm ? { color: "#248f48" } : { color: "#ff2727" }
                  }
                >
                  {passConfirmMessage}
                </p>
              )}
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
                onChange={handlerAddressDetail}
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
        <button className={style.last_btn} onClick={handlerJoin}>
          회원가입
        </button>
      </div>
      <div></div>
    </>
  );
}
export default Join;
