package auction.guad.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;

import auction.guad.dto.MemberDto;

@Mapper
public interface MemberMapper {
	
	ArrayList<MemberDto> managerSelectMemberListExceptPass() throws Exception;
	ArrayList<MemberDto> managerSelectMemberListExceptPassAnddelete() throws Exception;
	MemberDto managerSelectMemberDetailByEmail(String email) throws Exception;
	MemberDto loginContainPass(String email);
	
	int insertMember(MemberDto memberDto) throws Exception;
	MemberDto selectMemberDetailByEmail(String email) throws Exception;
	void updateMemberByEmail(MemberDto memberDto) throws Exception;
	void deleteMemberByEmail(MemberDto memberDto) throws Exception;
	
	int repetitionEmailCheck(String email) throws Exception;
	int repetitionNicknameCheck(String nickname) throws Exception;
	void mileageCharge(MemberDto memberDto) throws Exception;
	
//	int checkPass(User user, MemberDto member) throws Exception;

}
