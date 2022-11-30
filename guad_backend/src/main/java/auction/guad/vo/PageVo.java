package auction.guad.vo;

import java.util.List;

import lombok.Data;

@Data
public class PageVo {
		
	private int currentPage;
	private int startPage;
	private int endPage;
	private int totalPage;
	
//	public PageVo(List<BoardVO> boardList, int currentPage, int startPage, int endPage, int totalPage) {
//		this.currentPage = currentPage;
//		this.startPage = startPage;
//		this.endPage = endPage;
//		this.totalPage = totalPage;
//	}
	
	
}