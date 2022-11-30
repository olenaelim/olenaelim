package auction.guad.dto;

import java.util.Date;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberDto {

	private int memberNum;
	private String nickname;
	private String pass;
	private String email;
	private String phone;
	private String address;
	private String addressDetail;
	private Date joinDateTime;
	private String gender;
	private int mileage;
	private int mileageUsed;
	
	private String loginImgName;
	private String managerYn;
	private String deleteYn;
	private Date updatedDateTime;
	
	@Builder
	public MemberDto(String nickname, String email, String phone, String address, String addressDetail) {
		this.nickname = nickname;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.addressDetail = addressDetail;
	}
	
	

}
