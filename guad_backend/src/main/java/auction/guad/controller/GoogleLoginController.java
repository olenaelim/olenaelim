package auction.guad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.MemberDto;
import auction.guad.security.JwtTokenUtil;
import auction.guad.service.MemberService;
import auction.guad.vo.RequestVo;
import io.swagger.annotations.ApiOperation;

@RestController
public class GoogleLoginController {

	private MemberService memberService;
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	public GoogleLoginController(MemberService memberService, JwtTokenUtil jwtTokenUtil) {
		this.memberService = memberService;
		this.jwtTokenUtil = jwtTokenUtil;
	}	

	@ApiOperation(value = "구글 로그인(email)", notes = "google로그인. email로 회원여부 확인 후 , 파라미터 : nickname")
	@PostMapping("/login/oauth2")
	public ResponseEntity<String> oauth2IsMember(@RequestBody RequestVo request) throws Exception {
		System.out.println("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡrequest" + request);
		MemberDto member = memberService.selectMemberDetailByEmail(request.getEmail());
		if (member != null){
			// 요청email도 유효하고, 회원가입정보도 있는 경우
			// 토큰 생성 후 반환
			System.out.println("ㅡㅡㅡㅡㅡㅡ로그인");
			return ResponseEntity.status(HttpStatus.OK).body(jwtTokenUtil.generateToken(member));
		} else if (request.getEmail() == null) {
			System.out.println("ㅡㅡㅡㅡㅡㅡ이메일없음");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		} else {
			// email은 있으나 회원가입이 안되어있음
			System.out.println("ㅡㅡㅡㅡㅡㅡ회원가입 필요");
			return ResponseEntity.status(HttpStatus.OK).body(" ");
		}
	}

}