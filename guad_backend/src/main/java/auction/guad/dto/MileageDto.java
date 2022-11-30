package auction.guad.dto;

import java.util.Date;

import lombok.Data;

@Data
public class MileageDto {
	private int mileageNum;
	private String memberEmail;
	private Date chargeDate;
	private int chargeAmount;
	private String chargeMethod;
	
}
