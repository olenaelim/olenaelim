package auction.guad.dto;

import java.sql.Timestamp;
import java.util.Date;

import lombok.Data;

@Data
public class SellItemDto {
	private int itemNum;
	private String sellType;
	private String memberEmail;
	
	private String itemSub;
	private String itemContents;
	private long itemPrice;
	private String itemType;
	private String itemDType;
	private Date writeDate;
	private int hitCnt;
	private int auctionStartPrice;
	private int auctionMaxPrice;
	private int auctionMinPrice;
	
	private int auctionPeriodTime;
	private int auctionPeriodDay;
	private Date auctionFinishDate;
	
	private boolean auctionRandomMethod;
	private int auctionDiscountPerHour;
	
	private String sellState;
	private char soldYn; 
	private Date soldDate;
	private String deleteYn;
	private Date deleteDate;
	
	private String itemImgName;

}
