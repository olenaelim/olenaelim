package auction.guad.service;

import java.util.List;

import auction.guad.dto.AuctionDownDto;
import auction.guad.vo.AuctionVo;


public interface AuctionService {
	
	public int tryAuction(AuctionVo auc) throws Exception;
	public void cancelAuction(AuctionVo auc) throws Exception;
	public int naelimRandomCount(int itemNum)throws Exception;
	public void naelimRandomPerDiscountInsert(int perDiscount, int itemNum) throws Exception;
	public List<AuctionDownDto> naelimRandomPerDiscountAll(int itemNum) throws Exception;
	public AuctionVo lastAuction(int itemNum) throws Exception;
}
