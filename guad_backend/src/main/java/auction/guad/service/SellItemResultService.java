package auction.guad.service;

import java.util.List;

import auction.guad.dto.SellItemDto;
import auction.guad.dto.SellItemResultDto;
import auction.guad.vo.RequestTradeVo;
import auction.guad.vo.SellEndVo;

public interface SellItemResultService {
	
	public int insertSellItemResult(RequestTradeVo requestTrade) throws Exception;
	public boolean normalTrade(RequestTradeVo requestTrade) throws Exception;
	public RequestTradeVo selectOneByBuyerEmailAndItemNum(String buyerEmail, int itemNum) throws Exception;

	
    public List<SellItemResultDto> selectMyBuyList(String memberEmail) throws Exception;
    public List<SellItemDto> selectMySellList(String memberEmail) throws Exception;
    public List<SellItemResultDto> selectMyBuyListDe(String memberEmail) throws Exception;
    public List<SellItemDto> selectMySellListDe(String memberEmail) throws Exception;
    
    public SellEndVo selectNormalSellEnd(int itemNum) throws Exception;
}
