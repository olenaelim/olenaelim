import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

/* global google */
function GoogleLoginForm({history}) {
  const [user, setUser] = useState({});

  //토큰 >> decoding
  function handlerCallbackResponse(response) {
    console.log("Encoded JWT ID token " + response.credential);
    console.log(response)
    console.log(response.credential)
    var userObject = jwt_decode(response.credential);
    console.log(userObject.picture);
    
    setUser(userObject);

    //로그인 하면 로그인 버튼 가리기
    document.getElementById("signInDiv").hidden = true;
    //구글로 부터 받은 데이터를 POST로 컨트롤러에 전달
    axios
      .post(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/login/oauth2`, {
        // email: user.email,
        email: userObject.email,
      })
      .then((response) => {
        alert("오르내림에 오신걸 환영합니다.");
        // sessionStorage.token에 값이 입력되면 app.js에서 axios 요청 header에 token을 입력. header에 한글이 입력되면 에러발생
        // 현재 서버쪽에서 http://localhost:8080/api/google/auth 요청 성공 시 response.data에 '로그인 성공'이라는 한글을 반환되서 에러 발생
        // sessionStorage.setItem("token", response.data);
       
        sessionStorage.setItem("email", userObject.email);
        // history.push("/join_g");
      })
      .catch((error) => {
        alert("로그인에 실패했습니다.");
      });
  }

  function handleSignOut(e) {
    setUser({});
    //로그아웃 하면 로그인 버튼 생성
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "1068908873530-hp1930ja7o5k3qcree5o0v9tt21h055h.apps.googleusercontent.com",
      callback: handlerCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div className="App">
        <div id="signInDiv"></div>

        {/* {Object.keys(user).length != 0 && ( */}
          <button id="logOutBt" onClick={(e) => handleSignOut(e)}>
            로그아웃
          </button>
        {/* )} */}

        {user && (
          <div>
            <img src={user.picture}></img>
            <h3>{user.name}</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default GoogleLoginForm;
