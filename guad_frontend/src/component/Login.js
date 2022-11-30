import React, { useEffect } from "react";
import style from "../source/Login.module.css";
import axios from "axios";
import { useState } from "react";
import logo from "../source/img/login_logo.png";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Login(props) {
  // 아이디 저장 체크박스 체크 유무
  const [idCheck, setIdCheck] = useState(true);
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState("");
  // 아이디 저장용
  const ChangeCheck = () => {
    if (idCheck === true) {
      setIdCheck(false);
    } else {
      setIdCheck(true);
    }
  };
  const onKeyEnter = (e) => {
    if (e.key === "Enter") {
      handlerSubmit();
    }
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => setPassword(e.target.value);

  // handlerIsLogin(true);
  // console.log(isLogin)

  const handlerSubmit = (e) => {
    // e.preventDefault();
    axios
      .post(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/login`, {
        email: email,
        pass: password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data);
        axios
          .get(
            `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member`,
            { header: { Authorization: response.data } }
          )
          .then((response) => {
            console.log(response.data);
            props.setManager(response.data.managerYn);
            props.setNickName(response.data.nickname);
            props.setIsLogin(true);
            props.setProfileImg(response.data.loginImgName);
            sessionStorage.setItem("nickname", response.data.nickname);
            sessionStorage.setItem("managerYn", response.data.managerYn);
            sessionStorage.setItem("profileImg", response.data.loginImgName);
          });
        alert("로그인 되었습니다.");
        props.history.push("/");
        console.log(response.data);
        // 아이디 저장용
        if (idCheck === true) {
          localStorage.setItem("email", email);
        } else {
          localStorage.setItem("email", "");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("로그인에 실패했습니다.");
        sessionStorage.clear();
        // 아이디 저장용
        localStorage.setItem("email", "");
      });
  };

  useEffect(() => {
    console.log(props.isLogin);
    console.log(props);
    console.log("호출");
    console.log("저장된 이메일 : " + localStorage.getItem("email"));
  }, []);

  // social login
  //토큰 >> decoding
  function handlerCallbackResponse(response) {
    console.log("Encoded JWT ID token " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject.picture);
    //구글 이미지 저장
    sessionStorage.setItem("profileImg", userObject.picture)
    // setUser(userObject);

    //로그인 하면 로그인 버튼 가리기
    document.getElementById("signInDiv").hidden = true;

    //구글로 부터 받은 데이터를 POST로 컨트롤러에 전달
    axios
      .post(
        `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/login/oauth2`,
        {
          email: userObject.email,
        }
      )
      .then((response) => {
        // response.data == true : 요청email유효, 회원가입정보 O
        if (response.data === " ") {
          localStorage.setItem("email", userObject.email);
          alert("회원가입이 필요합니다.");
          props.history.push("/join_g");
        }
        // 요청email은 있으나 회원가입 X
        else {
          console.log(response.data);
          sessionStorage.setItem("token", response.data);
          // sessionStorage.setItem("profileImg", userObject.picture);
          axios
            .get(
              `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member`,
              { header: { Authorization: response.data } }
            )
            .then((response) => {
              props.setNickName(response.data.nickname);
              props.setIsLogin(true);
              props.setProfileImg(response.data.loginImgName);
              sessionStorage.setItem("nickname", response.data.nickname);
              sessionStorage.setItem("profileImg", response.data.loginImgName);
            });
          alert("로그인 되었습니다.");
          props.history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        sessionStorage.clear();
        // 아이디 저장용
        localStorage.setItem("email", "");
        alert("알 수 없는 에러가 발생했습니다. 관리자에게 문의해주세요.");
      });
  }

  // function handleSignOut(e) {
  //   setUser({});
  //   //로그아웃 하면 로그인 버튼 생성
  //   document.getElementById("signInDiv").hidden = false;
  // }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "1068908873530-hp1930ja7o5k3qcree5o0v9tt21h055h.apps.googleusercontent.com",
      // "633692264760-fvjot4f3d49r20h3tjmg5rve9kecj92t.apps.googleusercontent.com",
      callback: handlerCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      type: "standard",
      shape: "rectangular",
      width: 400,
      text: "continue_with",
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div className={style.All_box}>
        <div className={style.login_box}>
          <img src={logo} className={style.Logo} alt="로고" />
          <span className={style.logintext}>가입한 계정으로 로그인</span>
          <input
            className={style.in_box}
            placeholder="아이디"
            defaultValue={
              localStorage.getItem("email") === ""
                ? email
                : localStorage.getItem("email")
            }
            onChange={changeEmail}
            name="email"
          />
          <input
            className={style.in_box}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={changePassword}
            onKeyDown={onKeyEnter}
          />
          <div className={style.checkId} onClick={ChangeCheck}>
            <img
              src={
                idCheck
                  ? require("../source/img/check_on.png")
                  : require("../source/img/check.png")
              }
              alt="체크"
            />
            <p className={style.check_b}>아이디저장</p>
          </div>
          <button
            className={[style.login, style.btn_bb].join(" ")}
            onClick={handlerSubmit}
            type="button"
          >
            로그인
          </button>
          <Link to="/join">
            <button
              className={[style.join, style.btn_bb].join(" ")}
              type="button"
            >
              회원가입
            </button>
          </Link>
          <div
            id="wrapper-signInDiv"
            className={[style.google_1, style.btn_bb].join(" ")}
          >
            <div id="signInDiv" className={style.google_2}></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
