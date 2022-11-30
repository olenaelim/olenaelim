package auction.guad.service;

import java.util.List;

import auction.guad.dto.SellItemDto;
import auction.guad.dto.SellItemResultDto;

public interface SchedulerService {

	public List<SellItemResultDto> auctionUpPeriodCheck() throws Exception;
	public List<SellItemResultDto> auctionDownPeriodCheck() throws Exception;
	public void auctionSellitemUpdate(int itemNum) throws Exception;
	public int auctionResultInsert(SellItemResultDto sellItemResultDto) throws Exception;
	public void auctionDelete(SellItemDto sellItem) throws Exception;
	
	
}
