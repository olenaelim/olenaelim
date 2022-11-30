import style from "../../source/MypageInfo.module.css";
import logo from "../../source/img/mypage.png";
import MoodalMileage from "../Moodal/Mileage";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AddressApi from "../Moodal/AddressApi";
import { Link } from "react-router-dom";

function MypageInfo(props) {
  const [data, setData] = useState({
    email: "",
    pass: "",
    nickname: "",
    phone: "",
    address: "",
    mileage: "",
    loginImg: "",
  });

  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [isPass, setIsPass] = useState(false);
  const [isPassConfirm, setIsPassConfirm] = useState(false);
  // const [isPhone, setIsPhone] = useState(false);
  // const [isAddress, setIsAddress] = useState(false);
  const [passMessage, setPassMessage] = useState("");
  const [passConfirmMessage, setPassConfirmMessage] = useState("");

  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const changeAddress = (e) => {
    setAddress(e.target.value);
    // if (e.target.value.length > 0) {
    //   setIsAddress(true)
    // }
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
  /// 탈퇴용
  const HandlerDelete = () => {
    if (window.confirm("오르내림 회원을 탈퇴 하시겠습니까?")) {
      axios
        .post(
          `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member/delete`,
          { email: userEmail }
        )
        .then((response) => {
          alert("회원 탈퇴되었습니다.");
          sessionStorage.clear();
          props.setIsLogin(false);
          props.history.push("/login");
        });
    } else {
      console.log("취소");
    }
  };

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member`)
      .then((response) => {
        console.log(response.data);
        setData({
          email: response.data.email,
          nickname: response.data.nickname,
          phone: response.data.phone,
          address: response.data.address,
          addressDetail: response.data.addressDetail,
          mileage: response.data.mileage,
          loginImg: response.data.loginImgName,
        });
        setAddress(response.data.address);
        setPhone(response.data.phone);
        setUserEmail(response.data.email);
      });
  }, []);

  const formData = new FormData();
  const [imgBase64, setImgBase64] = useState([]);
  const [imgBase, setImgBase] = useState([1, 2, 3]);
  const [imgFile, setImgFile] = useState([]);


  let dataSet = {
    phone,
    address,
    addressDetail,
    pass,
    email: userEmail,
  };

  // formData.append('data', dataSet);
  formData.append(
    "data",
    new Blob([JSON.stringify(dataSet)], { type: "application/json" })
  );
  Object.values(imgFile).forEach((file) => formData.append("files", file));


  const handlerUpdate = () => {

    // if (!(isPass && isPassConfirm)) {
    //   alert("두 비밀번호가 일치하지 않습니다.");
    // } else {
    axios({
      method: "post",
      url: `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/member/update`,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data; `,
      },
    })
      .then((response) => {
        console.log(response.data)
        props.setProfileImg(response.data);
        sessionStorage.setItem("profileImg", response.data)
        alert("수정이 완료되었습니다.");
        props.history.push("/mypage");
      });
  };
  const warn = () => {
    alert("정보 수정을 완료해주세요!");
  };

  // 주소API
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen((prev) => !prev); // false > true
  };
  console.log(address);
  console.log(phone);

  //////////////////////파일 업로드//////////////////////


  const handleChangeFile = (event) => {
    //fd.append("file", event.target.files)

    const newImgBase = [1, 2, 3];
    var maxSize = 1 * 1024 * 1024; //1MB
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
          return;
        } else if (event.target.files[i].size > maxSize) {
          alert("이미지 크기는 1MB를 초과할 수 없습니다.");
          return;
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
      <MoodalMileage />
      <div className={style.All_Mboxi}>
        <Link to="/mypage">
          <h1 className={style.page_namei}>마이페이지</h1>
        </Link>
        <div>
          <div className={style.Mboxi}>
            <div className={style.logo_boxi}>
              <img src={
                data.loginImg !== null
                  ? `http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/image/member/${data.loginImg}`
                  : logo} alt="1"></img>
            </div>
            <div className={style.mileage_boxi}>
              <h3>
                <strong>{data.nickname}</strong>님 환영합니다!
              </h3>
              <h3>
                현재 마일리지 <strong>{data.mileage.toLocaleString()}</strong>원
              </h3>
            </div>
            <div className={style.Mbox_button}>
              <ul>
                <li>
                  <button className={style.member} type="button"></button>
                  <p>회원정보</p>
                </li>
                <li>
                  <button
                    className={style.mileage}
                    type="button"
                    onClick={() => {
                      alert("정보수정중에는 이용할수 없습니다.");
                    }}
                  ></button>
                  <p>마일리지</p>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      alert("정보수정중에는 이용할수 없습니다.");
                    }}
                  ></button>
                  <p>신고내역</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={style.categoryi}>
          <h3>회원정보 수정</h3>
        </div>
        <div className={style.member_infoi}>
          <div>
            <h3 className={style.fixi}>아이디</h3>
            <h3>{data.email}</h3>
            <h3 className={style.fixi}>닉네임</h3>
            <h3>{data.nickname}</h3>
          </div>
          <div>
            <h3 className={style.addressi}>주소</h3>
            <input defaultValue={address} onChange={changeAddress} readOnly />
            <button className={style.searchi} onClick={onToggleModal}>
              검색
            </button>
          </div>
          <h3>상세주소</h3>
          <input defaultValue={data.addressDetail} />
          {isOpen && (
            <AddressApi
              visible={isOpen}
              onOk={onToggleModal}
              onCancel={onToggleModal} // isOpen이 false가 되고 화면이 리렌더되면서 모달이 뜨지 않는다.
              setAddress={setAddress}
            />
          )}
          <h3>전화번호</h3>
          <input defaultValue={data.phone} onChange={changePhone} />

          <h3>변경 비밀번호</h3>
          <input
            type="password"
            onChange={changePass}
            value={pass}
            placeholder="숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
          />
          {pass.length > 0 && (
            <p style={isPass ? { color: "#248f48" } : { color: "#ff2727" }}>
              {passMessage}
            </p>
          )}
          <h3>비밀번호 확인</h3>
          <input
            type="password"
            onChange={changePassConfirm}
            value={passConfirm}
            placeholder="변경할 비밀번호를 다시 입력해주세요!"
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
        </div>

        {/*  파일 업로드 */}
        <li className={style.photo_b}>
          <h3>사진등록</h3>
          <div className={style.fileupload}>
            {imgBase64.map((item) => {
              return (
                <label for="file">
                  <img className={style.mid_img} src={item} alt="First slide" />
                </label>
              );
            })}
            {imgBase64.length == 0 && (
              <label for="file">
                <img src={require("../../source/img/pic.png")} alt="사진1" />
              </label>
            )}
          </div>

          {/*  파일 업로드 히든 */}
          <div className={style.filebox}>
            <input
              type="file"
              id="file"
              className={style.upload}
              onChange={handleChangeFile}
            />
          </div>
        </li>

        <div className={style.btn_area}>
          <button
            type="button"
            className={`${style.getouti} ${style.btni}`}
            onClick={HandlerDelete}
          >
            회원탈퇴
          </button>
          <button
            type="button"
            className={`${style.updatei} ${style.btni}`}
            onClick={handlerUpdate}
          >
            정보수정
          </button>
        </div>
      </div>
    </>
  );
}


export default MypageInfo;
