package auction.guad.vo;

import java.util.Date;

import lombok.Data;

@Data
public class SellEndVo {

	private int itemNum;
	private Date soldDate;
	private int itemPrice;
	
	
	private String itemSub;
	private String itemContents;
	private String itemType;
	private int hitCnt;
	
	
	private String sellerEmail;
	private String sellerNickname;
	private String buyerNickname;
	
	
	private String itemImgName;
	private String itemImgNameSub2;
	private String itemImgNameSub3;
}
