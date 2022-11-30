package auction.guad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.dto.SellItemDto;
import auction.guad.dto.SellItemResultDto;
import auction.guad.mapper.SchedulerMapper;

@Service
public class SchedulerServiceImpl implements SchedulerService {
	
	@Autowired
	SchedulerMapper schedulerMapper;
	
	@Override
	public List<SellItemResultDto> auctionUpPeriodCheck() throws Exception {
		return schedulerMapper.auctionUpPeriodCheck();
	}
	
	@Override
	public List<SellItemResultDto> auctionDownPeriodCheck() throws Exception {
		return schedulerMapper.auctionDownPeriodCheck();
	}
	
	@Override
	public void auctionSellitemUpdate(int itemNum) throws Exception{
		schedulerMapper.auctionSellitemUpdate(itemNum);
	}
	
	@Override
	public int auctionResultInsert(SellItemResultDto sellItemResultDto) throws Exception {
		return schedulerMapper.auctionResultInsert(sellItemResultDto);
	}
	
	@Override
	public void auctionDelete(SellItemDto sellItem) throws Exception {
		schedulerMapper.auctionDelete(sellItem);
	}
	
	

}
