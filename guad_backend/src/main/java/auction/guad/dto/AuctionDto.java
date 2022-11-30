package auction.guad.dto;

import java.util.Date;

import lombok.Data;

@Data
public class AuctionDto {

	private int auctionNum;
	private int itemNum;
	private String memberEmail;
	
	private int auctionPrice;
	private Date auctionTime;
}
