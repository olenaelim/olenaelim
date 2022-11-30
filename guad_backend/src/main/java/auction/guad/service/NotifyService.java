package auction.guad.service;

import java.util.ArrayList;

import auction.guad.dto.MemberDto;
import auction.guad.dto.NotifyDto;
import auction.guad.vo.NotifyVo;

public interface NotifyService  {
	
	public int insertNotify(NotifyDto notifyDto) throws Exception;
	public ArrayList<NotifyDto> notifyList() throws Exception;
	public NotifyVo notifyDetail(String notifyNum) throws Exception;
	public ArrayList<NotifyVo> myNotifyList(String memberEmail) throws Exception;
}
