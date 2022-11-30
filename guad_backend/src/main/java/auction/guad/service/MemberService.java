package auction.guad.service;

import java.util.ArrayList;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import auction.guad.dto.MemberDto;

public interface MemberService extends UserDetailsService{
	
	public ArrayList<MemberDto> managerSelectMemberListExceptPass() throws Exception;
	public ArrayList<MemberDto> managerSelectMemberListExceptPassAnddelete() throws Exception;
	public MemberDto managerSelectMemberDetailByEmail(String email) throws Exception;
	public MemberDto loginContainPass(String email);
	
	public int insertMember(MemberDto memberDto) throws Exception;
	public MemberDto selectMemberDetailByEmail(String email) throws Exception;
	public void updateMemberByEmail(MemberDto memberDto) throws Exception;
	public void deleteMemberByEmail(MemberDto memberDto) throws Exception;

	public int repetitionEmailCheck(String email) throws Exception;
	public int repetitionNicknameCheck(String nickname) throws Exception;
	public boolean checkPass(User user, MemberDto member) throws Exception;
	
//	public void mileageCharge(MemberDto memberDto) throws Exception;
//	
}
