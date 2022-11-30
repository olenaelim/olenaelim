package auction.guad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.dto.ImgDto;
import auction.guad.mapper.ImgMapper;

@Service
public class ImgServiceImpl implements ImgService {

	@Autowired
	private ImgMapper imgMapper;
	
	@Override
	public int insertSellImg(ImgDto imgDto) throws Exception {
		return imgMapper.insertSellImg(imgDto);
	}

	@Override
	public ImgDto selectImgByItemNumFirst(int itemNum) throws Exception {
		return imgMapper.selectImgByItemNumFirst(itemNum);
	}
	
	@Override
	public List<ImgDto> allImgByItemNum(int itemNum) throws Exception {
		 return imgMapper.allImgByItemNum(itemNum);
	}


	@Override
	public int deleteImg(int itemImgNum) throws Exception {
			return imgMapper.deleteImg(itemImgNum);
	}
	
}

