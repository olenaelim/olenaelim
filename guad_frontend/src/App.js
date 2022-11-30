import "./App.css";
import FileUploadForm from "./FileUploadForm";
import { Route } from "react-router-dom";
import GoogleLoginForm from "./GoogleLoginForm";
import Header from "./component/Header";
import Login from "./component/Login";
import AuctionTest from "./auction/AuctionTest";
import Auction from "./auction/Auction";
import Footer from "./component/Footer";
import Main from "./component/Main";
import Mypage from "./component/Mypage/Mypage";
import MypageInfo from "./component/Mypage/MypageInfo";
import Mileage from "./component/Moodal/Mileage";
import Manager from "./component/Manager/Manager";
import ManagerNotify from "./component/Manager/ManagerNotify";
import ManagerMember from "./component/Manager/ManagerMember";
import Join from "./component/Join";
import JoinG from "./component/JoinG";
import SellList from "./component/SellList";
import axios from "axios";
import SellItem from "./component/SellItem";
import ChatRoom from "./auction/ChatRoom";
import Selling from "./component/Selling";
import ChatTest from "./auction/ChatTest";
import Sell_Up from "./component/Sell_Up";
import Sell_Down from "./component/Sell_Down";
import Sell_DownRandom from "./component/Sell_DownRandom";
import Sell_After from "./component/Sell_After";
import { useState, useRef } from "react";
import MypageCheck from "./component/Mypage/MypageCheck";
import Sell_End_u from "./component/Sell_End_u";
import Sell_End_d from "./component/Sell_End_d";
import Mypage_SellList from "./component/Mypage/Mypage_SellList";
import Sell_End_n from "./component/Sell_End_n";
import Email_send from "./component/Email_send";
import ProtectPolicy from "./component/ProtectPolicy";
import ProtectPolicyWrapper from "./component/ProtectPolicyWrapper";
import TermsWrapper from "./component/TermsWrapper";

function App() {
  console.log("토큰 입니다. : " + sessionStorage.getItem("token"));
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem("token") ? true : false
  );
  const [nickName, setNickName] = useState(sessionStorage.getItem("nickname"));
  const [profileImg, setProfileImg] = useState(
    sessionStorage.getItem("profileImg") === 'null' || sessionStorage.getItem("profileImg") === 'undefined' ? '':sessionStorage.getItem("profileImg")
  );

  console.log(">>>>>>>>>>>>" + profileImg);
  console.log(">>>>>>>>>>>>" + sessionStorage.getItem("profileImg"));
  const [searchWord, setSearchWord] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [manager, setManager] = useState(sessionStorage.getItem("managerYn"));

  // function handlerIsLogin() {zz
  //   setIsLogin(true);
  // }

  // function handlerIsLogout() {
  //   setIsLogin(false);
  // }

  axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
  console.log("현재 로그인 상태 : " + isLogin);
  console.log(sessionStorage);

  return (
    <>
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        nickName={nickName}
        manager={manager}
        setSearchWord={setSearchWord}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        setManager={setManager}
        profileImg={profileImg}
      />
      <Route path="/g_login" component={GoogleLoginForm} exact={true} />
      <Route
        path="/login"
        render={(props) => (
          <Login
            setIsLogin={setIsLogin}
            setNickName={setNickName}
            setManager={setManager}
            setProfileImg={setProfileImg}
            {...props}
          />
        )}
      />
      <Route path="/upload" component={FileUploadForm} exact={true} />

      <Route
        path="/auction/test/:itemNum"
        component={AuctionTest}
        exact={true}
      />
      <Route path="/chat/:nickname" component={ChatTest} exact={true} />
      <Route path="/chatroom" component={ChatRoom} exact={true} />
      <Route path="/auction" component={Auction} exact={true} />
      <Route path="/footer" component={Footer} exact={true} />
      <Route path="/" component={Main} exact={true} />
      <Route path="/mypage" component={Mypage} exact={true} />
      <Route
        path="/mypage/info"
        render={(props) => <MypageInfo setIsLogin={setIsLogin} setProfileImg={setProfileImg} {...props} />}
      />
      <Route path="/mypage/check" component={MypageCheck} exact={true} />
      <Route path="/mypage/selllist" component={Mypage_SellList} exact={true} />
      <Route path="/mileage" component={Mileage} exact={true} />
      <Route path="/manager" component={Manager} exact={true} />
      <Route path="/manager/member" component={ManagerMember} exact={true} />
      <Route path="/manager/notify" component={ManagerNotify} exact={true} />
      <Route path="/join" component={Join} exact={true} />
      <Route path="/join_g" component={JoinG} exact={true} />
      <Route
        path="/sell_list"
        render={(props) => (
          <SellList
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            isSearch={isSearch}
            {...props}
          />
        )}
        // component={SellList} exact={true}
      />
      <Route path="/sell_item/n/:itemNum" component={SellItem} exact={true} />
      <Route path="/selling" component={Selling} exact={true} />
      <Route path="/sell_item/u/:itemNum" component={Sell_Up} exact={true} />
      <Route path="/sell_item/d/:itemNum" component={Sell_Down} exact={true} />
      <Route
        path="/sell_item/dr/:itemNum"
        component={Sell_DownRandom}
        exact={true}
      />
      <Route path="/sell_end/u/:itemNum" component={Sell_End_u} exact={true} />
      <Route path="/sell_end/d/:itemNum" component={Sell_End_d} exact={true} />

      <Route path="/sell_end/n/:itemNum" component={Sell_End_n} exact={true} />
      <Route path="/sell_after/:itemNum" component={Sell_After} exact={true} />

      <Route path="/email_send" component={Email_send} exact={true} />
      
      <Route path="/protect" component={ProtectPolicyWrapper} />
      <Route path="/terms" component={TermsWrapper} />
      <Footer />
    </>
  );
}
export default App;
