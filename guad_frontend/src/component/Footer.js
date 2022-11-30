import style from "../source/Footer.module.css";
import logo from "../source/img/f_logo.png";

function Footer() {
  return (
    <>
      <footer>
        <div className={style.foot_top}>
          <img src={logo} alt="푸터로고" />
          <ul>
            <li>
              <img src={require("../source/img/l_g.png")} alt="구글로고" />
            </li>
            <li>
              <img src={require("../source/img/l_f.png")} alt="페북로고" />
            </li>
            <li>
              <img src={require("../source/img/l_i.png")} alt="인스타로고" />
            </li>
            <li>
              <img src={require("../source/img/l_k.png")} alt="카카오로고" />
            </li>
          </ul>
        </div>
        <div className={style.foot_bot}>
          <p>오르내림 주식회사 · 대표 김코딩 사업자등록번호 :123-1234-1234 </p>
          <p>사업자정보확인통신판매업 : 제 2022-자바코딩-1011호</p>
          <address>
            사업장소재지 : 서울시 종로구 인사동길 12 대일빌딩 7층, 7층호스팅
            서비스 : 게이버 클라우드 ㈜
          </address>
          <p>
            천국은행 채무지급보증 안내
            <br />
            <br />
            당사는 고객님의 현금 결제 금액에 대해 천국은행과 채무지급보증 계약을
            체결하여 안전거래를 보장하고 있습니다.
            <br />
            <br />
            오르내림(주)는 통신판매 중개자로서 통신판매의 당사자가 아니므로 개별
            판매자가 등록한 상품정보에 대해서 책임을 지지 않습니다.
            <br />
            단, 거래과정에서 검수하고 보증하는 내용에 대한 책임은 당사에
            있습니다.
          </p>
        </div>
      </footer>
    </>
  );
}
export default Footer;
