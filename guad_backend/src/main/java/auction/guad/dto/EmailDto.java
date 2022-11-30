package auction.guad.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EmailDto {
	private String from;
    private String[] address;
    private String[] ccAddress;
    private String title;
    private String content;
    private String template;
}
