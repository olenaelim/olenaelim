package auction.guad.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.ImgDto;
import auction.guad.service.ImgService;
import auction.guad.service.ImgServiceImpl;
import io.swagger.annotations.ApiOperation;

@RestController
public class ImgController {

	@Autowired
	private ImgService imgService;
	
	@ApiOperation(value = "이미지 불러오기(itemNum)", notes = "itemNum으로 이미지 불러오기 , 파라미터 : itemNum")
	@GetMapping("/img")
	public List<ImgDto> allImgByItemNum(int itemNum) throws Exception {
		return imgService.allImgByItemNum(itemNum);
	}
	
	@ApiOperation(value = "이미지 입력(imgDto)", notes = "이미지 데이터 입력 , 파라미터 : imgDto")
	@PostMapping("/img/insert/S")
	public void insertSellImg(@RequestBody ImgDto imgDto) throws Exception {
		imgService.insertSellImg(imgDto);
	}
	
			
	@ApiOperation(value = "이미지 삭제(itemImgNum, imgDto)", notes = "이미지 삭제, 파라미터 : itemImgNum, imgDto")
	@PatchMapping("/img/{itemImgNum}")
	public void deleteImg(@PathVariable("itemImgNum") int itemImgNum, @RequestBody ImgDto imgDto) throws Exception {
		imgDto.setItemNum(itemImgNum);
		imgService.deleteImg(itemImgNum);
	}

	
}
