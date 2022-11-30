package auction.guad.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.MailUtil;
import auction.guad.dto.NotifyDto;
import auction.guad.service.NotifyService;
import io.swagger.annotations.ApiOperation;

@RestController
public class EmailController {

	
		private MailUtil mailUtil;
		private NotifyService notifyService;
		
		@Autowired
		public EmailController(MailUtil mailUtil, NotifyService notifyService) {
			this.mailUtil = mailUtil;
			this.notifyService = notifyService;
		}
		
		@ApiOperation(value = "신고접수 내용 메일전송", notes = "고객 이메일(아이디) 주소에 신고접수내용을 발송")
		@PostMapping("/notify/email")
		public void contextLoad(@RequestBody NotifyDto notify, @AuthenticationPrincipal User user) throws Exception {
			System.err.println(">>>>>>>>>>>>>>>" +"메일 전송시작");
			System.err.println(">>>>>>>>>>>>>>>" + user.getUsername());
			Map<String, Object> variables = new HashMap<>();
			
			variables.put("title", notify.getNotifyTitle());
			variables.put("contents", notify.getNotifyContents());
			
			//받는 사람 이메일주소, 메일 제목, 이름
			mailUtil.sendTemplateMail(user.getUsername(), "olenaelim 신고-접수내역", "오르내림", variables);
			System.err.println(">>>>>>>>>>>>>>>" +"메일 전송완료");
		}
}
