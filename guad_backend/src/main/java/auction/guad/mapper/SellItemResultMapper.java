package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.SellItemDto;
import auction.guad.dto.SellItemResultDto;
import auction.guad.vo.RequestTradeVo;
import auction.guad.vo.SellEndVo;

@Mapper
public interface SellItemResultMapper {
	
	int insertSellItemResult(RequestTradeVo requestTrade) throws Exception;
	RequestTradeVo selectOneByBuyerEmailAndItemNum(String buyerEmail, int itemNum) throws Exception;
	List<SellItemResultDto> selectMyBuyList(String memberEmail) throws Exception;
	List<SellItemDto> selectMySellList(String memberEmail) throws Exception;   
	List<SellItemResultDto> selectMyBuyListDe(String memberEmail) throws Exception;
    List<SellItemDto> selectMySellListDe(String memberEmail) throws Exception;
    SellEndVo selectNormalSellEnd(int itemNum) throws Exception;
    
}
