package auction.guad.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import auction.guad.dto.MemberDto;
import auction.guad.service.MemberService;
import auction.guad.vo.RequestVo;
import io.swagger.annotations.ApiOperation;

@RestController
public class MemberController {

	private MemberService memberService;
	private BCryptPasswordEncoder encoder;
//	private S3Uploader s3Uploader;

	@Autowired
	public MemberController(MemberService memberService, BCryptPasswordEncoder encoder) {
		this.memberService = memberService;
		this.encoder = encoder;
//		this.s3Uploader = s3Uploader;
	}

	// 회원가입
	@ApiOperation(value = "회원가입(MemberDto)", notes = "회원가입, 파라미터 : MemberDto")
	@PostMapping("/join")
	public ResponseEntity<String> insertMember(@RequestBody MemberDto member) throws Exception {
		int memberNum = memberService.insertMember(member);
		
		if (memberNum > 0) {
			return ResponseEntity.status(HttpStatus.OK).body("등록성공");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록실패");
		}
	}
	// 구글 회원가입
	@ApiOperation(value = "회원가입(MemberDto)", notes = "회원가입, 파라미터 : MemberDto")
	@PostMapping("/join/google")
	public ResponseEntity<String> insertGoogleMember(@RequestBody MemberDto member) throws Exception {
		
		String filepath = "C:/img/member/";
		String returnFileName= System.currentTimeMillis()+member.getEmail()+".png";
		String url=member.getLoginImgName();
		
		try (InputStream in = URI.create(url).toURL().openStream()) {
			Files.copy(in, Paths.get(filepath+returnFileName));
			member.setLoginImgName(returnFileName);
		}
		
		
		int memberNum = memberService.insertMember(member);
		
		if (memberNum > 0) {
			return ResponseEntity.status(HttpStatus.OK).body("등록성공");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록실패");
		}
	}
	

	// 이메일 중복 체크
	@ApiOperation(value = "회원가입 - id중복체크(email)", notes = "회원가입 - id중복체크, 파라미터 : email")
	@PostMapping(value="/join/idcheck")
	public ResponseEntity<Integer> repetitionEmailCheck(@RequestBody MemberDto member) throws Exception {
		Integer result = memberService.repetitionEmailCheck(member.getEmail());
		System.out.println("<<<<<<<<<<<<<<<<호출");
		System.out.println(result);
		if (result == 1) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		} else if (result == 0) {
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(null);
		}
	}

	// 닉네임 중복 체크
	@ApiOperation(value = "회원가입 - nickname중복체크(nickname)", notes = "회원가입 - nickname중복체크, 파라미터 : nickname")
	@PostMapping(value = "/join/nicknamecheck")
	public ResponseEntity<Integer> repetitionNicknameCheck(@RequestBody MemberDto member) throws Exception {
		Integer result1 = memberService.repetitionNicknameCheck(member.getNickname());
		
		if (result1 == 1) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		} else if (result1 == 0) {
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(null);
		}

	}

	// 로그인 토큰으로 회원정보 조회
	@ApiOperation(value = "회원정보 조회()", notes = "회원정보 조회, 파라미터 : ''")
	@GetMapping("/member")
	public ResponseEntity<MemberDto> myPageByEmail(@AuthenticationPrincipal User user) throws Exception {
		System.out.println(">>>>>>>>>>>>>>>" + user);
		MemberDto memberDto = memberService.selectMemberDetailByEmail(user.getUsername());
		System.err.println(memberDto.getLoginImgName());
		if (memberDto == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			return ResponseEntity.ok(memberDto);
		}
	}

	// email, pass로 회원정보 조회
	@ApiOperation(value = "회원정보 조회(email, pass)", notes = "회원정보 조회, 파라미터 : email, pass")
	@PostMapping("/member/pw")
	public ResponseEntity<MemberDto> myPageByEmailAndPass(@RequestBody RequestVo request) throws Exception {
		MemberDto memberDto = memberService.selectMemberDetailByEmail(request.getEmail());
		if (memberDto == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else if (request.getPass() != memberDto.getPass()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		} else {
			return ResponseEntity.ok(memberDto);
		}
	}

	// 회원정보 수정
	@ApiOperation(value = "회원정보 수정(MemberDto)", notes = "회원정보 수정, 파라미터 : MemberDto")
	@PostMapping("/member/update")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<String> updateMember(@RequestPart(value = "files", required = false) MultipartFile[] files,
			@RequestPart(value = "data", required = false) MemberDto member, @AuthenticationPrincipal User user)
			throws Exception {
		
		String FileNames = "";
		String filepath = "C:/img/member/";
//		String filepath = "/home/";
		// header에 입력할 이미지 name 반환할때 사용
		String returnFileName= " ";
		
		for (MultipartFile mf : files) {

			String originFileName = mf.getOriginalFilename(); // 원본 파일 명
			long fileSize = mf.getSize(); // 파일 사이즈

			System.out.println("originFileName : " + originFileName);
			System.out.println("fileSize : " + fileSize);
			String safeFile = System.currentTimeMillis() + originFileName;
			returnFileName = safeFile.toString();
//	            FileNames = FileNames+","+safeFile; 

			member.setLoginImgName(safeFile);
			
			try {
				File f1 = new File(filepath + safeFile);
				mf.transferTo(f1);
//				String s3filepath = "member/"+safeFile;
//				s3Uploader.upload(f1, filepath, s3filepath);
//				s3Uploader.putS3(f1, safeFile);
//				s3Uploader.removeNewFile(f1);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		
		if (memberService.selectMemberDetailByEmail(user.getUsername()) == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("입력하신 정보를 찾을 수 없습니다.");
		}
		memberService.updateMemberByEmail(member);
		return ResponseEntity.ok(returnFileName);
	}

	// 회원 탈퇴(flag)
	@ApiOperation(value = "회원탈퇴-flag(email)", notes = "회원탈퇴-flag, 파라미터 : email")
	@PostMapping("/member/delete")
	public ResponseEntity<String> deleteMember(@RequestBody RequestVo request) throws Exception {
		MemberDto member = memberService.selectMemberDetailByEmail(request.getEmail());
		if (member == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("입력하신 정보를 찾을 수 없습니다.");
		}
		memberService.deleteMemberByEmail(member);
		return ResponseEntity.ok("회원 탈퇴에 성공했습니다");

	}

	// 관리자용 회원 목록 조회
	@ApiOperation(value = "관리자용 회원 목록 조회()", notes = "관리자용 회원 목록 조회, 파라미터 : ''")
	@GetMapping("/admin/member")
	public List<MemberDto> adminMemberList(@AuthenticationPrincipal User user) throws Exception {
		System.out.println("/admin/member 호출 >>>>>>>>>>>>>>>>>>" + user);
		return memberService.managerSelectMemberListExceptPass();
	}

	// 관리자용 탈퇴 회원 목록 조회
	@ApiOperation(value = "관리자용 탈퇴회원-flage 조회()", notes = "관리자용 탈퇴회원 조회, 파라미터 : ''")
	@RequestMapping(value = "/admin/member/delete", method = RequestMethod.GET)
	@GetMapping("/admin/member/delete")
	public List<MemberDto> admindeleteMemberList() throws Exception {
		return memberService.managerSelectMemberListExceptPassAnddelete();
	}

	// 관리자용 회원 상세 조회
	@ApiOperation(value = "관리자용 회원 상세 조회(email)", notes = "관리자용 회원 상세 조회, 파라미터 : email")
	@GetMapping("/admin/member/{email}")
	public MemberDto admindeleteMemberList(@PathVariable String email) throws Exception {
		return memberService.managerSelectMemberDetailByEmail(email);
	}


	@ApiOperation(value = "비밀번호 재확인", notes = "개인정보 변경 전 비밀번호 재확인")
	@PostMapping("/mypage/passcheck")
	public ResponseEntity<Boolean> passCheck(@AuthenticationPrincipal User user, @RequestBody MemberDto member)
			throws Exception {

		String pass = member.getPass();
		String userPass = user.getPassword();

		boolean result = memberService.checkPass(user, member);
		if (result) {
			return ResponseEntity.status(HttpStatus.OK).body(true);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
		}
	}
	
}
