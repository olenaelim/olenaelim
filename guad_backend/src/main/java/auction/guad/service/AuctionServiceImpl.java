package auction.guad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.controller.model.Auction;
import auction.guad.dto.AuctionDownDto;
import auction.guad.dto.AuctionDto;
import auction.guad.mapper.AuctionMapper;
import auction.guad.vo.AuctionVo;

@Service
public class AuctionServiceImpl implements AuctionService{

	@Autowired
	AuctionMapper aucMapper;
	
	@Override
	public int tryAuction(AuctionVo auc) throws Exception {
		return aucMapper.tryAuction(auc);
	}
	
	@Override
	public void cancelAuction(AuctionVo auc) throws Exception {
		
		aucMapper.cancelAuction(auc);
	}
	
	@Override
	public int naelimRandomCount(int itemNum)throws Exception {
		
		return aucMapper.naelimRandomCount(itemNum);
	}
	
	@Override
	public void naelimRandomPerDiscountInsert(int perDiscount, int itemNum) throws Exception {
		
		aucMapper.naelimRandomPerDiscountInsert(perDiscount, itemNum);
	}
	
	@Override
	public List<AuctionDownDto> naelimRandomPerDiscountAll(int itemNum) throws Exception {
		return aucMapper.naelimRandomPerDiscountAll(itemNum);
	}
	
	@Override
	public AuctionVo lastAuction(int itemNum) throws Exception {
		return aucMapper.lastAuction(itemNum);
	}
}
