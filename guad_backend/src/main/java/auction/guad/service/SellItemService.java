package auction.guad.service;

import java.util.List;

import auction.guad.dto.PageDto;
import auction.guad.dto.SellItemDto;
import auction.guad.dto.SellItemResultDto;
import auction.guad.vo.SellItemJoinMemberVo;
import auction.guad.vo.RequestTradeVo;

public interface SellItemService {

	public List<SellItemDto> sellItemList() throws Exception;
	public boolean insertSellItem(SellItemDto sellItemDto) throws Exception;
	public SellItemJoinMemberVo selectSellItemDetailContainHitCnt(int itemNum) throws Exception;
	public SellItemJoinMemberVo selectSellItemDetailNoHitCnt(int itemNum) throws Exception;
	public void updateSellItem(SellItemDto sellItemDto) throws Exception;
	public void deleteSellItem(int itemNum) throws Exception;

	public int selectAllItemCount() throws Exception;
	public Integer selectLastItemNum() throws Exception;
	public int selectItemTypeCount(String itemType) throws Exception;
	int selectSellTypeCount(String sellType) throws Exception;
	int selectSellTypeItemTypeCount(String sellType, String itemType) throws Exception;
	
	public List<SellItemDto> selectSellItemList() throws Exception;
	public int updateSoldYn(int itemNum) throws Exception;
	public int updateSellState(int itemNum) throws Exception;
	public int updateSellState2(int itemNum) throws Exception;
	public List<SellItemDto> selectSearchList(String search) throws Exception;
	
}
