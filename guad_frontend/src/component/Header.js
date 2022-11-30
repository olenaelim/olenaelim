import style from "../source/Header.module.css";
import logo from "../source/img/head_logo.png";
import logo_d from "../source/img/mypage_d.png";
import search from "../source/img/h_search.png";
import { Link, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Header(props) {
  const [mypage, SetMypage] = useState();
  const [searchWord, setSearchWord] = useState("");
  const SearchGo = (e) => {
    if (e.key == "Enter") {
      console.log("여기");
      props.setIsSearch(!props.isSearch)
      props.setSearchWord(searchWord);
      setSearchWord("");
      props.history.push("/sell_List");
    }
  };

  const go_sell = (e) => {
    if (sessionStorage.length != 0) {
      e.preventDefault();
      props.history.push("/selling");
    } else {
      alert("상품을 등록하려면 로그인 해주세요!");
    }
  };

  useEffect(() => {
    if (sessionStorage.length != 0) {
      SetMypage(true);
    } else if (sessionStorage.length == 0) {
      SetMypage(false);
    }
  }, [sessionStorage.length]);

  const handleSignOut = (e) => {
    e.preventDefault();
    props.setIsLogin(false);
    sessionStorage.clear();
    alert("로그아웃 되었습니다.");
  };

  const handlerSearchWord = (e) => {
    setSearchWord(e.target.value)
  };
  console.log("검색한 단어 : " + searchWord);
  return (
    <>
      <div className={style.header_b}>
        <header>
          <Link to="/">
            <img src={logo} alt="로고" className={style.h_logo_b} />
          </Link>
          <ul>
            <li>
              <Link to="/sell_List">판매목록</Link>
            </li>
            <li onClick={go_sell}>상품등록</li>

            {!props.isLogin && (
              <li>
                <Link to="/login">로그인</Link>
              </li>
            )}

            {props.isLogin && (
              <li type="button" onClick={handleSignOut}>
                <Link to="/">로그아웃</Link>
              </li>
            )}
            {props.isLogin && (
              <li className={style.nick}>
                {console.log(props.profileImg)}
                <img src={
                  (props.profileImg !== null && props.profileImg !== '' && props.profileImg !== 'null')
                    ? `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/member/${props.profileImg}`
                    : logo_d
                    } 
                    alt="1">

                    </img>


                {/* <img
                  src={
                    data.loginImg !== null
                      ? `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/member/${data.loginImg}`
                      : logo
                  }
                  alt="1"
                ></img> */}
                <strong>{props.nickName}</strong>님 환영합니다!
              </li>
            )}

            {mypage == true && (
              <li>
                {props.manager != "ROLE_y" && (
                  <Link to="/mypage">마이페이지</Link>
                )}
                {props.manager == "ROLE_y" && (
                  <Link to="/manager">관리자페이지</Link>
                )}
              </li>
            )}
          </ul>
          <input
            type="text"
            className={style.search_b}
            value={searchWord}
            onChange={handlerSearchWord}
            onKeyDown={SearchGo}
          />
          <img src={search} alt="검색창" className={style.search_icon} />
        </header>
      </div>
    </>
  );
}
export default withRouter(Header);
