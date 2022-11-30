package auction.guad.dto;

import java.util.List;

import lombok.Data;

@Data
public class PageDto {

	private List<SellItemDto> itemList;
	
	private int currentPage;
	private int startPage;
	private int endPage;
	private int totalPage;
	
	public PageDto(List<SellItemDto> itemList, int currentPage, int startPage, int endPage, int totalPage) {
		this.itemList = itemList;
		this.currentPage = currentPage;
		this.startPage = startPage;
		this.endPage = endPage;
		this.totalPage = totalPage;
	}
	
}
