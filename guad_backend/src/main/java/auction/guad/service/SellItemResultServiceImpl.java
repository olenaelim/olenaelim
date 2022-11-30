package auction.guad.service;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import auction.guad.dto.SellItemDto;
import auction.guad.dto.SellItemResultDto;
import auction.guad.mapper.SellItemResultMapper;
import auction.guad.vo.RequestMileageVo;
import auction.guad.vo.RequestTradeVo;
import auction.guad.vo.SellEndVo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellItemResultServiceImpl implements SellItemResultService{
	
	final private SellItemResultMapper sellItemResultMapper;
	final private MemberService memberService;
	final private MileageService mileageService;
	final private SellItemService sellItemService;
	///////////////////////////////////////////////////////////////////////////////
	
	@Override
	public int insertSellItemResult(RequestTradeVo requestTrade) throws Exception {
		return sellItemResultMapper.insertSellItemResult(requestTrade);
	}


	@Transactional
	@Override
	public boolean normalTrade(RequestTradeVo requestTrade) throws Exception {
		if(requestTrade.getMileage() - requestTrade.getItemPrice() < 0) {
			throw new Exception();
		} 
//		else if(requestTrade.getSoldYn() != 'n') {
//			throw new Exception();
//		}
		
		int result = sellItemResultMapper.insertSellItemResult(requestTrade);
		if(result == 1) {
			sellItemService.updateSoldYn(requestTrade.getItemNum());
			sellItemService.updateSellState(requestTrade.getItemNum());
			mileageService.useMileage(new RequestMileageVo(requestTrade.getBuyerEmail(), requestTrade.getItemPrice()));			
			return true;
		} else {
			return false;
		}
		
	}


	@Override
	public RequestTradeVo selectOneByBuyerEmailAndItemNum(String buyerEmail, int itemNum) throws Exception {
		return sellItemResultMapper.selectOneByBuyerEmailAndItemNum(buyerEmail, itemNum);
	}
	
	@Override
	public List<SellItemResultDto> selectMyBuyList(String memberEmail) throws Exception {
	          return sellItemResultMapper.selectMyBuyList(memberEmail);
	}
	            
    
    @Override
    public List<SellItemDto> selectMySellList(String memberEmail) throws Exception {
              return sellItemResultMapper.selectMySellList(memberEmail);
    }
    
    @Override
    public List<SellItemResultDto> selectMyBuyListDe(String memberEmail) throws Exception {
              return sellItemResultMapper.selectMyBuyListDe(memberEmail);
    }
                
    
    @Override
    public List<SellItemDto> selectMySellListDe(String memberEmail) throws Exception {
              return sellItemResultMapper.selectMySellListDe(memberEmail);
    }


    // sell_end
	@Override
	public SellEndVo selectNormalSellEnd(int itemNum) throws Exception {
		return sellItemResultMapper.selectNormalSellEnd(itemNum);
	}    
	

}
