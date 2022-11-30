package auction.guad.vo;

import java.util.Date;


import lombok.Data;

@Data
public class NotifyVo {
	
	private int notifyNum;
	private int itemNum;
	private String memberEmail;
	
	private String notifyTitle;
	private String notifyContents;
	private Date notifyTime;
	
	
	private int imgNum;
	private String sellerEmail;

}
