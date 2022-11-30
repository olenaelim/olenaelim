package auction.guad.dto;

import java.util.Date;

import lombok.Data;

@Data
public class NotifyDto {

	private int notifyNum;
	private int itemNum;
	private String memberEmail;
	
	private String notifyTitle;
	private String notifyContents;
	private Date notifyTime;
	
	private String itemImgName;
}
