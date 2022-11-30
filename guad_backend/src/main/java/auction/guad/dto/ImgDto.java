package auction.guad.dto;

import lombok.Data;

@Data
public class ImgDto {
	private int imgNum;
	private int itemNum;
	
	private String itemImgName;
	private String itemImgUpfile;
	private String itemImgType;
	private long imgSize;
	
}
