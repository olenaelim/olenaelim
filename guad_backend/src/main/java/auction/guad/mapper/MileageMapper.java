package auction.guad.mapper;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.MemberDto;
import auction.guad.dto.MileageDto;
import auction.guad.vo.RequestMileageVo;

@Mapper
public interface MileageMapper {
 
    void chargeMileage2(MileageDto mileageDto) throws Exception;
	void chargeMileage(MileageDto mileageDto) throws Exception;
	MileageDto inquireMileageByEmail(String memberEmail) throws Exception;
	void useMileage(RequestMileageVo requestMileageVo) throws Exception;
	void usedMileage(RequestMileageVo requestMileageVo) throws Exception;
	void returnMileage(MemberDto member) throws Exception;
	void returnMileage2(MemberDto member) throws Exception;
}
