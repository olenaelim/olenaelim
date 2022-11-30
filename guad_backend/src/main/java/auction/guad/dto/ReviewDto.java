package auction.guad.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ReviewDto {
	private int reviewNum;
	private int itemNum;
	private String sellerEmail;
	private String writerEmail;
	private	String writerNickname; 
	
	private String contents;
	private int starPoint;
	private Date writeDate;
	
	private Date updateDate;
	private String deleteYn;
	private Date deleteDate;
}
