//package auction.guad.controller;
//
//import javax.inject.Inject;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import auction.guad.dto.BidDto;
//import auction.guad.service.BidService;
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
//@Controller
//@RequestMapping(value = "/buy_bid/*")
//public class BidController {
//
//	@Inject
//	private BidService bsv;
//	
//	@PostMapping("/add")
//	public String add(BidDto bidDto) {
//		int isUp = bsv.register(bidDto);
//		log.info(">>> BidController > add - POST : {} ", isUp);
//		log.info(">>> BidController > add - POST : {} ", bidDto);
//		return "redirect:/buy_bid/complete"; 
//	}
//	
//	@GetMapping("/complete")
//	public void complete() {
//		log.info(">>> BidController > complete - GET");
//	}
//	
//	@GetMapping("/list/{mno}")
//	public String list(
//			Model model
//			, PagingVO pgvo
//			, @PathVariable("mno") long mno) {
//		log.info(">>> BidController > list - GET");
//		
//		model.addAttribute("list", bsv.getList(mno, pgvo));
//		int totalCount = bsv.getTotalCount(mno, pgvo);
//		model.addAttribute("pgn", new PagingHandler(pgvo, totalCount));
//		return "/buy_bid/list";
//	}
//}