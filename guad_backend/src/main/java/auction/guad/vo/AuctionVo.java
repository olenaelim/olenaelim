package auction.guad.vo;

import lombok.Data;

@Data
public class AuctionVo {

	private int auctionNum;
	private int itemNum;
	private int auctionPrice;
	private int beforeAuctionPrice;
	private String nickname;
	private String beforeNickname;
	private String memberEmail;

}