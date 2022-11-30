package auction.guad.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.controller.model.Message;
import auction.guad.dto.AuctionDownDto;
import auction.guad.dto.MemberDto;
import auction.guad.security.JwtTokenUtil;
import auction.guad.service.AuctionService;
import auction.guad.service.MemberService;
import auction.guad.service.SellItemService;
import auction.guad.vo.AuctionVo;
import auction.guad.vo.SellItemJoinMemberVo;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

	@Autowired

//	private AuctionService auctionService;

	private final AuctionService auctionService;
	private final SellItemService sellItemService;

	private final SimpMessagingTemplate simpMessagingTemplate;
	private final MemberService memberService;
	private final JwtTokenUtil jwtTokenUtil;

	int bid = 10000;
	int result;

	@MessageMapping("/up/{itemNum}")
	@SendTo("/sub/up/{itemNum}")
	public Message receiveMessage(@Payload Message message, @DestinationVariable("itemNum") int itemNum) {
		System.out.println("테스트<<<<<<<<<<<<<<<<<<<<<<<<<");
		return message;
	}

	@GetMapping("/bidlist")
	public Integer testListget() {
		return bid;
	}


	@ApiOperation(value = "오름 경매 상세 조회", notes = "오름 경매 상세 정보를 조회")
	@MessageMapping("/sellitem/auction/u/{itemNum}")
	@SendTo("/sub/sellitem/auction/u/{itemNum}")
	public AuctionVo openOllimSellItemDetail(@Payload AuctionVo auction, @DestinationVariable int itemNum,
			@Header String Authorization) throws Exception {
		SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetailNoHitCnt(itemNum);

		
		Optional<AuctionVo> test = Optional.ofNullable(auctionService.lastAuction(itemNum));
		if(test.isPresent()) {
			auction.setBeforeAuctionPrice(auctionService.lastAuction(itemNum).getAuctionPrice());
			System.out.println(">>>>>>>>>>>>>>" + auction.getBeforeAuctionPrice());
			auction.setBeforeNickname(memberService.managerSelectMemberDetailByEmail(auctionService.lastAuction(itemNum).getMemberEmail()).getNickname());
		} else {
			auction.setBeforeAuctionPrice(0);
			auction.setAuctionPrice(sellItem.getAuctionStartPrice());
			auction.setBeforeNickname("");
		}
		
		String token = Authorization.substring(7);
		Claims claims = jwtTokenUtil.getAllClaimsFromToken(token);
		MemberDto member = memberService.loginContainPass(claims.getSubject());

		System.err.println(auction.getAuctionPrice());
		System.err.println(member.getMileage());
		
		

			auction.setNickname(member.getNickname());
			auction.setMemberEmail(member.getEmail());
			

			StringBuffer sb = new StringBuffer();
			StringBuffer sb2 = new StringBuffer();
			String basic = "0";
			int bidAmount;
			
			if(auction.getBeforeAuctionPrice() != 0) {
				bidAmount = auction.getAuctionPrice();
			}else {
				bidAmount = sellItem.getAuctionStartPrice();
			}
		
			
			System.out.println("1>>>>>>>>>>>>" + auction.getBeforeAuctionPrice());
			System.out.println("1>>>>>>>>>>>>" + auction.getAuctionPrice());
			System.out.println(sellItem.getAuctionStartPrice());
			System.out.println(auction.getBeforeAuctionPrice());
			
			
			ArrayList<Integer> arrbidAmount = new ArrayList<>();
			while (bidAmount > 0) {
				arrbidAmount.add(bidAmount % 10);
				bidAmount /= 10;
			}

			sb.append(arrbidAmount.get(arrbidAmount.size() - 1));
			sb.append(arrbidAmount.get(arrbidAmount.size() - 2));

			if (arrbidAmount.get(arrbidAmount.size() - 2) != 0) {
				for (int i = 0; i < arrbidAmount.size() - 2; i++) {
					sb.append(basic);
				}
			} else {
				for (int i = 0; i < arrbidAmount.size() - 2; i++) {
					sb.append(basic);
				}
			}

			if (arrbidAmount.get(arrbidAmount.size() - 1) < 5) {
				sb2.append("1");
				for (int i = 0; i < arrbidAmount.size() - 2; i++) {
					sb2.append(basic);
				}
			} else {
				sb2.append("5");
				for (int i = 0; i < arrbidAmount.size() - 2; i++) {
					sb2.append(basic);
				}
			}

			System.out.println("3>>>>>>>>>>>>>>>" + sb.toString());
			System.out.println("4>>>>>>>>>>>>>>>" + sb2.toString());
			// 변경된 값을 넣어준다.
			

			int bidNum = auctionService.tryAuction(auction);
			
			try {
				int currentPrice = Integer.parseInt(sb.toString());
				int plusePrice = Integer.parseInt(sb2.toString());
				auction.setAuctionPrice(currentPrice + plusePrice);
				System.out.println("5>>>>>>>>>>>>>>>" + currentPrice);
				System.out.println("6>>>>>>>>>>>>>>>" + plusePrice);
			} catch (NumberFormatException ex) {
				ex.printStackTrace();
			}
			sellItemService.updateSellState2(itemNum);
			auction.setBeforeAuctionPrice(auctionService.lastAuction(itemNum).getAuctionPrice());

			if (auction.getAuctionPrice() > sellItem.getAuctionMaxPrice() && bidNum > 0) {
				simpMessagingTemplate.convertAndSendToUser(Integer.toString(auction.getItemNum()),
						"/sub/sellitem/auction/u/" + itemNum, auction);
				auction.setAuctionPrice(-1);
				return auction;
			}else {
				simpMessagingTemplate.convertAndSendToUser(Integer.toString(auction.getItemNum()),
						"/sub/sellitem/auction/u/" + itemNum, auction);
				return auction;
			}
	}

	@ApiOperation(value = "내림 경매 상세 조회", notes = "내림 경매 상세 정보를 조회")
	@MessageMapping("/sellitem/auction/d/{itemNum}")
	@SendTo("/sub/sellitem/auction/d/{itemNum}")
	public ResponseEntity<Long> openNaelimSellItemDetail(@Payload @DestinationVariable int itemNum,
			@Header String Authorization) throws Exception {
		SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetailNoHitCnt(itemNum);

		String token = Authorization.substring(7);
		Claims claims = jwtTokenUtil.getAllClaimsFromToken(token);
		MemberDto member = memberService.loginContainPass(claims.getSubject());

		int discount = sellItem.getAuctionDiscountPerHour();
		long MinPrice = sellItem.getAuctionMinPrice();
		int StartPrice = sellItem.getAuctionStartPrice();
		long auctionFinish = 0;
		long auctionNotyet = -1;

		// 현재날짜
		Date now = new Date();
		// 경매시작 날짜
		Date auctionStart = (Date) sellItem.getWriteDate().clone();
		auctionStart.setSeconds(0);
		auctionStart.setMinutes(0);
		auctionStart.setHours(12);
		auctionStart.setDate(auctionStart.getDate() + 1);
		// 현재날짜와 경매시작 날짜의 차이(시간)
		double timeChange = ((now.getTime() - auctionStart.getTime()) / 3600000);
		// 현재시각과 경매종료날짜 비교
		boolean result = now.before(sellItem.getAuctionFinishDate());
		// 현재시각과 경매시작날짜 비교
		boolean result2 = now.before(auctionStart);
		// 현재 내림경매가
		long CurrentPrice = (long) (StartPrice - (Math.floor(timeChange) * discount));

		if (result2) {
			return ResponseEntity.status(HttpStatus.OK).body(auctionNotyet);
		} else {
			if (result) {
				if (CurrentPrice < MinPrice) {
					return ResponseEntity.status(HttpStatus.OK).body(MinPrice);
				} else {
					return ResponseEntity.status(HttpStatus.OK).body(CurrentPrice);
				}
			} else {
				return ResponseEntity.status(HttpStatus.OK).body(auctionFinish);
			}
		}

	}

	@ApiOperation(value = "내림 경매 랜덤 상세 조회", notes = "내림 경매 랜덤 정보를 조회")
	@MessageMapping("/sellitem/auction/dr/{itemNum}")
	@SendTo("/sub/sellitem/auction/dr/{itemNum}")
	public ResponseEntity<Long> openNaelimSellItemDetail_R(@Payload @DestinationVariable int itemNum,
			@Header String Authorization) throws Exception {
		SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetailNoHitCnt(itemNum);

		String token = Authorization.substring(7);
		Claims claims = jwtTokenUtil.getAllClaimsFromToken(token);
		MemberDto member = memberService.loginContainPass(claims.getSubject());

		int discount;
		// 랜덤 숫자 생성
		int perDiscount = (int) (Math.random() * 4 + 1);
		double perDiscountAll = 0;

		long MinPrice = sellItem.getAuctionMinPrice();
		int StartPrice = sellItem.getAuctionStartPrice();
		long auctionFinish = 0;
		long auctionNotyet = -1;

		// 현재날짜
		Date now = new Date();
		// 경매시작 날짜
		Date auctionStart = (Date) sellItem.getWriteDate().clone();
		auctionStart.setSeconds(0);
		auctionStart.setMinutes(0);
		auctionStart.setHours(12);
		auctionStart.setDate(auctionStart.getDate() + 1);
		// 현재날짜와 경매시작 날짜의 차이(시간)
		double timeChange = ((now.getTime() - auctionStart.getTime()) / 3600000);
		// 현재시각과 경매종료날짜 비교
		boolean result = now.before(sellItem.getAuctionFinishDate());
		// 현재시각과 경매시작날짜 비교
		boolean result2 = now.before(auctionStart);

		// 서비스 작성 : 동일 아이템 넘버 auction_down 테이블의 갯수를 카운트 한다.
		int naelimRandomcheck = auctionService.naelimRandomCount(itemNum);
		// 서비스 작성 : 위숫자보다 적은경우 하나의 랜덤 정수를 생성해 인서트 해준다.
		int dayDiscount = (int) (Math.floor(timeChange) / 24);
		int hourDiscount = (int) (Math.floor(timeChange) % 24);
		if (hourDiscount > 10) {
			hourDiscount = 10;
		}

		if ((dayDiscount * 10 + hourDiscount) > naelimRandomcheck) {
			for (int i = 0; i < ((dayDiscount * 10 + hourDiscount) - naelimRandomcheck); i++) {
				perDiscount = (int) (Math.random() * 4 + 1);
				System.out.println("1>>>>>>>>>>>>>>>>>>" + ((dayDiscount * 10 + hourDiscount) - naelimRandomcheck));
				System.out.println("1>>>>>>>>>>>>>>>>>>" + perDiscount);

				auctionService.naelimRandomPerDiscountInsert(perDiscount, itemNum);
			}

		}
		// 동일 아이템 넘버 auction_down 테이블의 auction_per값을 모두 불러와 더해준다. (반복문)
		List<AuctionDownDto> perDiscountList = auctionService.naelimRandomPerDiscountAll(itemNum);
		for (int i = 0; i < perDiscountList.size(); i++) {
			perDiscountAll += perDiscountList.get(i).getAuctionPer();
		}
		// 현재 내림랜덤경매가 : 가져온 per값으로 현재가격을 계산에 내려준다.
		long CurrentPrice = (long) (StartPrice - (StartPrice * (perDiscountAll / 100)));

		
		System.out.println("5>>>>>>>>>>>>>>>>>>" + CurrentPrice);

		if (result2) {
			return ResponseEntity.status(HttpStatus.OK).body(auctionNotyet);
		} else {
			if (result) {
				if (CurrentPrice < MinPrice) {
					return ResponseEntity.status(HttpStatus.OK).body(MinPrice);
				} else {
					return ResponseEntity.status(HttpStatus.OK).body(CurrentPrice);
				}
			} else {
				return ResponseEntity.status(HttpStatus.OK).body(auctionFinish);
			}
		}
	}
}
