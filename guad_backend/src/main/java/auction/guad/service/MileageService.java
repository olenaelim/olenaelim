package auction.guad.service;

import auction.guad.dto.MemberDto;
import auction.guad.dto.MileageDto;
import auction.guad.vo.RequestMileageVo;

public interface MileageService {
	
	public void chargeMileage(MileageDto mileageDto) throws Exception;
	public MileageDto inquireMileageByEmail(String memberEmail) throws Exception;
	
	public void useMileage(RequestMileageVo requestMileageVo) throws Exception;
	public void returnMileage(MemberDto member) throws Exception;
}
