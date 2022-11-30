package auction.guad.dto;

import java.util.Date;

import lombok.Data;


@Data
public class AuctionDownDto {

	private int auctionDownNum;
	private int itemNum;
	private int auctionPer;
	private Date auctionTime;

}
