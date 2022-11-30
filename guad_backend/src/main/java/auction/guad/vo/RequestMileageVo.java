package auction.guad.vo;

import java.util.Date;

import lombok.Data;

@Data
public class RequestMileageVo {

	private String email;
	private Date chargeDate;
	private long chargeAmount;
	private String chargeMethod;
	
	// 
	private long itemPrice;

	public RequestMileageVo(String email, long itemPrice) {
		this.email = email;
		this.itemPrice = itemPrice;
	}
	
	
}
