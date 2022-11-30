package auction.guad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import auction.guad.dto.ImgDto;
import auction.guad.dto.PageDto;
import auction.guad.dto.SellItemDto;
import auction.guad.mapper.SellItemMapper;
import auction.guad.vo.RequestTradeVo;
import auction.guad.vo.SellItemJoinMemberVo;

@Service
public class SellItemServiceImpl implements SellItemService {

	private SellItemMapper sellItemMapper;
	private ImgService imgService;
	@Autowired
	public SellItemServiceImpl(SellItemMapper sellItemMapper, ImgService imgService) {
		this.sellItemMapper = sellItemMapper;
		this.imgService = imgService;
	}	
	
	public List<SellItemDto> sellItemList() throws Exception {
		return sellItemMapper.sellItemList();
	}

	@Override
	public boolean insertSellItem(SellItemDto sellItemDto) throws Exception {
		int result = sellItemMapper.insertSellItem(sellItemDto);
		if (result == 1) {
			return true;
		} else {
			return false;
		}

	}

	@Transactional
	@Override
	public SellItemJoinMemberVo selectSellItemDetailContainHitCnt(int itemNum) throws Exception {
		sellItemMapper.updateHitCnt(itemNum);
		
		// 해당 itemNum에 입력된 imgName을 vo값에 세팅
		List<ImgDto> imgList = imgService.allImgByItemNum(itemNum);
		SellItemJoinMemberVo vo = sellItemMapper.selectSellItemDetail(itemNum);

		if(imgList.size() == 2) {
			vo.setItemImgNameSub2(imgList.get(1).getItemImgName());
		} else if(imgList.size() == 3) {
			vo.setItemImgNameSub2(imgList.get(1).getItemImgName());
			vo.setItemImgNameSub3(imgList.get(2).getItemImgName());
		}
		return vo;
	}

	@Override
	public SellItemJoinMemberVo selectSellItemDetailNoHitCnt(int itemNum) throws Exception {
		List<ImgDto> imgList = imgService.allImgByItemNum(itemNum);
		System.out.println("imgListㅡㅡㅡㅡㅡㅡㅡㅡㅡ" + imgList);
		// 해당 itemNum에 입력된 imgName을 vo값에 세팅
		SellItemJoinMemberVo vo = sellItemMapper.selectSellItemDetail(itemNum);
		
		if(imgList.size() == 2) {
			vo.setItemImgNameSub2(imgList.get(1).getItemImgName());
		} else if(imgList.size() == 3) {
			vo.setItemImgNameSub2(imgList.get(1).getItemImgName());
			vo.setItemImgNameSub3(imgList.get(2).getItemImgName());
		}
		return vo;
	}

	@Override
	public void updateSellItem(SellItemDto sellItemDto) throws Exception {
		sellItemMapper.updateSellItem(sellItemDto);

	}

	@Override
	public void deleteSellItem(int itemNum) throws Exception {
		sellItemMapper.deleteSellItem(itemNum);
	}

	@Override
	public int selectAllItemCount() throws Exception {
		return sellItemMapper.selectAllItemCount();
	}

	@Override
	public Integer selectLastItemNum() throws Exception {
		return sellItemMapper.selectLastItemNum();
	}

	@Override
	public int selectItemTypeCount(String itemType) throws Exception {
		return sellItemMapper.selectItemTypeCount(itemType);
	}

	@Override
	public int selectSellTypeCount(String sellType) throws Exception {
		return sellItemMapper.selectSellTypeCount(sellType);
	}

	@Override
	public int selectSellTypeItemTypeCount(String sellType, String itemType) throws Exception {
		return sellItemMapper.selectSellTypeItemTypeCount(sellType, itemType);
	}

	@Override
	public List<SellItemDto> selectSellItemList() throws Exception {
		return sellItemMapper.selectSellItemList();
	}

	@Override
	public int updateSoldYn(int itemNum) throws Exception {
		int result = sellItemMapper.updateSoldYn(itemNum);
		return result;
	}

	@Override
	public int updateSellState(int itemNum) throws Exception {
		int result = sellItemMapper.updateSellState(itemNum);
		return result;
	}
	@Override
    public int updateSellState2(int itemNum) throws Exception {
        int result = sellItemMapper.updateSellState2(itemNum);
        return result;
    }

	@Override
	public List<SellItemDto> selectSearchList(String search) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
