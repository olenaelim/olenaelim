package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.AuctionDownDto;
import auction.guad.vo.AuctionVo;


@Mapper
public interface AuctionMapper {

	int tryAuction(AuctionVo auc) throws Exception;
	void cancelAuction(AuctionVo auc) throws Exception;
	int naelimRandomCount(int itemNum) throws Exception;
	void naelimRandomPerDiscountInsert(int perDiscount, int itemNum) throws Exception;
	List<AuctionDownDto> naelimRandomPerDiscountAll (int itemNum) throws Exception;
	public AuctionVo lastAuction(int itemNum) throws Exception;
}
