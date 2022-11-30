package auction.guad.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.MemberDto;
import auction.guad.dto.ReviewDto;
import auction.guad.service.MemberService;
import auction.guad.service.ReviewService;
import auction.guad.service.SellItemService;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
public class ReviewController {

	private MemberService memberService;
	private ReviewService reviewService;
	private SellItemService sellItemService;
		
	@Autowired
	public ReviewController(MemberService memberService, ReviewService reviewService, SellItemService sellItemService) {
		this.memberService = memberService;
		this.reviewService = reviewService;
		this.sellItemService = sellItemService;
	}

	@ApiOperation(value = "리뷰 목록 조회(email)", notes = "email로 등록된 리뷰 목록을 조회, 파라미터 : email")
	@GetMapping("/review/{itemNum}")
	public List<ReviewDto> selectReviewListByEmail(@PathVariable("itemNum")int itemNum) throws Exception {
		System.out.println("리뷰호출");
		System.out.println(reviewService.selectReviewListByEmail(sellItemService.selectSellItemDetailNoHitCnt(itemNum).getMemberEmail()));
		return reviewService.selectReviewListByEmail(sellItemService.selectSellItemDetailNoHitCnt(itemNum).getMemberEmail());
	}


	@ApiOperation(value = "리뷰 등록", notes = "리뷰 제목과 내용을 저장")
	@RequestMapping(value = "/review", method = RequestMethod.POST)
	public void insertReview(
			@Parameter(description = "리뷰 정보", required = true, example = "{ title: 제목, contents: 내용 }") @RequestBody ReviewDto review, @AuthenticationPrincipal User user)
			throws Exception {
		MemberDto member = memberService.selectMemberDetailByEmail(user.getUsername());
	    review.setWriterEmail(member.getEmail()); 
	    review.setWriterNickname(member.getNickname());
		reviewService.insertReview(review);
	} 

	
    /*
     * @RequestMapping(value = "/review/{reviewNum}", method = RequestMethod.PUT)
     * public void updateReview(@PathVariable("reviewNum") int
     * reviewNum, @RequestBody ReviewDto reviewDto) throws Exception {
     * reviewDto.setReviewNum(reviewNum);
     * reviewService.updateReview(reviewDto);
     * }
     * 
     * @RequestMapping(value = "/Review/{reviewNum}", method = RequestMethod.DELETE)
     * public void deleteReview(@PathVariable("reviewNum") int reviewNum) throws
     * Exception {
     * reviewService.deleteReview(reviewNum);
     * }
     */
}


