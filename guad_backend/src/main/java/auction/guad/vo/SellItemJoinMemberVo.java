package auction.guad.vo;

import java.sql.Timestamp;
import java.util.Date;

import lombok.Data;

@Data
public class SellItemJoinMemberVo {

	private int itemNum;
	private String sellType;
	private String memberEmail;
	
	private String itemSub;
	private String itemContents;
	private int itemPrice;
	private String itemType;
	private String itemDType;
	private Date writeDate;
	private int hitCnt;
	private int auctionStartPrice;
	private int auctionMaxPrice;
	private int auctionMinPrice;
	
	private long currentPrice;  //현재가를 보내기 위해 추가하였습니다.
	
	private int auctionPeriodTime;
	private int auctionPeriodDay;
	private Date auctionFinishDate;
	
	private boolean auctionRandomMethod;
	private int auctionDiscountPerHour;
	
	private String soldYn;
	private Date soldDate;
	private String deleteYn;
	private Date deleteDate;
	
//////////////////////////////////////////////////////////////////
	private String nickname;
	private String itemImgName;
	private String itemImgNameSub2;
	private String itemImgNameSub3;
	
	//////////////////////////////////////////////
	
	private int beforeAuctionPrice;
	private String beforeNickname;
	private int bidPrice;

	
}
