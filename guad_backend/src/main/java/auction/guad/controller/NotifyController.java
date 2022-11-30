package auction.guad.controller;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;
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
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.ImgDto;
import auction.guad.dto.NotifyDto;
import auction.guad.service.ImgService;
import auction.guad.service.NotifyService;
import auction.guad.vo.NotifyVo;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/notify")
public class NotifyController {

	private NotifyService notifyService;
	private ImgService imgService;
	BCryptPasswordEncoder encoder;

	@Autowired
	public NotifyController(NotifyService notifyService, ImgService imgService) {
		this.notifyService = notifyService;
		this.imgService = imgService;
	}

	@ApiOperation(value = "신고등록(NotifyDto)", notes = "신고등록, 파라미터 : NotifyDto")
	@PostMapping("/write")
	public ResponseEntity<String> insertNotify(@RequestBody NotifyDto notify, @AuthenticationPrincipal User user)
			throws Exception {

		notify.setMemberEmail(user.getUsername());
		int notifyNum = notifyService.insertNotify(notify);
		if (notifyNum > 0) {
			return ResponseEntity.status(HttpStatus.OK).body("등록성공");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록실패");
		}
	}

//	@ApiOperation(value = "신고이미지 조회", notes = "신고이미지 조회")
//	@GetMapping(value = "/admin/img/list")
//	public ResponseEntity<List> notifyImgList(@AuthenticationPrincipal User user) throws Exception {
//
//		InputStream in = null;
//		ResponseEntity<List> entity = null;
//		List<NotifyDto> NotifyList = notifyService.notifyList();
//		List<ImgDto> ImgList = new ArrayList<>();
//		List<byte[]> result = new ArrayList<>();
//		
//		// item 넘버에 해당하는 이미지(첫번째)에 대한 정보를 ImgList에 넣는다.
//		for (int i = 0; i < NotifyList.size(); i++) {
//			ImgList.add(i, imgService.selectImgByItemNumFirst(NotifyList.get(i).getItemNum()));
//		}
//
//		for ( int i =0; i< ImgList.size(); i++) {
//			in = new FileInputStream("C://img/" + ImgList.get(i).getItemImgName());
//			result.add(IOUtils.toByteArray(in));
//		}
//	
//		entity = new ResponseEntity<List>(result, HttpStatus.CREATED);
//		return entity;
//	}


	@ApiOperation(value = "신고리스트 조회(NotifyDto)", notes = "신고 목록 조회, 파라미터 : NotifyDto")
	@GetMapping("/admin/list")
	public List<NotifyDto> notifyList(@AuthenticationPrincipal User user) throws Exception {
		List<NotifyDto> NotifyList = notifyService.notifyList();
		List<ImgDto> ImgList = new ArrayList<>();
		
		return notifyService.notifyList();
	}
	
	@ApiOperation(value = "내 신고리스트 조회(NotifyVo)", notes = "신고 목록 조회, 파라미터 : NotifyVo")
    @GetMapping("/my/list")
    public List<NotifyVo> myNotifyList(@AuthenticationPrincipal User user) throws Exception {
     
        List<NotifyVo> myNotifyList = notifyService.myNotifyList(user.getUsername());
        
        return myNotifyList;
    }

	@ApiOperation(value = "신고리스트 상세 조회(NotifyDto)", notes = "신고 상세 조회, 파라미터 : NotifyDto")
	@GetMapping("/admin/{notifyNum}")
	public NotifyVo notifyDetail(@PathVariable String notifyNum) throws Exception {
		System.out.println(">>>>>>>>>>>>>>>>>" + notifyNum);
		System.out.println(">>>>>>>>>>>>>>>>>" + notifyService.notifyDetail(notifyNum));

		return notifyService.notifyDetail(notifyNum);
	}

}
