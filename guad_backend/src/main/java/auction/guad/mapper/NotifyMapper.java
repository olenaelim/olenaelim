package auction.guad.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.NotifyDto;
import auction.guad.vo.NotifyVo;

@Mapper
public interface NotifyMapper {

	int insertNotify(NotifyDto notify) throws Exception;
	ArrayList<NotifyDto> notifyList() throws Exception;
	NotifyVo notifyDetail(String notifyNum) throws Exception;
	ArrayList<NotifyVo> myNotifyList(String memberEmail) throws Exception;
}
