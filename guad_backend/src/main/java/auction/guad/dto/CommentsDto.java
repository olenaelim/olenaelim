package auction.guad.dto;

import java.util.Date;

import lombok.Data;

@Data
public class CommentsDto {
    
	private int commentNum;
	private int itemNum;
	private String memberEmail;
	private String writerNickname;
	private String contents;
		
	
	private String deleteYn;
	private Date deleteDate;
}
