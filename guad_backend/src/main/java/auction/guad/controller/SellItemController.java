package auction.guad.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import auction.guad.dto.ImgDto;
import auction.guad.dto.SellItemDto;
import auction.guad.service.AuctionService;
import auction.guad.service.ImgService;
import auction.guad.service.MemberService;
import auction.guad.service.SellItemService;
import auction.guad.vo.AuctionVo;
import auction.guad.vo.SellItemJoinMemberVo;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
public class SellItemController {

	private SellItemService sellItemService;
	private ImgService imgService;
	private MemberService memberService;
	private AuctionService auctionService;
//	private S3Uploader s3Uploader;

	@Autowired
	public SellItemController(SellItemService sellItemService, ImgService imgService, MemberService memberService, AuctionService auctionService) {
		this.sellItemService = sellItemService;
		this.imgService = imgService;
		this.memberService = memberService;
		this.auctionService = auctionService; 
//		this.s3Uploader = s3Uploader; 
	}

/////////////////////////////////////////////////////////////////////////////////////	

	@ApiOperation(value = "상품 전체 조회", notes = "상품 전체 목록을 조회, 파라미터 : ''")
	@GetMapping("/sellitem")
	public List<SellItemDto> openSellItemList() throws Exception {
//		sellItemService.selectAllItemCount();
		return sellItemService.selectSellItemList();
	}

	@ApiOperation(value = "상품 등록(SellItemDto)", notes = "게시물 제목과 내용을 저장, 파라미터 : SellItemDto")
	@PostMapping("/auth/sellitem")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Boolean> insertSellItem(
			@Parameter(description = "게시물 정보", required = true, example = "{ title: 제목, contents: 내용 }")

			@RequestPart(value = "files", required = false) MultipartFile[] files,
			@RequestPart(value = "data", required = false) SellItemDto sellItem, @AuthenticationPrincipal User user)
			throws Exception {

		ImgDto imgDto = new ImgDto();
		String FileNames = "";
		String filepath = "C:/img/";
//		String filepath = "/home/";

		for (MultipartFile mf : files) {

			String originFileName = mf.getOriginalFilename(); // 원본 파일 명
			long fileSize = mf.getSize(); // 파일 사이즈

			System.out.println("originFileName : " + originFileName);
			System.out.println("fileSize : " + fileSize);
			String safeFile = System.currentTimeMillis() + originFileName;
//	            FileNames = FileNames+","+safeFile; 
			if (sellItemService.selectLastItemNum() == null) {
				imgDto.setItemNum(1);
			} else {
				imgDto.setItemNum(sellItemService.selectLastItemNum() + 1);
			}

			imgDto.setItemImgName(safeFile);
			imgDto.setItemImgUpfile(filepath);
			imgDto.setItemImgType(mf.getContentType());
			imgDto.setImgSize(fileSize);

			imgService.insertSellImg(imgDto);

			try {
				File f1 = new File(filepath + safeFile);
				mf.transferTo(f1);
//				String s3filepath = "member/"+safeFile;
//				s3Uploader.upload(f1, filepath, safeFile);
//				s3Uploader.upload(f1, filepath, s3file);
//				s3Uploader.putS3(f1, safeFile);
//				s3Uploader.removeNewFile(f1);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		sellItem.setMemberEmail(user.getUsername());
		System.out.println("minPrice>>>>>>>>>>>>>>>>>>>" + sellItem.getAuctionMinPrice());
		boolean sellItemresult = sellItemService.insertSellItem(sellItem);

		if (sellItemresult) {
			return ResponseEntity.status(HttpStatus.OK).body(sellItemresult);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(sellItemresult);
		}
	}

/////////////////////////////////////////////////////////////////////////////////////	

	@ApiOperation(value = "게시물 상세 조회", notes = "등록된 게시물 상세 정보를 조회")
	@GetMapping("/sellitem/{itemNum}")
	public ResponseEntity<SellItemJoinMemberVo> openSellItemDetail(@PathVariable("itemNum") int itemNum)
			throws Exception {
		SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetailContainHitCnt(itemNum);
		System.out.println(sellItem);
		
		
		if (sellItem == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			sellItem.setMemberEmail(" ");
			return ResponseEntity.status(HttpStatus.OK).body(sellItem);
		}
	}
	
	@ApiOperation(value = "오름 상세 조회", notes = "오름 게시물 상세 정보를 조회")
	@GetMapping("/sellitem/u/{itemNum}")
	public ResponseEntity<SellItemJoinMemberVo> openOrmSellItemDetail(@PathVariable("itemNum") int itemNum)
			throws Exception {
		SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetailContainHitCnt(itemNum);
		
		
		StringBuffer sb = new StringBuffer();
		StringBuffer sb2 = new StringBuffer();
		String basic = "0";
		
		Optional<AuctionVo> test = Optional.ofNullable(auctionService.lastAuction(itemNum));
		if(test.isPresent()) {
			sellItem.setBeforeAuctionPrice(auctionService.lastAuction(itemNum).getAuctionPrice());
			sellItem.setBeforeNickname(memberService.managerSelectMemberDetailByEmail(auctionService.lastAuction(itemNum).getMemberEmail()).getNickname());
			ArrayList<Integer> arrbidAmount = new ArrayList<>();
			int bidAmount = (int) sellItem.getBeforeAuctionPrice();
			if(bidAmount > 0) {
				while (bidAmount > 0) {
					arrbidAmount.add(bidAmount % 10);
					bidAmount /= 10;
				}
			} else {
				bidAmount = sellItem.getAuctionStartPrice();
				while (bidAmount > 0) {
					arrbidAmount.add(bidAmount % 10);
					bidAmount /= 10;
				}
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
		} else {
			sellItem.setBeforeAuctionPrice(0);
			sellItem.setBeforeNickname("");
		}
		
		System.out.println(sellItem);
		
			
		try {
			int currentPrice = Integer.parseInt(sb.toString());
			int plusePrice = Integer.parseInt(sb2.toString());
			sellItem.setBidPrice(currentPrice + plusePrice);
			System.out.println("5>>>>>>>>>>>>>>>" + currentPrice);
			System.out.println("6>>>>>>>>>>>>>>>" + plusePrice);
		} catch (NumberFormatException ex) {
			ex.printStackTrace();
		}
		
		if (sellItem == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			sellItem.setMemberEmail(" ");
			return ResponseEntity.status(HttpStatus.OK).body(sellItem);
		}
	}
	
	
	@ApiOperation(value = "내림 상세 조회", notes = "내림 게시물 상세 정보를 조회")
	@GetMapping("/sellitem/d/{itemNum}")
	public ResponseEntity<SellItemJoinMemberVo> openNaelimSellItemDetail(@PathVariable("itemNum") int itemNum)
			throws Exception {
		SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetailContainHitCnt(itemNum);
		System.out.println(sellItem);
		
		if (sellItem == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			sellItem.setMemberEmail(" ");
			return ResponseEntity.status(HttpStatus.OK).body(sellItem);
		}
	}

	

	
	
//	@RequestMapping(value = "/sellItem/{itemNum}", method = RequestMethod.PUT)
//	public void updateSellItem(@PathVariable("itemNum") int itemNum, @RequestBody SellItemDto sellItemDto)
//			throws Exception {
//		sellItemDto.setItemNum(itemNum);
//		sellItemService.updateSellItem(sellItemDto);
//	}
//
//	@RequestMapping(value = "/sellItem/{itemNum}", method = RequestMethod.DELETE)
//	public void deleteSellItem(@PathVariable("itemNum") int itemNum) throws Exception {
//		sellItemService.deleteSellItem(itemNum);
//	}

}
