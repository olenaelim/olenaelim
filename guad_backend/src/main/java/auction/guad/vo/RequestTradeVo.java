package auction.guad.vo;

import java.sql.Timestamp;
import java.util.Date;

import lombok.Data;

@Data
public class RequestTradeVo {
	
	private int itemNumResult;
	private int itemNum;
	private String sellState;
	private char sellType;
	private String sellerEmail;
	private String sellerPhone;
	private String buyerEmail;
	private String buyerPhone;
	private String address;
	
	private String itemSub;
	private long itemPrice;	
	private Date auctionFinishDate;
	private Date soldDate; 	
	
	private char soldYn;
	private int mileage;
	
	
	private String nickname;
	private String itemContents;
	private String itemImgName;
	
}
