package auction.guad.controller.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {

	private String senderName;
	private String receiverName;
	private String message;
	private String data;
	private String status;
	private Integer bidPrice;
	private Integer itemNum;
}
